var signuppage = document.getElementById("signupForm");
var ul_outputList = document.getElementById("unSortedList_outputList");
var signupButton = document.getElementById("signupButton");
var signupLink = document.getElementById("signupLink");

signupLink.addEventListener("click", function(event) {
event.preventDefault();
window.location.href = "login.html"; // Redirect to signup page
});

signuppage.addEventListener("submit", addingData = async function(event){
    event.preventDefault(); 
    var Name = document.getElementById("Name").value;
    var Email = document.getElementById("Email").value;
    var ConformEmail = document.getElementById("ConformEmail").value;
    var Password = document.getElementById("Password").value;
  
    let obj = {
      Name: Name,
      Email: Email,
      ConformEmail: ConformEmail,
      Password: Password
    };

    async function postdata(){
        try{
            // const response =  await axios.post(`http://localhost:3000/api/SignUpData/SignUp`,obj)
            const response =  await axios.post(`http://localhost:3000/api/User/SignUp`,obj)
            event.preventDefault();
            alert("Account created");
            window.location.href = "login.html"; // Redirect to login page
        }
        
        catch(error){
            await(console.log(error));
                    const para = document.createElement("p");
                    const node = document.createTextNode("User already exists");
                    para.appendChild(node);
                    ul_outputList.appendChild(para);
        }
    }
    postdata();
});



