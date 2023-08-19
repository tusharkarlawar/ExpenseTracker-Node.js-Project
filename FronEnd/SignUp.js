var homepage = document.getElementById("signup-form");
var ul_outputList = document.getElementById("ullist");

homepage.addEventListener("submit", addingData = async function(event){
    event.preventDefault(); 
  
    var email = document.getElementById("email").value;
    
    var password = document.getElementById("password").value;

    let obj = {
      
      email: email,
      password: password
    };

    async function postdata(){
        try{
            const response = await axios.post(`http://localhost:3000/api/logindata/Login`,obj)
            alert("logged in successfully");
        }

        catch(error){
            (console.log(error));
            const para = document.createElement("p");
            const node = document.createTextNode("User not exists");
            para.appendChild(node);
            ul_outputList.appendChild(para);
        }
    }
    postdata();
});