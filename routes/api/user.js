const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Shopuser = require('../../models/Shopuser');
const auth = require('../../middleware/auth');


// POST(/api/user) registration public

router.post('/',[
    check('name','Name is required').notEmpty(),
    check('phone','Mobile number is required').notEmpty(),
    check('email','Enter valid mail').isEmail(),
    check('password','Password shoud be more than 5 character').isLength({min:5}),
    check('address','Address is required').notEmpty(),
    check('state','state is required').notEmpty(),
    check('city','City is required').notEmpty(),
    check('pincode','Pincode is required').notEmpty(),
],async (req,res)=>{
    let bugs = validationResult(req);
    if(!bugs.isEmpty()){
        return res.status(400).json({errors : bugs.array()})
    }
    const {
        name,
        phone,
        email,
        password,
        address,
        state,
        city,
        pincode
    } = req.body;
    try{
        let exist = await Shopuser.findOne({email})
        if(exist){
            return res.status(400).json({errors : [{msg:'User already exist'}]});
        }
        let newUser = new Shopuser({
            name,
            phone,
            email,
            password,
            address,
            state,
            city,
            pincode
        });
        await newUser.save();
        let payload = {
            user:{
                id:newUser.id
            }
        }
        jwt.sign(
            payload,
            'jwtSecret',
            {expiresIn:36000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token})
            }
        )
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error')
    }
   
})

// GET(/api/user/profile)   get my profile private
router.get('/profile',auth,async (req,res)=>{
    try{
        const user = await Shopuser.findById(req.user.id).select('-password');
        if (!user){
            return res.status(400).json({msg:'profile not exist'})
        }
        return res.json(user);
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error..');
    }
})

// PUT(/api/user/profile/edit)  edit the profile    private
router.put('/profile/edit',[auth,
    check('name','Name is required').notEmpty(),
    check('phone','Mobile number is required').notEmpty(),
    check('email','Enter valid mail').isEmail(),
    check('address','Address is required').notEmpty(),
    check('state','state is required').notEmpty(),
    check('city','City is required').notEmpty(),
    check('pincode','Pincode is required').notEmpty(),
],async (req,res) =>{

    let bugs = validationResult(req);
    if(!bugs.isEmpty()){
        return res.status(400).json({errors : bugs.array()})
    }
    const {
        name,
        phone,
        email,
        address,
        state,
        city,
        pincode
    } = req.body;
    try{
        const existingUser  = await Shopuser.findById(req.user.id);
        const updatingUser = new Shopuser({
            _id:req.user.id,
            name,
            phone,
            email,
            password:existingUser.password,
            address,
            state,
            city,
            pincode

        })
        await Shopuser.updateOne({_id:req.user.id},updatingUser);
        let user = await Shopuser.findById(req.user.id).select('-password')
        return res.json(user) // need to destructure in front-end
        
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error')
    }
})


module.exports = router;