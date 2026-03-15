//for automatic calling fun when page is open
window.onload = () => {
    fetchTask()
}

//this fun used for Open Task box form and calling createTask here
const OpenPopUP = () => {
    new Swal({

        html:
            `<div class="text-left" >
              <h1 class="text-xl font-semibold text-black">Add a new Task </h1>
          <form onsubmit="createTask(event)" class="flex flex-col md:flex-row mt-2 gap-3">
            <input
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            type="text"
            name="task"
            id="task"
            placeholder="Enter your task..."
        >

        <!-- Button -->
        <button type="submit" id="btn"
            class="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-1"
        >
            <i class="ri-add-line"></i>
            Add
        </button>

    </form>
              </div>`,
        showConfirmButton: false, //used for hidden ok btn in popup box
    })
}



function createTask(e) {
    e.preventDefault();

    const input = Swal.getPopup().querySelector("#task");
    const task = input.value.trim();
    let key = Date.now();
    localStorage.setItem(key, task);

    if (task === "") {
        Swal.fire({
            icon: "warning",
            title: "Task cannot be empty"
        })
        return
    }

    Swal.fire({
        title: "Created Task",
        icon: "success",

        toast: true,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        position: "top-end"
    }).then(() => {
        location.reload(); //used for when we added data then page reload for data show on the ui
    })
}

//fetching data from local storage =>
// page on hote hi kisi fun ko call krna ho to js ke top pr  window.onload =() =>{funName()}
const fetchTask = () => {
    //finding localstorage length using OBject.keys()
    const keys = Object.keys(localStorage); //it return all length of localstorage in  array formate

    //select taskcontainer
    const taskContainer = document.getElementById("taskContainer")


    //we looping for get seperatly key's
    let i = 1;
    for (let key of keys) {
        const task = localStorage.getItem(key);
        const ui = ` 
                  <tr class="border-b hover:bg-blue-50 transition">
                                <td class="p-3 font-medium">${i}</td>
                                <td class="p-3">${task}</td>

                                <td class="p-3">
                                    <div class="flex justify-center gap-4 text-lg">

                                        <button onclick="UpdateTask('${key}')" class="text-blue-600 hover:text-blue-800">
                                            <i class="ri-pencil-fill"></i>
                                        </button>

                                        <button id='remove' onclick="removeTask('${key}')" class="text-red-500 hover:text-red-700">
                                            <i class="ri-delete-bin-2-fill"></i>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                            `
        // ui mai jo taskcontainer hai usme ise pass kar rhe hai 
        taskContainer.innerHTML += ui  //we use += for dont lossing our older task data 
        //update idex value of task=>
        i = i + 1;
    }

}

//delet items 
const removeTask = (key) => {

    localStorage.removeItem(key)
    location.reload() //rable refresh karne ke liye
    // console.log(key);


}

//update task => 
function UpdateTask(key_id) {
 
    let InputValue = localStorage.getItem(key_id)
    // console.log(InputValue);

    new Swal({

        html:
            `<div class="text-left" >
              <h1 class="text-xl font-semibold text-black">Edit Tast</h1>
          <form onsubmit="SaveUpdateTask(event,'${key_id}' )" class="flex flex-col md:flex-row mt-2 gap-3">
            <input
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            type="text"
            name="task"
            id="editTask"
            placeholder="Update your task..."
            value="${InputValue}"
        >

        <!-- Button -->
        <button type="submit" id="save-btn"
            class="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-1"
        >
            <i class="ri-add-line"></i>
            Save
        </button>

    </form>
              </div>`,
        showConfirmButton: false, //used for hidden ok btn in popup box
    })
 
    

}

function SaveUpdateTask(e,key_id){
    e.preventDefault()
    const inputBox = Swal.getPopup().querySelector("#editTask");
    const updateTask = inputBox.value.trim();

    if(updateTask === ""){
        Swal.fire({
            icon:"warning",
            title:"Task cannot be empty"
        })
        return
    }
    // but agr sahi hai sab kuch to 
    localStorage.setItem(key_id,updateTask);
    Swal.fire({
        title:"Task Updated",
        icon:"success",
        toast:true,
        timer:1000,
        showConfirmButton:false,
        position:"top-end",
    }).then(()=>{
        location.reload();
    })
}