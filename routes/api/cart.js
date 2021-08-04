const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Shopcart = require('../../models/Shopcart');

//POST('/api/cart')     add to cart     private  
router.post('/',[auth,
    check('title','title is required').notEmpty(),
    check('imagename','imagename is required').notEmpty(),
    check('price','price is required').notEmpty(),
    ],async (req,res) =>{
        let bugs = validationResult(req);
        if(!bugs.isEmpty()){
            return res.status(400).json({errors : bugs.array()});
        }
        const {
            title,
            imagename,
            price
        }  = req.body;
    
        try{
            let newCart = new Shopcart({
                user : req.user.id,
                title,
                imagename,
                price
            })
            await newCart.save();
            let myCart = await Shopcart.find({user:req.user.id})
            res.json(myCart);
        }
        catch(err){
            console.error(err.message);
            return res.status(500).send('Server Error..')
        }
    
    })

//GET('/api/cart')     get my cart     private  
router.get('/',auth,async (req,res) =>{
    try{
        let myCart = await Shopcart.find({user:req.user.id})
        res.json(myCart);
    }
    
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error..')
    }
})

//GET('/api/cart/:id')     get my cart     private  
router.get('/:id',auth,async (req,res) =>{
    try{
        let myCart = await Shopcart.findById(req.params.id);
        if(!myCart){
            return res.status(404).json({ msg: 'cart id not found' });
        }
        if(myCart.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized' });
        }
        return res.json(myCart);
    }
    catch(err){
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg:'Cart Id not found'});
        }
        console.error(err.message);
        return res.status(500).send('Server Error..')
    }
})



//GET('/api/cart/:id')     get my cart     private  
router.delete('/:id',auth,async (req,res) =>{
    try{
        let myCart = await Shopcart.findById(req.params.id);
        if(!myCart){
            return res.status(404).json({ msg: 'cart id not found' });
        }
        if(myCart.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await myCart.remove();
        let myRemainingCart = await Shopcart.find({user:req.user.id})
        res.json(myRemainingCart);

    }
    catch(err){
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg:'Cart Id not found'});
        }
        console.error(err.message);
        return res.status(500).send('Server Error..')
    }
})

module.exports = router;