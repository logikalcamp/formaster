'use-strict'
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Forms = require('../models/forms');

router.get('/:id',(req,res)=>{
    let _id = req.params.id
    Forms.find({_id},(err,data)=>{
        if(err) console.log(err)
        res.send(data)
    })
})


router.post('/',(req,res)=>{
    console.log(req.body)
    let form = new Forms(req.body)
    // form = req.body
    form.save(function(err,doc){
        if(err) console.log(err)
        res.send(doc)
    })
})

module.exports = router