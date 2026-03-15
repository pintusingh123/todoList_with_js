const OpenPopUP = () => {
    new Swal({

        html:
            `<div class="text-left" >
              <h1 class="text-xl font-semibold text-black">Add a new Task </h1>
                  <form class="flex flex-col md:flex-row mt-2 gap-3">
            <input
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            type="text"
            name="task"
            id="task"
            placeholder="Enter your task..."
        >

        <!-- Button -->
        <button id="btn"
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

