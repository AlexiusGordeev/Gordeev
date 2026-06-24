const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'mysecretkey';

const cors = require('cors');
const express = require('express');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/tasks', auth, async (req, res) => {
  const tasks = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1',
    [req.userId]
  );

  res.json(tasks.rows);
});

// получить задачи
app.get('/', (req, res) => {
  res.send('API работает 🚀');
});

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (user.rows.length === 0) {
    return res.status(400).json({ error: 'Пользователь не найден' });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!validPassword) {
    return res.status(400).json({ error: 'Неверный пароль' });
  }

  const token = jwt.sign(
    { userId: user.rows[0].id },
    SECRET
  );

  res.json({ token });
});

app.get('/tasks', auth, async (req, res) => {
  const tasks = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1',
    [req.userId]
  );
  res.json(tasks.rows);
});

// добавить задачу
app.post('/tasks', auth, async (req, res) => {
  const { title } = req.body;

  const newTask = await pool.query(
    'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
    [title, req.userId]
  );

  res.json(newTask.rows[0]);
});

// удалить задачу
app.delete('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, req.userId]);

  res.json({ message: 'Удалено' });
});

app.put('/tasks/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, completed, id, req.userId]
    );

    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log('Backend: http://localhost:3000');
});

async function toggleTask(id, completed) {
  const input = document.getElementById(`input-${id}`);

  await fetch(API + '/' + id, {
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN
      },
    body: JSON.stringify({
      title: input.value,
      completed: completed
    })
  });

  loadTasks();
}

async function updateTask(id) {
  const input = document.getElementById(`input-${id}`);

  await fetch(API + '/' + id, {
    method: 'PUT',
    headers: {
         'Content-Type': 'application/json',
         'Authorization': TOKEN
       },
    body: JSON.stringify({
      title: input.value,
      completed: false
    })
  });

  loadTasks();
}

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Нет токена' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Неверный токен' });
  }
}