const Task = require('../models/task.model')
const taskRoutes = require('../routes/task.routes')
const jwt = require('jsonwebtoken')

const getAll = (req,res) =>{
    const {userId} = jwt.verify(req.cookies.token,"RANDOM-TOKEN")
    Task.find({user: userId})
    .populate('user','-password')
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}

const getOne = (req,res) =>{
    Task.findById(req.params.id)
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}


const addOne = (req,res) =>{
    const {userId} = jwt.verify(req.cookies.token,"RANDOM-TOKEN")
    const task = new Task(req.body)
    task.user = userId
    task.save()
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
    })
}


const editOne = (req,res) =>{
    Task.updateOne({_id:req.params.id},req.body, {new:true, runValidators:true})
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}

const deleteOne = (req,res) =>{
    Task.deleteOne({_id:req.params.id})
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}


module.exports = {
    getAll,
    getOne,
    addOne,
    editOne,
    deleteOne
}