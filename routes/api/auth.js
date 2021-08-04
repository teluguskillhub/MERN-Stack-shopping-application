const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Shopuser = require('../../models/Shopuser');
const { check, validationResult } = require('express-validator');

// POST(/api/auth) login public

router.post('/',[
    check('email','Enter valid mail').isEmail(),
    check('password','Password shoud be >= 5 character').isLength({min:5}),
],async (req,res)=>{
    let bugs = validationResult(req);
    if(!bugs.isEmpty()){
        return res.status(400).json({ errors : bugs.array() });
    }
    const {email,password} = req.body;
    try{
        let userExist = await Shopuser.findOne({email})
        if(!userExist){
            return res.status(400).json({errors : [{msg:'Invalid Credentials'}]})
        }
        const isMatch = (userExist.password === password);
        if(!isMatch){
            return res.status(400).json({errors : [{msg:'Invalid Credentials'}]})
        }
        let payload = {
            user:{
                id : userExist.id
            }
        }
        jwt.sign(
            payload,
            'jwtSecret',
            {expiresIn : 360000},
            (err,token)=>{
                if (err) throw err;
                return res.json({token});
            }
        )
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;