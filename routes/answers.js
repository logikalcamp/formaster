'use-strict'
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Answers = require('../models/Answers');

router.get('/:id',(req,res)=>{
    let formID = req.params.id
    Answers.find({formID},(err,data)=>{
        if(err) console.log(err)
        res.send(data)
    })
})


router.post('/',(req,res)=>{
    let ans = new Answers(req.body)
    // form = req.body
    ans.save(function(err,doc){
        if(err) console.log(err)
        res.send(doc)
    })
})

module.exports = router