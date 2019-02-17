const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models/user');

router.post('/signup', (req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        console.log("user \n" );
        console.log(user);
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Email already exists!!'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                console.log(hash);
                if(err){
                // if(false){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        user_type: 'user'
                    });
                    console.log("user 2 \n ");
                    console.log(user);
                    user.save()
                    .then(result =>{
                        res.status(201).json({
                            message: "User created successfully!!"
                        });
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: "Failed to create a user, try back again after sometime!",
                            error: err 
                        });
                    });
                }
            });
        }
    });
});

router.post('/admin-signup', (req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Email already exists!!'
            });
        }else{
            bcrypt.hash(req.body.password, "mySaltOrSecretKey", (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        user_type: 'admin'
                    });
                    user.save()
                    .then(result =>{
                        res.status(201).json({
                            message: "Admin user created successfully!!"
                        });
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: "Failed to create a Admin user, try back again after sometime!",
                            error: err 
                        });
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                message: "Auth failure"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message: "Auth failed, password entered incorrect!!"
                })
            } 
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },'veryVerySecret',{expiresIn: '1h'});
                return res.status(200).json({
                    message: "Authentication successful",
                    user_type: user[0].user_type,
                    token : token
                });
            }
            res.status(401).json({
                message: "Auth failure!!"
            });
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err 
        });
    })
});

module.exports = router;