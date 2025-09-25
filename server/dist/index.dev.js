"use strict";

var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

require('dotenv').config(); // Load .env


var app = express();
app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json()); // Connect to MongoDB

var URL = process.env.MONGO_URI;
mongoose.connect(URL).then(function () {
  console.log('✅ Successfully connected to MongoDB Atlas');
})["catch"](function (err) {
  console.error('❌ DB Connection Error:', err);
}); //apis started

app.use("/uploads", express["static"]("uploads"));
app.use("/api/examinee", require("./routes/examineeRoute")); //  admin apis started

app.use('/api/admin', require('./routes/adminRoute')); //  session api

app.use('/api/session/', require('./routes/sessionRoute')); // subject api

app.use('/api/subject/', require('./routes/subjectRoute')); // question api

app.use('/api/question/', require('./routes/questionRoute')); //examination api

app.use('/api/exams/', require('./routes/examinationRoute')); //message api

app.use('/api/message', require('./routes/messageRoute')); // api for dashboard

app.use('/api/dashboard/', require('./routes/dashboardRoute')); //api for contact form 

app.use('/api/contact/', require('./routes/contactRoute')); // apis ended
// Start server

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("\uD83D\uDE80 Server running on http://localhost:".concat(PORT));
});