window.addEventListener("load", init);
var incNumber;
function init() {
  bindEvents();
  countUpdate();
  //incNumber = initCount();
  incNumber = autoInc();
  printId();
}

const printId = () =>
  //(document.querySelector("#id").innerText = incNumber());
  (document.querySelector("#id").innerText = incNumber.next().value);

function bindEvents() {
  document.querySelector("#add").addEventListener("click", addTask);
  document.querySelector("#delete").addEventListener("click", deleteTasks);
  document.querySelector("#update").addEventListener("click", updateTask);
  document.querySelector("#save").addEventListener("click", saveTask);
  document.querySelector("#load").addEventListener("click", loadTask);
  document.querySelector("#sort").addEventListener("click", sortTasks);
  document.querySelector("#clearall").addEventListener("click", clearAll);
  document.querySelector("#pr").addEventListener("change", updatePr);
  document	
function clearAll() {
  for (let field of fields) {
    .querySelector("#loadfromserver")
    .addEventListener("click", loadFromServer);	
}

    document.querySelector(`#${field}`).value = "";
  }
  document.querySelector("#name").focus();
}
function sortTasks() {
  taskOperations.sort();
  printTasks();
}

function countUpdate() {
  let mark = taskOperations.countMark();
  let total = taskOperations.getTotal();
  document.querySelector("#unmarktotal").innerText = total - mark;
  document.querySelector("#marktotal").innerText = mark;

  document.querySelector("#total").innerText = total;
}
const fields = ["id", "name", "descr", "date", "url", "pr"];
function addTask() {
  // let id = document.querySelector('#id').value;
  // let name = document.querySelector('#name').value;

  const task = {};
  for (let field of fields) {
    //task.id  = 1001;
    if (field == "id") {
      task[field] = document.querySelector(`#${field}`).innerText;
      continue;
    }
    task[field] = document.querySelector(`#${field}`).value;
  }
  let len = taskOperations.add(task);
  printTask(task);
  countUpdate();

  clearAll();
  printId();
  console.log("Task Object is ", task);
}
function createIcon(className, fn, taskid) {
  let icon = document.createElement("i");
  // <i class="fas fa-edit"></i>
  // <i class="fas fa-trash-alt"></i>
  icon.className = `fas ${className} click`;
  icon.addEventListener("click", fn); // Attach Event
  icon.setAttribute("task-id", taskid);
  return icon;
}

function printTasks() {
  document.querySelector("#tasks").innerHTML = "";
  let tasks = taskOperations.getAllTasks();
  tasks.forEach(printTask);
}

function printTask(task) {
  let tbody = document.querySelector("#tasks");
  let tr = tbody.insertRow();
  let index = 0;
  for (let key in task) {
    if (key == "markForDelete") {
      continue;
    }
    tr.insertCell(index).innerText = task[key];
    index++;
  }
  let editIcon = createIcon("fa-edit me-2", edit, task.id);
  let deleteIcon = createIcon("fa-trash-alt", markForDelete, task.id);
  let td = tr.insertCell(index);
  td.appendChild(editIcon);
  td.appendChild(deleteIcon);
}


