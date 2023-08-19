var homepage = document.getElementById("signup-form");
var ul_outputList = document.getElementById("ullist");

homepage.addEventListener("submit", addingData = async function(event){
    event.preventDefault(); 
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    
    var password = document.getElementById("password").value;

    let obj = {
      name: name,
      email: email,
      password: password
    };

    async function postdata(){
        try{
            const response = await axios.post(`http://localhost:3000/api/users/SignUp`,obj)

        }

        catch(error){
            (console.log(error));
            const para = document.createElement("p");
            const node = document.createTextNode("User already exists");
            para.appendChild(node);
            ul_outputList.appendChild(para);
        }
    }
    postdata();
});
