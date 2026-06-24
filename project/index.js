const cors = require('cors');
const express = require('express');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// получить задачи
app.get('/', (req, res) => {
  res.send('API работает 🚀');
});

app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(result.rows);
});

// добавить задачу
app.post('/tasks', async (req, res) => {
  const { title } = req.body;

  const newTask = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );

  res.json(newTask.rows[0]);
});

// удалить задачу
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

  res.json({ message: 'Удалено' });
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
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
    headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: input.value,
      completed: false
    })
  });

  loadTasks();
}