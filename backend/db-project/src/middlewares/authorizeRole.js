const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Acesso proibido: Permissões insuficientes!' });
  }
  next();
}

module.exports = {
  authorizeRole,
};
