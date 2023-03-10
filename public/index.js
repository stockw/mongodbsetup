// const { response } = require('express');

console.log("js file connected");


let submitButton = document.getElementById('submit-fruit')

submitButton.addEventListener('click', async () => {
   // send request to server
   // result is the response from server
//    let result = await fetch("/get_data")
//    let finalData = await result.json()
//       console.log(finalData);
   // get element
      // let nameString = document.getElementById('name;-input')
      // // get value
      // let nameString = nameElement.value;
      let nameString = document.getElementById('name-input').value;
      let colorString = document.getElementById('color-input').value;
      let ageNumber = +document.getElementById('age-input').value;
       // using ternary operator here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
      let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;

       // packing all our data in an object
      // same as 
      // nameString: nameString
      const fruit = {
         nameString,
         colorString,
         ageNumber,
         readyBool
      }

      // console.log(JSON.stringify(fruit));

      let response = await fetch('http://localhost:5000/create_fruit', {
         method: "POST",
         headers: {'Content-Type': 'application/json',
         },
          // to send JSON data over HTTP
         body: JSON.stringify(fruit)  
      })
      // let uploadStatusTag = document.getElementById('upload-status');
      // console.log(response.status);
      // if (response.status === 200) {
      //    console.log(response);
      //    console.log("upload complete!");
      //    uploadStatusTag.textContent = "Upload Complete";
      //    uploadStatusTag.style.color = "green"

      // } else {
      //    console.log(response);
      //    console.log("upload failed");
      //    console.log();
      //    uploadStatusTag.textContent = "Upload Failed";
      //    uploadStatusTag.style.color = "red";
      // }
      
      // axios({
   //    method: "post",
   //    url: "'http://localhost:5000/create_fruit",
   //    bosy: fruit
   // })

   })


let deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', async () => {
   let response = await fetch ('http://localhost:5000/delete_nameless_data', {
      method: "delete",
   });
   //console.log(response);

let parsedData = await response.json ()
console.log(parsedData);
});

let displayPageButton = document.getElementById('display-page-button');

displayPageButton.addEventListener('click', () => {
   // change HTML files (from index to display_food.html)
   window.location.href = './display_food'
})


let submitVeggie = document.getElementById('submit-veggie')

submitVeggie.addEventListener('click', async () => {
   let nameString = document.getElementById('name-input').value;
   let colorString = document.getElementById('color-input').value;
   let ageNumber = +document.getElementById('age-input').value;
   let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;

   const veggie = {
      nameString,
      colorString,
      ageNumber,
      readyBool
   }
   // console.log(JSON.stringify(veggie));

    let response = await fetch('http://localhost:5000/create_veggie', {
         method: "POST",
         headers: {'Content-Type': 'application/json',
         },
          // to send JSON data over HTTP
         body: JSON.stringify(veggie)  
      })
      // let uploadStatusTag = document.getElementById('upload-status');
      // console.log(response.status);
      // if (response.status === 200) {
      //    console.log(response);
      //    console.log("upload complete!");
      //    uploadStatusTag.textContent = "Upload Complete";
      //    uploadStatusTag.style.color = "green"

      // } else {
      //    console.log(response);
      //    console.log("upload failed");
      //    console.log();
      //    uploadStatusTag.textContent = "Upload Failed";
      //    uploadStatusTag.style.color = "red";
      // }
});

let displayVeggieButton = document.getElementById('display-veggie-button')

displayVeggieButton.addEventListener('click', async () => {
   window.location.href = './display_veggies'
})