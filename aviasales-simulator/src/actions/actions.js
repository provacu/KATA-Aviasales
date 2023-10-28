/* eslint-disable no-await-in-loop */

const MAX_RETRIES = 3;
const DELAY = 1000;

export const FETCH_TICKETS_START = 'FETCH_TICKETS_START';

function fetchTicketsStart() {
  return {
    type: FETCH_TICKETS_START,
  };
}

export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';

function fetchTicketsSuccess(tickets) {
  return {
    type: FETCH_TICKETS_SUCCESS,
    tickets,
  };
}

export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR';

function fetchTicketsError(error) {
  return {
    type: FETCH_TICKETS_ERROR,
    error,
  };
}

export const ADD_ITEMS_TO_RENDER = 'ADD_ITEMS_TO_RENDER';

export function addItemsToRender(count) {
  return {
    type: ADD_ITEMS_TO_RENDER,
    count,
  };
}

async function fetchWithRetries(url, retries = MAX_RETRIES) {
  let lastError = null;

  for (let i = 0; i < retries; i += 1) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return response;
      }

      if (i < retries - 1) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, DELAY);
        });
      }
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, DELAY);
        });
      }
    }
  }

  throw lastError;
}
export function fetchTickets() {
  return async (dispatch) => {
    dispatch(fetchTicketsStart());

    try {
      const searchResponse = await fetchWithRetries(
        'https://aviasales-test-api.kata.academy/search',
      );
      const searchData = await searchResponse.json();
      const { searchId } = searchData;

      let stop = false;
      const allTickets = [];

      while (!stop) {
        const ticketsResponse = await fetchWithRetries(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
        );
        const ticketsData = await ticketsResponse.json();

        allTickets.push(...ticketsData.tickets);

        stop = ticketsData.stop;
      }

      dispatch(fetchTicketsSuccess(allTickets));
    } catch (error) {
      dispatch(
        fetchTicketsError(error ? error.toString() : 'Неизвестная ошибка'),
      );
    }
  };
}
