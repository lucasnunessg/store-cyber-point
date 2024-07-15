  const { schemaLogin } = require('../schemas');

  const validateCreation = (req, res, next) => {
    try {
      const { fullName, address, contact, email, password } = req.body;
      let { role } = req.body;

      if(!role) return role = 'client'
      
      if (!email || !password || !contact || !address || !fullName) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const { error } = schemaLogin.validate({ email, password });
      if (error) {
        return res.status(400).json({ message: 'Invalid data!' });
      }

      next();
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    validateCreation, 
  };
