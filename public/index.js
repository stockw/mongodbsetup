console.log("js file connected");


let submitButton = document.getElementById('submit-button')

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
      let nameString = document.getElementById('name=input').value;
      let colorString = document.getElementById('color-input').value;
      let ageNumber = +document.getElementById('age-input').value;
      let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;

      const fruit = {
         nameString,
         colorString,
         ageNumber,
         readyBool: typeof readyBool
      }

      console.log(fruit);

      fetch('http://localhost:5000/create_fruit', {
         method: "POST",
         body: fruit
         headers: {
            'Content=Type': 'application/json'
         }
      })

})


