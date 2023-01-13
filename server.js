const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const MyFruits = require('./models/fruits')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}));


let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.1dnn4wp.mongodb.net/fruits?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  });
  mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
  });

  MyFruits.create({
    name: "apple",
    color: "red",
    age: 14,
    readyToEat: true
  })

// before I can ask and send data into the collection, I need to create a model
app.post('/create_fruit', (req,res) => {
    console.log(req.body);
    console.log("running create fruit");
})
app.get('/get_data', (req,res) => {
    // Get data from MongoDB
    // res.json(data)
    console.log("request received at /get_data");
    console.log(process.env.Kingcourt86);
    res.send({data: "response from server"})
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})