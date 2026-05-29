const addBtn = document.getElementById("addBtn");

const taskInput =
  document.getElementById("taskInput");

const taskList =
  document.getElementById("taskList");

const taskCounter =
  document.getElementById("taskCounter");

const allBtn =
  document.getElementById("allBtn");

const completedBtn =
  document.getElementById("completedBtn");

const pendingBtn =
  document.getElementById("pendingBtn");



let tasks = [];

let currentFilter = "all";



// FETCH TASKS

async function fetchTasks() {

  const response = await fetch(
    "http://localhost:5000/tasks"
  );

  tasks = await response.json();

  displayTasks();
}



// DISPLAY TASKS

function displayTasks() {

  taskList.innerHTML = "";



  taskCounter.innerText =
    `Total Tasks: ${tasks.length}`;



  if (tasks.length === 0) {

    taskList.innerHTML = `
      <p class="empty-message">
        No tasks yet 🚀
      </p>
    `;

    return;
  }



  let filteredTasks = tasks;



  if (currentFilter === "completed") {

    filteredTasks =
      tasks.filter(task => task.completed);

  }

  else if (currentFilter === "pending") {

    filteredTasks =
      tasks.filter(task => !task.completed);

  }



  filteredTasks.forEach((task) => {

    const originalIndex =
      tasks.indexOf(task);



    const li =
      document.createElement("li");



    if (task.completed) {

      li.classList.add("completed");

    }



    li.innerHTML = `
      <span class="task-text">
        ${task.text}
      </span>

      <div class="task-buttons">

        <button class="editBtn">
          ✏️
        </button>

        <button class="completeBtn">
          ✔️
        </button>

        <button class="deleteBtn">
          ❌
        </button>

      </div>
    `;



    // EDIT TASK

    const editBtn =
      li.querySelector(".editBtn");

    editBtn.onclick = async function () {

      const updatedText = prompt(
        "Edit your task:",
        task.text
      );



      if (
        updatedText === null ||
        updatedText.trim() === ""
      ) {

        return;
      }



      await fetch(
        `http://localhost:5000/tasks/edit/${originalIndex}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            text: updatedText.trim()
          })
        }
      );



      fetchTasks();
    };



    // COMPLETE TASK

    const completeBtn =
      li.querySelector(".completeBtn");

    completeBtn.onclick =
      async function () {

      await fetch(
        `http://localhost:5000/tasks/complete/${originalIndex}`,
        {
          method: "PUT"
        }
      );

      fetchTasks();
    };



    // DELETE TASK

    const deleteBtn =
      li.querySelector(".deleteBtn");

    deleteBtn.onclick =
      async function () {

      await fetch(
        `http://localhost:5000/tasks/${originalIndex}`,
        {
          method: "DELETE"
        }
      );

      fetchTasks();
    };



    taskList.appendChild(li);

  });

}



// ADD TASK

async function addTask() {

  const taskText =
    taskInput.value.trim();



  if (taskText === "") {

    alert("Please enter a task");

    return;
  }



  await fetch(
    "http://localhost:5000/tasks",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        text: taskText
      })
    }
  );



  taskInput.value = "";

  fetchTasks();
}



// BUTTON CLICK

addBtn.onclick = addTask;



// ENTER KEY SUPPORT

taskInput.addEventListener(
  "keypress",
  function (e) {

    if (e.key === "Enter") {

      addTask();

    }

  }
);



// FILTERS

allBtn.onclick = function () {

  currentFilter = "all";

  displayTasks();
};



completedBtn.onclick =
  function () {

  currentFilter = "completed";

  displayTasks();
};



pendingBtn.onclick =
  function () {

  currentFilter = "pending";

  displayTasks();
};



// INITIAL LOAD

fetchTasks();