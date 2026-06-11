const jwt = require('jsonwebtoken');

// Middleware = fungsi yang berjalan SEBELUM request sampai ke controller
// Ibaratnya satpam yang cek ID sebelum kamu boleh masuk ruangan

module.exports = (req, res, next) => {
  // 1. Ambil token dari header "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  // 2. Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid atau expired' });
    }
    // 3. Simpan data user ke req agar bisa diakses controller
    req.user = decoded;
    next(); // lanjut ke controller
  });
};