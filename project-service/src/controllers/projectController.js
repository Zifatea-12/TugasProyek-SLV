const pool = require('../config/db');

// ─── CREATE PROJECT ───────────────────────────────────────
exports.createProject = async (req, res) => {
  try {
    const { name, description, owner_id, start_date, end_date } = req.body;

    const result = await pool.query(
      `INSERT INTO projects (name, description, owner_id, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, owner_id, start_date, end_date, created_at`,
      [name, description, owner_id, start_date, end_date]
    );

    res.status(201).json({
      message: 'Project berhasil dibuat',
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── GET ALL PROJECTS ───────────────────────────────────
exports.getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, description, owner_id, start_date, end_date, created_at FROM projects ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── GET PROJECT BY ID ──────────────────────────────────
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, description, owner_id, start_date, end_date, created_at FROM projects WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get project by id error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── UPDATE PROJECT ────────────────────────────────────
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, owner_id, start_date, end_date } = req.body;

    const result = await pool.query(
      `UPDATE projects
       SET name = $1,
           description = $2,
           owner_id = $3,
           start_date = $4,
           end_date = $5,
           updated_at = NOW()
       WHERE id = $6
       RETURNING id, name, description, owner_id, start_date, end_date, updated_at`,
      [name, description, owner_id, start_date, end_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    res.json({
      message: 'Project berhasil diperbarui',
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── DELETE PROJECT ────────────────────────────────────
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    res.json({ message: 'Project berhasil dihapus' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
