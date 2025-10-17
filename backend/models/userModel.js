const express=require('express');
const mongoose=require('mongoose');
const userSchema=require('../schemas/userSchema');

const userModel = mongoose.model('userModel', userSchema,'user');
model.exports=userModel;