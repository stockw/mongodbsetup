const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// allows us to use information from .env in this file
require('dotenv').config()

// import MyFruit object from fruit.js
const MyFruits = require('./models/fruits')

const MyVeggies = require('./models/veggies');

// create app by calling express function
const app = express()

// tells express to serve our public folder by default when someone makes a request to this port
app.use(express.static('public'))

// parses (makes readable) string JSON back into actual objects found in req.body
app.use(express.json())

// allow use of queries in URL (?limit=2&color=green) 
// extended allows nested objects in URL
app.use(express.urlencoded({extended:true}));

app.use(cors({
  origin: '*'
}));



// string we get from MongoDB - we hide our username and password in our .env file
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.1dnn4wp.mongodb.net/fruits?retryWrites=true&w=majority`;

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  });
  // function will activate once to let us know we are connected
  mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
  });

 

// before I can ask and send data into the collection, I need to create a model

app.post('/create_fruit', async (req,res) => {
    // destructuring - see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // renaming variable while destrucutring: https://wesbos.com/destructuring-renaming
    const {nameString: name, colerString: color, ageNumber: age, readyBool: readyToEat} = req.body;
    

    // console.log("uploading to database...");
    // Model methods usually give us a promise, so we can wait for the response
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
    res.status(400);
    res.send(returnedValue);
})

// app.get('/get_data', (req,res) => {
//     // Get data from MongoDB
//     // res.json(data)
//     res.setHeader('Content-Type', 'application/json');

//     console.log("request received at /get_data");
//     console.log(process.env.Kingcourt86);
//     res.json({data: "response from server"})
// })

app.delete("/delete_nameless_data", async (reg, res) => {
  let response = await MyFruits.deleteMany({name: ""});
  
  console.log(response);

  res.send({data: `deleted ${response.deletedCount} items.`})
})

app.get('/get_food_data', async (req, res) => {
  // get data from database
  let response = await MyFruits.find({});
  console.log(response);
  // send it back to front end
  res.json(response)

});

app.post('/create_veggie', async (req, res) => {
  const {nameString: name, colerString: color, ageNumber: age, readyBool: readyToEat} = req.body

  let returnedValue = await MyVeggies.create({
    name,
    color,
    age,
    readyToEat
 })
 console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.status(400);
    res.send(returnedValue);
  });

app.get('/veggies', async (req, res) => {
  let response = await MyVeggies.find({});
  console.log(response);
  res.json(response)
});

app.get('/veggies/:veggieName', (req, res) => {

})



app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})