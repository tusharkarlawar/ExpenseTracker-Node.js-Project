var loginpage = document.getElementById("loginForm");
var ul_outputList = document.getElementById("unSortedList_outputList");
var loginButton = document.getElementById("loginButton");
var loginLink = document.getElementById("loginLink");

        loginLink.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "signup.html"; // Redirect to login page
        });

        loginpage.addEventListener("submit", addingData = async function(event){
                event.preventDefault(); 
                var Name = document.getElementById("Name").value;
                var Password = document.getElementById("Password").value;
              
                let obj = {
                  Name: Name,
                  Password: Password
                };
    
                async function postdata(){
                    try{
                        // const response = await axios.post(`http://localhost:3000/api/SignUpData/Login`,obj)
                        const response = await axios.post(`http://localhost:3000/api/User/Login`,obj)    
                        event.preventDefault();
                            alert("logged in successfully");
                            localStorage.setItem('token',response.data.token)
                            window.location.href = "Expense.html"; // Redirect to login page
                    }
                    
                    catch(error){
                        if(error.response.status==401){
                        await(console.log(error));
                        const para = document.createElement("p");
                        const node = document.createTextNode("User not authorized");
                        para.appendChild(node);
                        ul_outputList.appendChild(para);
                        }
                        else{
                            await(console.log(error));
                        const para = document.createElement("p");
                        const node = document.createTextNode("User not found");
                        para.appendChild(node);
                        ul_outputList.appendChild(para);
                        }
                    }
                }
                postdata();
            });
    //