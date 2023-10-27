/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import TicketCard from '../TicketCard/ticket-card';
import { fetchTickets, addItemsToRender } from '../../actions/actions';

function TicketList() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const renderedItemsCount = useSelector((state) => state.renderedItemsCount);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

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

  const enhancedTickets = tickets
    .slice(0, renderedItemsCount)
    .map((ticket) => ({
      ...ticket,
      id: uuidv4(),
    }));

  return (
    <div className="tickets">
      {enhancedTickets.map((ticket, index) => (
        <TicketCard key={index} data={ticket} />
      ))}
      {tickets.length > renderedItemsCount && (
        <Button
          onClick={() => dispatch(addItemsToRender(5))}
          className="mt-3"
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
