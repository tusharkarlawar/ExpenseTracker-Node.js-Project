var form = document.getElementById("expenses-data");
var ul = document.getElementById("ullist");


form.addEventListener("submit", adding = function (e) {
  e.preventDefault();
  var expense_amount= document.getElementById("expense").value;
  var description = document.getElementById("description").value;
  var category=document.getElementById("category").value;

  let obj = {
    expense_amount: expense_amount,
    description: description,
    category:category
  };

  //console.log(obj)

  async function postData() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/expenses",
        obj
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
    const response = await axios.get(
      "http://localhost:3000/api/expenses"
    );
      console.log("getting all users=",response.data);
    for (let i = 0; i < response.data.length; i++) {
      showOutput(response.data[i], response.data[i].id);
    }
  } catch (error) {
    console.error(error);
  }
});


function showOutput(obj, obj_id) {

  var list = document.createElement("li");

  list.appendChild(document.createTextNode(obj.expense_amount+ " - " + obj.description + "-" +obj.category+ " "));

  var deletebtn = document.createElement("button");
  deletebtn.className = "delete";
  deletebtn.appendChild(document.createTextNode("Delete"));
  list.appendChild(deletebtn);

  // var editbtn = document.createElement("button");
  // editbtn.className = "edit";
  // editbtn.appendChild(document.createTextNode("Edit"));
  // list.appendChild(editbtn);


  list.setAttribute('data-id', obj_id);


  ul.appendChild(list);

}



ul.addEventListener('click', removeitem = function (e) {

  if (e.target.classList.contains('delete')) {
    console.log(e.target);
    var li = e.target.parentNode;
    console.log("li=", li);
    var id = li.getAttribute('data-id');
    console.log("id=", id);

    document.getElementById("expense").value='';
    document.getElementById("description").value='';
    document.getElementById("category").value='';

    async function deleteData() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/expenses/${id}`
        );

        //console.log(response.data);
        ul.removeChild(li);
      } catch (error) {
        console.log(error);
      }
    }

    deleteData();
  }

  if (e.target.classList.contains('edit')) {
    console.log(e.target);
    var li = e.target.parentNode;
    console.log("li=",li.textContent);
    let arr=li.textContent.split('-');
    console.log((arr));


    var id = li.getAttribute('data-id');
    console.log("id=", id);

    document.getElementById("expense").value=arr[0];
    document.getElementById("description").value=arr[1];
    document.getElementById("category").value=arr[2];

    // async function editData() {
    //   try {
    //     const response = await axios.delete(
    //       `http://localhost:3000/api/expenses/${id}`
    //     );

    //     //console.log(response.data);
    //     ul.removeChild(li);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // editData();
  }

});

