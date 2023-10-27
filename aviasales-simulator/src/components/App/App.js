import React from 'react';
import Logo from '../Logo/logo';
import FilterSidebar from '../FilterSidebar/filter-sidebar';
import ToggleButtons from '../ToggleButtons/toggle-buttons';
import TicketList from '../TicketList/ticket-list';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const tickets = [];

  return (
    <div className="container">
      <Logo />
      <FilterSidebar />
      <div className="main__content">
        <ToggleButtons />
        <TicketList tickets={tickets} />
      </div>
    </div>
  );
}

export default App;
