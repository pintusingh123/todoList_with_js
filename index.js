 
// ================= PAGE LOAD =================

// window.onload -> page load hote hi ye function automatically run hotta hai
// iska use hum yaha localStorage se tasks fetch karke UI me show karne ke liye kar rahe hain
window.onload = () => {
 
    fetchTask();
}


// ================= OPEN ADD TASK POPUP =================

// ye function SweetAlert2 popup open karta hai jisme task add karne ka form hota hai
// form submit hone par createTask(event) function call hota hai
const OpenPopUP = () => {

    new Swal({
        html:
            `<div class="text-left">
              <h1 class="text-xl font-semibold text-black">Add a new Task</h1>

          <!-- Task Create Form -->
          <form onsubmit="createTask(event)" class="flex flex-col  mt-2 gap-3">

            <!-- Task Input -->
            <input
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="task"
            id="task"
            placeholder="Enter your task..."
            >
            <input
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            type="date"
            name="date"
            id="date"
            
            >

        <!-- Submit Button -->
        <button type="submit"
            class="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
            <i class="ri-add-line"></i>
            Add
        </button>

    </form>
    </div>`,

        // SweetAlert ka default OK button hide karne ke liye
        showConfirmButton: false,
    })
}



// ================= CREATE TASK =================

// ye function tab run hota hai jab user task add form submit karta hai
function createTask(e) {

    // form submit hone par page reload hone se rokne ke liye
    e.preventDefault();

    // SweetAlert popup ke andar se input field select kar rahe hain
    const input = Swal.getPopup().querySelector("#task");

    // SweetAlert popup ke andar se date select kar rhe hai
    const dateInput = Swal.getPopup().querySelector("#date")
    // console.log(dateInput);

    // input value le rahe hain aur extra spaces remove kar rahe hain
    const task = input.value.trim();

    // date ki value get karna
    const DateValue = dateInput.value;
    // Date.now() se unique key generate kar rahe hain
    let key = Date.now();

    const payload = JSON.stringify({
        task: task,
        date: DateValue,
        status: "scheduled"
    })

    // localStorage me task save kar rahe hain
    localStorage.setItem(key, payload);


    // agar user empty task submit kare
    if (task === "") {
        Swal.fire({
            icon: "warning",
            title: "Task cannot be empty"
        })
        return
    }

    // success notification
    Swal.fire({
        title: "Created Task",
        icon: "success",
        toast: true,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        position: "top-end"
    })

        // notification ke baad page reload kar rahe hain
        .then(() => {
            location.reload();
        })
}



// ================= FETCH TASKS =================

// ye function localStorage se sab tasks lekar UI me show karta hai
const fetchTask = () => {

    // Object.keys() se localStorage ki sari keys array me mil jati hain
    const keys = Object.keys(localStorage);

    const allData = [];
    for (let key of keys) {
        const data = JSON.parse(localStorage.getItem(key));
        allData.push({...data, key: key});
    }

    // render all tasks
    renderTasks(allData);
}

//this fun created for updatestatus 
function updateStatus(e, key_id) {
    const status = e.target.value
    const StatusData = JSON.parse(localStorage.getItem(key_id))
    StatusData.status = status;
    localStorage.setItem(key_id, JSON.stringify(StatusData));
    Swal.fire({
        title: "Status Updated",
        icon: "success",
        toast: true,
        timer: 1000,
        text: status.toUpperCase(),
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-end"
    })
    console.log(StatusData);

}

// ================= DELETE TASK =================

// ye function specific task delete karta hai
const removeTask = (key) => {

    // localStorage se task remove
    localStorage.removeItem(key)

    // UI refresh karne ke liye page reload
    location.reload()

}



// ================= OPEN UPDATE POPUP =================

// ye function edit popup open karta hai
function UpdateTask(key_id) {

    // localStorage se current task value le rahe hain
    let taskData = JSON.parse(localStorage.getItem(key_id))

    new Swal({

        html:
            `<div class="text-left">

              <h1 class="text-xl font-semibold text-black">Edit Task</h1>

          <!-- Update Form -->
          <form onsubmit="SaveUpdateTask(event,'${key_id}')" class="flex flex-col  mt-2 gap-3">

            <!-- Input me existing task value show kar rahe hain -->
            <input
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            type="text"
            id="editTask"
            placeholder="Update your task..."
            value="${taskData.task}"
            >
            <input
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            type="date"
            id="editdate"
            value="${taskData.date}"
            >

        <!-- Save Button -->
        <button type="submit"
            class="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
            Save
        </button>

    </form>
    </div>`,

        showConfirmButton: false,
    })
}



// ================= SAVE UPDATED TASK =================

// ye function updated task ko localStorage me save karta hai
function SaveUpdateTask(e, key_id) {

    // page reload rokne ke liye
    e.preventDefault()

    // popup ke input field se value lena
    const inputBox = Swal.getPopup().querySelector("#editTask");
    const editdate = Swal.getPopup().querySelector("#editdate");

    const updateTask = inputBox.value.trim();


    // empty task validation
    if (updateTask === "") {

        Swal.fire({
            icon: "warning",
            title: "Task cannot be empty"
        })

        return
    }

    // existing data parse karo aur task update karo
    let taskData = JSON.parse(localStorage.getItem(key_id));
    taskData.task = updateTask;
    taskData.date = editdate.value;

    // same key me updated JSON object save karo
    localStorage.setItem(key_id, JSON.stringify(taskData));

    // success message
    Swal.fire({
        title: "Task Updated",
        icon: "success",
        toast: true,
        timer: 1000,
        showConfirmButton: false,
        position: "top-end",
    })

        // success ke baad UI reload
        .then(() => {
            location.reload();
        })
}

//filder and search fucntinality

const filter = (input) => {
    const keyword = input.value.trim().toLowerCase()
    const keys =  Object.keys(localStorage);
    const allData = [];
    for (let key of keys) {
        const data = JSON.parse(localStorage.getItem(key));
        allData.push({...data, key: key}); // add key for reference
    }

    let filteredData;
    if (keyword === '') {
        filteredData = allData;
    } else {
        filteredData = allData.filter((item) => {
            return item.task.toLowerCase().indexOf(keyword) != -1;
        });
    }

    // render filtered tasks
    renderTasks(filteredData);
}

const renderTasks = (tasks) => {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = ''; // clear existing

    let i = 1;
    for (let taskData of tasks) {
        const ui = ` 
        <tr class="border-b hover:bg-blue-50 transition">

            <td class="p-3 font-medium">${i}</td>

            <td class="p-3 ">${taskData.task[0].toUpperCase()}${taskData.task.slice(1)}</td>
            <td class="p-3">${moment(taskData.date).format('DD MMMM  YYYY')}</td>
            <td class="p-3">
            <select onchange="updateStatus(event,'${taskData.key}')" class="border border-gray-400 p-1 rounded">
            <option value="scheduled" ${taskData.status === 'scheduled' ? 'selected' : ''}>Scheduled</option>
            <option value="inprogress" ${taskData.status === 'inprogress' ? 'selected' : ''}>In Progress</option>
            <option value="canceled" ${taskData.status === 'canceled' ? 'selected' : ''}>Canceled</option>
            <option value="complete" ${taskData.status === 'complete' ? 'selected' : ''}>Completed</option>
            </select>
            </td>

            <td class="p-3">

                <div class="flex justify-center gap-4 text-lg">

                    <!-- Update Button -->
                    <button onclick="UpdateTask('${taskData.key}')" class="text-blue-600">
                        <i class="ri-pencil-fill"></i>
                    </button>

                    <!-- Delete Button -->
                    <button onclick="removeTask('${taskData.key}')" class="text-red-500">
                        <i class="ri-delete-bin-2-fill"></i>
                    </button>

                </div>

            </td>

        </tr>
        `

        taskContainer.innerHTML += ui;
        i = i + 1;
    }
}