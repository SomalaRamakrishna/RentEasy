const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config({ quiet: true });
const UserModel = require('../models/UserModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rent-easy-secret';

 const registerController = async (req, res) => {
  const { name, email, password, role } = req.body;
   // console.log("entered register",req.body);
  try {
    const existing = await UserModel.findOne({ email });
    
    if (existing) return res.status(400).json({ message: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword, role });
    /* console.log("user: ",user); */
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed.', error: err.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
    
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found.' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password.' });
   // console.log("entered login",user);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed.', error: err.message });
  }
};

module.exports = {
    registerController, 
    loginController
};
