import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import TicketCard from '../TicketCard/ticket-card';
import { fetchTickets, addItemsToRender } from '../../actions/actions';

function TicketList() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const renderedItemsCount = useSelector(
    (state) => state.tickets.renderedItemsCount,
  );
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const filters = useSelector((state) => state.filters);
  const currentSort = useSelector((state) => state.sort);

  const isActiveFilters = ['none', 'one', 'two', 'three'].some(
    (filter) => filters[filter],
  );

  const filterTickets = (allTickets, activeFilters) =>
    allTickets.filter((ticket) => {
      const transfersCountForBothSegments = ticket.segments.map(
        (segment) => segment.stops.length,
      );
      if (
        activeFilters.none &&
        transfersCountForBothSegments.every((count) => count === 0)
      ) {
        return true;
      }
      if (
        activeFilters.one &&
        transfersCountForBothSegments.every((count) => count === 1)
      ) {
        return true;
      }
      if (
        activeFilters.two &&
        transfersCountForBothSegments.every((count) => count === 2)
      ) {
        return true;
      }
      if (
        activeFilters.three &&
        transfersCountForBothSegments.every((count) => count === 3)
      ) {
        return true;
      }
      return false;
    });

  const sortTickets = (allTickets, sortBy) => {
    if (!sortBy || sortBy.sortingCriteria === 'none') {
      return allTickets;
    }

    switch (sortBy.sortingCriteria) {
      case 'cheapest':
        return [...allTickets].sort((a, b) => a.price - b.price);
      case 'fastest':
        return [...allTickets].sort((a, b) => {
          const totalDurationA = a.segments.reduce(
            (acc, segment) => acc + segment.duration,
            0,
          );
          const totalDurationB = b.segments.reduce(
            (acc, segment) => acc + segment.duration,
            0,
          );
          return totalDurationA - totalDurationB;
        });
      case 'optimal':
        return [...allTickets].sort((a, b) => {
          const totalStopsA = a.segments.reduce(
            (acc, segment) => acc + segment.stops.length,
            0,
          );
          const totalStopsB = b.segments.reduce(
            (acc, segment) => acc + segment.stops.length,
            0,
          );
          const totalDurationA = a.segments.reduce(
            (acc, segment) => acc + segment.duration,
            0,
          );
          const totalDurationB = b.segments.reduce(
            (acc, segment) => acc + segment.duration,
            0,
          );
          return (
            a.price +
            totalStopsA * 100 +
            totalDurationA -
            (b.price + totalStopsB * 100 + totalDurationB)
          );
        });
      default:
        return allTickets;
    }
  };

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Ошибка загрузки"
        description="Попробуйте ещё раз"
        type="error"
        showIcon
      />
    );
  }

  if (!isActiveFilters) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <h4>Выберите количество пересадок</h4>
      </div>
    );
  }

  const filteredTickets = sortTickets(
    filterTickets(tickets, filters),
    currentSort,
  );

  if (filteredTickets.length === 0) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <h4>Билеты по заданным параметрам не найдены</h4>
      </div>
    );
  }

  const enhancedTickets = filteredTickets
    .slice(0, renderedItemsCount)
    .map((ticket) => ({
      ...ticket,
      id: uuidv4(),
    }));

  return (
    <div className="tickets">
      {enhancedTickets.map((ticket) => (
        <TicketCard key={ticket.id} data={ticket} />
      ))}
      {tickets.length > renderedItemsCount && (
        <Button
          onClick={() => dispatch(addItemsToRender(5))}
          className="mt-3 tickets__button"
          type="primary"
          block
        >
          Покажи ещё 5 билетов!
        </Button>
      )}
    </div>
  );
}

export default TicketList;
