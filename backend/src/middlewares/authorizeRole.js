const authorizeRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso proibido: Permissões insuficientes!' });
  }
};

module.exports = {
  authorizeRole,
};
