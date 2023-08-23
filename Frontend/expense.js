var Expensepage= document.getElementById("ExpenseForm");
var ul_outputList = document.getElementById("unSortedList_outputList");

        Expensepage.addEventListener("submit", addingData = async function(event){
                event.preventDefault(); 
                var expenseamount = document.getElementById("expenseamount").value;
                var description = document.getElementById("description").value;
                var category = document.getElementById("category").value;
              
                let obj = {
                    expenseamount: expenseamount,
                    description: description,
                    category: category,
                };
            async function postData() {
                try {
                  const token = localStorage.getItem('token')
                const response = await axios.post(
                    "http://localhost:3000/api/expenseData",
                    obj
                    ,{headers: {"Authorization": token}}
                );
                showOutput(obj, response.data.id);
                console.log("response.data=", response.data);
                } catch (error) {
                console.log(error.response);
                }
            }

            postData();

            });

            function showPremiumuserMessage(){
              document.getElementById('rzp-button1').style.visibility="hidden"
                document.getElementById('message').innerHTML= "you are a premium user"
            }

            function parseJwt (token) {
                  var base64Url = token.split('.')[1];
                  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  }).join(''));
              
                  return JSON.parse(jsonPayload);
              }

            document.addEventListener("DOMContentLoaded", async () => {
            try {
              const token = localStorage.getItem('token')
              console.log(token);
              const decodedToken = parseJwt(token)
                console.log(decodedToken)
                const ispremiumuser = decodedToken.ispremiumuser
                if(ispremiumuser){
                  showPremiumuserMessage()
                }
                const response = await axios.get(
                "http://localhost:3000/api/expenseData"
                ,{headers: {"Authorization": token}}
                );
                for (let i = 0; i < response.data.length; i++) {
                showOutput(response.data[i], response.data[i].id);
                }
            } catch (error) {
                console.error(error.response);
            }
            });


            function showOutput(obj, obj_id) {

            var list = document.createElement("li");

            list.appendChild(document.createTextNode(obj.expenseamount + " - " + obj.description + "-" +obj.category+ " "));

            var deletebtn = document.createElement("button");
            deletebtn.className = "delete";
            deletebtn.appendChild(document.createTextNode("Delete"));
            list.appendChild(deletebtn);

            list.setAttribute('data-id', obj_id);


            ul_outputList.appendChild(list);

            }
            ul_outputList.addEventListener('click', removeitem = function (e) {

                if (e.target.classList.contains('delete')) {
                  console.log(e.target);
                  var li = e.target.parentNode;
                  console.log("li=", li);
                  var id = li.getAttribute('data-id');
                  console.log("id=", id);
              
              
              
                  async function deleteData() {
                    try {
                      const token = localStorage.getItem('token')
                      const response = await axios.delete(
                        `http://localhost:3000/api/expenseData/${id}`
                        ,{headers: {"Authorization": token}}
                      );
                      ul_outputList.removeChild(li);
                    } catch (error) {
                      console.log(error);
                    }
                  }
              
                  deleteData();
                }
            });         

            document.getElementById('rzp-button1').onclick = async function(e){
              const token = localStorage.getItem('token')
              const response = await axios.get(
                "http://localhost:3000/api/premiummembership"
                ,{headers: {"Authorization": token}}
              );
              console.log(response);
              var options =
              {
                "key": response.data.key_id,
                "order_id": response.data.order.id,
                "handler": async function (response){
                  await axios.post('http://localhost:3000/api/updatetransactionstatus',{
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                  },{headers: {"Authorization": token} })

                  alert('you are a premium user now') 
                document.getElementById('rzp-button1').style.visibility="hidden"
                document.getElementById('message').innerHTML= "you are a premium user"

              }, 
              
              };

              const rzp1 = new Razorpay(options);
              rzp1.open();
              e.preventDefault();

            }