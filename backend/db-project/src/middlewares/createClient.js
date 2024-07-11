const { schemaLogin } = require('../schemas')

const validateCreation = (req, res, next) => {
  try{
    const { fullName, address, contact, email, password } = req.body;
    if(email === '' || fullName === '' || address === '', contact === '', password === ''){
      return res.status(400).json({ message: 'all fields is required' });
    }
    const { error } = schemaLogin.validate({ email, password });
    if(error) {
    return res.status(400).json({ message: 'Dados inválidos!' });
    } 
  }catch(e){
    console.log(e.message)
    return res.status(500).json({ message: 'internal server error' })
  }

}

module.exports = {
  validateCreation,
}