const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.static('public'))

app.get('/get_data', (req,res) => {
    console.log("request received at /get_data");
    console.log(process.env.Kingcourt86);
    res.send({data: "response from server"})
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})