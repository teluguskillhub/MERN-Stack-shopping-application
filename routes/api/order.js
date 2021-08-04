const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Shoporder = require('../../models/Shoporder');
const Shopuser = require('../../models/Shopuser');

//POST('/api/order')     add to order     private  
router.post('/',[auth,
    check('title','title is required').notEmpty(),
    check('imagename','imagename is required').notEmpty(),
    check('price','price is required').notEmpty(),
    check('address','address is required').notEmpty(),
    ],async (req,res) =>{
        let bugs = validationResult(req);
        if(!bugs.isEmpty()){
            return res.status(400).json({errors : bugs.array()});
        }
        const {
            title,
            imagename,
            price,
            address
        }  = req.body;
    
        try{
            let newOrder = new Shoporder({
                user : req.user.id,
                title,
                imagename,
                price,
                address
            })
            await newOrder.save();
            let myOrder = await Shoporder.find({user:req.user.id})
            res.json(myOrder);
        }
        catch(err){
            console.error(err.message);
            return res.status(500).send('Server Error..')
        }
    
    })

//GET('/api/order')     get my order     private  
router.get('/',auth,async (req,res) =>{
    try{
        let myOrder = await Shoporder.find({user:req.user.id})
        res.json(myOrder);
    }
    
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error..')
    }
})

//GET('/api/order/:id')     get my cart     private  
router.get('/:id',auth,async (req,res) =>{
    try{
        let myOrder = await Shoporder.findById(req.params.id);
        if(!myOrder){
            return res.status(404).json({ msg: 'order id not found' });
        }
        if(myOrder.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized' });
        }
        return res.json(myOrder);
    }
    catch(err){
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg:'Order Id not found'});
        }
        console.error(err.message);
        return res.status(500).send('Server Error..')
    }
})



//DELETE('/api/order/:id')     delete my order     private  
router.delete('/:id',auth,async (req,res) =>{
    try{
        let myOrder = await Shoporder.findById(req.params.id);
        if(!myOrder){
            return res.status(404).json({ msg: 'order id not found' });
        }
        if(myOrder.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await myOrder.remove();
        let myRemainingOrder = await Shoporder.find({user:req.user.id})
        res.json(myRemainingOrder);

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