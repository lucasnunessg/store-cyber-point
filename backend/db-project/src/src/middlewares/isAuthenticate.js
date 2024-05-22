
const isAuthenticated = async (req,res, next) => {
    try{
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).json({ message: 'Cliente não autorizado!' })
return next()
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Internal server error' })
    }

}

module.exports = {
    isAuthenticated,
}