// Подключение необходимых модулей
const express = require('express');
const mongoose = require('mongoose');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/bilet_operator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Проверка подключения к базе данных
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', function () {
  console.log('Успешное подключение к MongoDB');
});

// Определение схемы и модели для билетов
const ticketSchema = new mongoose.Schema({
  destination: String,
  price: Number,
  date: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Создание экземпляра приложения Express
const app = express();

// Использование middleware для обработки тел запросов в формате JSON
app.use(express.json());

// Маршрут для создания нового билета
app.post('/tickets', async function (req, res) {
  try {
    const newTicket = new Ticket({
      destination: req.body.destination,
      price: req.body.price,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(500).send('Ошибка при создании билета');
  }
});

// Маршрут для получения всех билетов
app.get('/tickets', async function (req, res) {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (err) {
    res.status(500).send('Ошибка при получении билетов');
  }
});

// Маршрут для получения билета по ID
app.get('/tickets/:id', async function (req, res) {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).send('Билет не найден');
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).send('Ошибка при получении билета');
  }
});

app.put('/tickets/:id', async function (req, res) {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).send('Билет не найден');
    }
    res.json(updatedTicket);
  } catch (err) {
    res.status(500).send('Ошибка при обновлении билета');
  }
});

// Маршрут для удаления билета по ID
app.delete('/tickets/:id', async function (req, res) {
  try {
    const deletedTicket = await Ticket.findOneAndDelete({ _id: req.params.id });
    if (!deletedTicket) {
      return res.status(404).send('Билет не найден');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Ошибка при удалении билета');
  }
});

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Сервер запущен на порте ${port}`);
});
