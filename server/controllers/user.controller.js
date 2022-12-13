
const User = require('../models/user.model')
const userRoutes = require('../routes/user.routes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getAllUsers = (req,res) =>{
    User.find()
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}

const getOneUser = (req,res) =>{
    User.findById(req.params.id)
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}

const login = (req,res) =>{
    User.findOne({email: req.body.email})
    .then((user) =>{
        bcrypt.compare(req.body.password, user.password)
        .then((passwordCheck) =>{
            if(!passwordCheck){
                return res.status(400).send({
                    message: "Passwords Do Not Match",
                    error
                })
            }
            const token = jwt.sign({
                userId: user._id,
                userEmail: user.email
            },
            "RANDOM-TOKEN",
            {expiresIn: "24h"}
            )
            res.cookie('token',token,{httpOnly: true,expires: new Date(Date.now() + 900000)}).status(200).send({
                message: "Login Successful",
                email: user.email
            })
        })
        .catch((error) =>{
            res.status(400).send({
                message: "Passwords Do Not Match",
                error
            })
        })
    })
    .catch((e) =>{
        res.status(404).send({
            message: "Email Not Found ",
            e
        })
    })
}


    const register = (req,res) =>{
        bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) =>{
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            user.save()
            .then((result) =>{
                res.status(201).send({
                    message: 'User Created Successfully',
                    result
                })
            })
        })
        .catch((error) =>{
            res.status(500).send({
                message: "Error Creating User",
                error
            })
        })
        .catch((e) =>{
            res.status(500).send({
                message: "Password Was Not Hashed Successfully",
                e
            })
        })
    }
    
    const logOut = (req,res,next) =>{
        res.clearCookie('token')
        res.status(200).json({
            success: true,
            message: "Logged out."
        })
    }


const editOneUser = (req,res) =>{
    User.updateOne({_id:req.params.id},req.body, {new:true, runValidators:true})
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}

const deleteOneUser = (req,res) =>{
    User.deleteOne({_id:req.params.id})
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}


module.exports = {
    getAllUsers,
    getOneUser,
    login,
    logOut,
    register,
    editOneUser,
    deleteOneUser
}


