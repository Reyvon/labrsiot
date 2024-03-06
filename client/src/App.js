import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    destination: '',
    price: '',
  });
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Ошибка при получении билетов:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:3000/tickets', newTicket);
      fetchTickets();
      setNewTicket({ destination: '', price: '' });
    } catch (error) {
      console.error('Ошибка при создании билета:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/tickets/${selectedTicket._id}`,
        newTicket
      );
      fetchTickets();
      setNewTicket({ destination: '', price: '' });
      setSelectedTicket(null);
    } catch (error) {
      console.error('Ошибка при обновлении билета:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tickets/${id}`);
      fetchTickets();
    } catch (error) {
      console.error('Ошибка при удалении билета:', error);
    }
  };

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setNewTicket({ destination: ticket.destination, price: ticket.price });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Билеты</h1>
      <form
        onSubmit={selectedTicket ? handleUpdate : handleCreate}
        className={styles.form}
      >
        <input
          type="text"
          name="destination"
          placeholder="Место назначения"
          value={newTicket.destination}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Цена"
          value={newTicket.price}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {selectedTicket ? 'Обновить билет' : 'Добавить билет'}
        </button>
      </form>
      <ul className={styles.list}>
        {tickets.map((ticket) => (
          <li
            key={ticket._id}
            className={styles.item}
            onClick={() => handleSelectTicket(ticket)}
          >
            <span>
              {ticket.destination} - ${ticket.price}
            </span>
            <button
              onClick={() => handleDelete(ticket._id)}
              className={styles.deleteButton}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
