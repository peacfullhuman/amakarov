const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db'); // подключаем БД

const app = express();
const PORT = 3000;

// Чтобы принимать JSON из формы
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статика
app.use('/public', express.static(path.join(__dirname, 'public')));

// Главная страница — с формой
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Обработка формы
app.post('/message', (req, res) => {
  const { name, phone, message } = req.body;

  // Валидация
  if (!name || !phone || !message) {
    return res.status(400).send(`
      <h2>❌ Заполните все поля</h2>
      <a href="/">Назад</a>
    `);
  }

  const sql = `INSERT INTO message (name, phone, message) VALUES (?, ?, ?)`;
  db.run(sql, [name, phone, message], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('❌ Ошибка базы данных');
    }

    // После отправки — покажем сообщение
    res.send(`
      <h2>✅ Спасибо, ${name}!</h2>
      <p>Мы получили ваше сообщение и скоро свяжемся с вами.</p>
      <p><small>Номер: ${phone}</small></p>
      <a href="/">Назад</a>
    `);
  });
});

// API: получить все сообщения
// app.get('/api/messages', (req, res) => {
//   db.all('SELECT * FROM message ORDER BY created_at DESC', [], (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json({ messages: rows });
//     }
//   });
// });

// GET /message — просто возвращает массив данных
app.get('/message', (req, res) => {
  db.all('SELECT * FROM message ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // ← просто массив объектов
  });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});