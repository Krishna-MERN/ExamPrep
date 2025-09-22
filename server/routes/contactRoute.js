const express = require('express')
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async(req , res)=>{
    const contact = new Contact(req.body)
    contact.save();
    return res.json({message:"Message Sended Successfully"})
})
// GET: Fetch all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router

