const mongoose = require('mongoose');
require('dotenv').config();

 const mongoURL = process.env.DB_URL

 mongoose.connect(mongoURL)


 const db = mongoose.connection;

 db.on('connected',  () => {
   console.log('Database connected successfully');
 });

 db.on('error', (err) => {
   console.error('Database connection error:', err);
 });

 db.on('disconnected', () => {
   console.log('Database disconnected');
 });

  module.exports = db;
