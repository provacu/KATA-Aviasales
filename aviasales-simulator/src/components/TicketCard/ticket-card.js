/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { format, add } from 'date-fns';
import { Card } from 'antd';
import notAvailableImage from './Not_applicable.png';
import './ticket-card.scss';

function TicketCard({ data }) {
  const formatFlightTimeFunc = (departureDate, duration) => {
    const departure = new Date(departureDate);
    const arrival = add(departure, { minutes: duration });

    const departureTime = format(departure, 'HH:mm');
    const arrivalTime = format(arrival, 'HH:mm');

    return `${departureTime} - ${arrivalTime}`;
  };
  const formatDurationFunc = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours.toString().padStart(2, '0')}ч ${minutes
      .toString()
      .padStart(2, '0')}м`;
  };
  const { price, carrier, segments } = data;

  const [currentLogoURL, setCurrentLogoURL] = React.useState(
    `https://pics.avs.io/99/36/${carrier}.png`,
  );

  return (
    <Card className="ticket-card" hoverable>
      <div className="ticket-card__header">
        <div
          className="ticket-card__price"
          style={{ fontSize: '20px', fontWeight: 'bold', color: '#2196F3' }}
        >
          {price} Р
        </div>
        <img
          className="ticket-card__logo"
          src={currentLogoURL}
          alt={`${carrier} logo`}
          onError={() => setCurrentLogoURL({ notAvailableImage })}
        />
      </div>

      {segments.map((segment, index) => {
        const key = `${segment.origin}-${segment.destination}-${segment.duration}-${index}`;
        return (
          <div key={key} className="ticket-card__segment">
            <div className="ticket-card__info-block">
              <div
                className="ticket-card__route"
                style={{ fontWeight: 'semiBold', color: '#A0B0B9' }}
              >{`${segment.origin} - ${segment.destination}`}</div>
              <div className="ticket-card__departure-time">
                {formatFlightTimeFunc(segment.date, segment.duration)}
              </div>
            </div>
            <div className="ticket-card__info-block">
              <div style={{ fontWeight: 'semiBold', color: '#A0B0B9' }}>
                В ПУТИ
              </div>
              <div className="ticket-card__duration">
                {formatDurationFunc(segment.duration)}
              </div>
            </div>
            <div className="ticket-card__info-block">
              <div
                className="ticket-card__stops-count"
                style={{ fontWeight: 'semiBold', color: '#A0B0B9' }}
              >
                {segment.stops.length === 0
                  ? 'БЕЗ ПЕРЕСАДОК'
                  : segment.stops.length === 1
                  ? '1 ПЕРЕСАДКА'
                  : `${segment.stops.length} ПЕРЕСАДКИ`}
              </div>
              <div className="ticket-card__stops">
                {segment.stops.join(', ')}
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

TicketCard.propTypes = {
  data: PropTypes.shape({
    price: PropTypes.number.isRequired,
    carrier: PropTypes.string.isRequired,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        stops: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default TicketCard;
