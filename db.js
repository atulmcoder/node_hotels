const mongoose = require('mongoose');

 const mongoURL = 'mongodb://localhost:27017/hotels'

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
