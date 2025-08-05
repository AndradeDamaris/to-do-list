let tasks = [];
let complete = [];

let homeArea = document.getElementById("home-section");
let toDoArea = document.getElementById("to-do-section");
let resArea = document.getElementById("res-section");

function start() {
  let buttonHome = document.getElementById("buttonHome");
  homeArea.style.display = "none";
  toDoArea.style.display = "flex";
}

let dateToday = () => {
  let date = new Date();

  let weekDay = date.getDay();
  let weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  let showWeek = document.getElementById("week");

  let day = date.getDate().toString().padStart(2, "0");

  let showDay = document.getElementById("day");

  let month = date.getMonth();
  let monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let showMonth = document.getElementById("month");

  showWeek.innerHTML = `${weekDays[weekDay]}`;
  showDay.innerHTML = `${day}`;
  showMonth.innerHTML = `${monthNames[month]}`;
};

dateToday();

function addTask() {
  let inputValue = document.getElementById("to-do-input");
  let taskUser = inputValue.value.trim();

  let msg = document.getElementById("msg");

  if (taskUser == 0) {
    msg.innerText = "Digite uma tarefa para adiciona-la!";
  } else {
    addArray(taskUser);
    msg.innerText = "";
    console.log(
      `meu array tem ${tasks.length} itens sendo o primeiro ${tasks[0]} e eles são ${tasks}`
    );
    progress();
  }

  let buttonClean = document.getElementById("clean");
  buttonClean.style.display = "inline";

  inputValue.value = "";

  showTasks();
}

function addArray(taskUser) {
  tasks.push({ text: taskUser, check: false });
  console.log(tasks);
}

function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let newTask = document.createElement("li");
    let task = tasks[i];

    let inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.id = `tarefa-${Date.now()}-${i}`;
    inputCheck.checked = task.check;

    let label = document.createElement("label");
    label.htmlFor = inputCheck.id;
    label.textContent = task.text;
    if (task.check) label.style.textDecoration = "line-through";

    inputCheck.addEventListener("change", () => {
      task.check = inputCheck.checked;
      progress();

      showTasks();
      console.log(tasks);
    });

    newTask.appendChild(inputCheck);
    newTask.appendChild(label);
    taskList.appendChild(newTask);
  }
}

function progress() {
  let progressBar = document.getElementById("progress-bar");
  progressBar.style.width = "0%";

  let complete = 0;
  let total = tasks.length;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].check) {
      complete++;
      console.log(`tenho ${complete} tarefas concluidas`);
    }
  }

  if (total > 0) {
    let percent = 100 / total;
    let completeTotal = percent * complete;
    console.log(`a porcentagem de tarefas concluidas é ${completeTotal}%`);

    progressBar.style.width = completeTotal + "%";
    console.log("Progresso: " + completeTotal + "%");
  } else {
    progressBar.style.width = "0%";
    console.log("Sem tarefas ainda!");
  }
}

progress();

function cleanAll() {
  tasks = [];
  console.log("meu array ta vazio agora" + tasks);
  showTasks();
  progress();
}

function endDay() {
  let msg2 = document.getElementById("msg");

  if (tasks.length === 0) {
    msg2.innerText = "Por favor adicione uma tarefa";
  } else {
    toDoArea.style.display = "none";
    resArea.style.display = "flex";
    msg2.innerText = "";

    let result = document.querySelector(".p-final");
    let imgContainer = document.getElementById("imgContainer");
    let textRes = document.getElementById("result");

    imgContainer.innerHTML = "";
    textRes.innerText = "";

    let taskComplete = 0;
    let all = tasks.length;
    let allComplete = 0;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].check) taskComplete++;
    }

    if (all > 0) {
      let calculate = 100 / all;
      allComplete = calculate * taskComplete;
      result.innerText = `Seu progresso final: ${allComplete}%`;
    }

    let img = document.createElement("img");

    if (allComplete === 100) {
      img.src = "res2.png";

      textRes.innerText = "Congratulations!";
    } else {
      textRes.innerText = "Keep Going!";

      img.src = "res.png";
    }

    imgContainer.appendChild(img);
  }
}

function home() {
  tasks = [];
  resArea.style.display = "none";
  homeArea.style.display = "flex";
  progress();
  showTasks();
}
