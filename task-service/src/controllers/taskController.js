const pool = require('../config/db');

// ─── CREATE TASK ───────────────────────────────────────────
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, due_date, assignee_id } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, due_date, assignee_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, status, due_date, assignee_id, created_at`,
      [title, description, status || 'pending', due_date, assignee_id]
    );

    res.status(201).json({
      message: 'Task berhasil dibuat',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── GET ALL TASKS ───────────────────────────────────────
exports.getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, status, due_date, assignee_id, created_at FROM tasks ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── GET TASK BY ID ───────────────────────────────────────
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, title, description, status, due_date, assignee_id, created_at FROM tasks WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get task by id error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── UPDATE TASK ─────────────────────────────────────────
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date, assignee_id } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           status = $3,
           due_date = $4,
           assignee_id = $5,
           updated_at = NOW()
       WHERE id = $6
       RETURNING id, title, description, status, due_date, assignee_id, updated_at`,
      [title, description, status, due_date, assignee_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task tidak ditemukan' });
    }

    res.json({
      message: 'Task berhasil diperbarui',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── DELETE TASK ─────────────────────────────────────────
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task tidak ditemukan' });
    }

    res.json({ message: 'Task berhasil dihapus' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
