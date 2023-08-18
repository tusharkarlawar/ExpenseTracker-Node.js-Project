var form = document.getElementById("signup-form"); 

form.addEventListener("submit", adding = function (e) { 
  e.preventDefault(); 
  var name = document.getElementById("name").value; 
  var email = document.getElementById("email").value; 
  var password = document.getElementById("password").value; 
 
 
 
  let obj = { 
    name: name, 
    email: email,
    password: password 
  }; 

  async function postData() { 
    try { 
      const response = await axios.post( 
        "http://localhost:3000/api/mydata", 
        obj 
      ); 
 
      showOutput(obj, response.data.id);
     
 
    } catch (error) { 
      console.log(error); 
    } 
  } 
 
  postData(); 
 
});

 