const jwt = require('jsonwebtoken');

const auth = async (req,res,next) =>{
        const token = req.header('x-auth');
        if(!token){
            return res.status(400).send('Token Not Found');
        }

    try{
        jwt.verify(
            token,
            'jwtSecret',
            (error,decode) =>{
                if(error){
                    return res.status(401).json({msg:'Token not valid'})
                }
                else{
                    req.user = decode.user;
                    next();
                }
            }
        )   
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = auth;