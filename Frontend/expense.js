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
                    // UserId
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
                console.log(error);
                }
            }

            postData();

            });

            document.addEventListener("DOMContentLoaded", async () => {
            try {
              const token = localStorage.getItem('token')
              console.log(token);
                const response = await axios.get(
                "http://localhost:3000/api/expenseData"
                ,{headers: {"Authorization": token}}
                );
                for (let i = 0; i < 10; i++) {
                showOutput(response.data[i], response.data[i].id);
                }
            } catch (error) {
                console.error(error);
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
                      console.log(token);
                      const response = await axios.delete(
                        `http://localhost:3000/api/expenseData/${id}`,
                        {headers: {"Authorization": token}}
                      );
                      ul_outputList.removeChild(li);
                    } catch (error) {
                      console.log(error);
                    }
                  }
              
                  deleteData();
                }
            });