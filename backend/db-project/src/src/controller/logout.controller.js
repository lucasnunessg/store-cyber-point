const { addToDenylist } = require("../middlewares/isAuthenticated");

const logoutClient = (req, res) => {
  const { authorization } = req.headers;

  if(!authorization || authorization.startsWith('Bearer ')){
    return res.status(401).json({ message: 'Token incorreto' })
  }

  const token = authorization.split(' ')[1];

  try{
    addToDenylist(token);
    return res.status(200).json({ message: 'Logout efetuado com sucesso' })
  }
  catch(e){
    return res.status(401).json({ message: e.message })
  }
}

module.exports = {
  logoutClient,
}