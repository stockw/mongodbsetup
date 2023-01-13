
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

 

// before I can ask and send data into the collection, I need to create a model

app.post('/create_fruit', async (req,res) => {
    
    const {nameString: name, colerString: color, ageNumber: age, readyBool: readyToEat} = req.body;
    

    // // console.log("uploading to database...");
    let returnedValue = await MyFruits.create({
       name,
       color,
       age,
       readyToEat
    })
    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);
    // {
    //     name: "apple",
    //     color: "red",
    //     age: 14,
    //     readyToEat: true
    //   })
      res.send("good request")
})
app.get('/get_data', (req,res) => {
    // Get data from MongoDB
    // res.json(data)
    res.setHeader('Content-Type', 'application/json');

    console.log("request received at /get_data");
    console.log(process.env.Kingcourt86);
    res.json({data: "response from server"})
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})