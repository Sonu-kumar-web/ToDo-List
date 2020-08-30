// Select the elements
const list = document.getElementById("list");
const detailsBottom = document.getElementById("details-bottom-id");
const input = document.getElementById("input-box");
const complete = document.getElementById("complete-task");
const incomplete = document.getElementById("incomplete-task");
const all = document.getElementById("all-task");
const completeTaskTop = document.getElementById("complete-task-top");
const clearComplete = document.getElementById("clear-complete");

let LIST = [];
let id = 0;
const CHECK = "tick";
const UN_CHECK = "unTick";
const LINE_THROUGH = "lineThrough";
var num = 0;

document.addEventListener("keyup", function (event) {
   if (event.keyCode == 13) {
      const toDo = input.value;

      if (toDo) {
         addToDo(toDo, id, false, false);

         LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false,
         });

         id++;
      }

      input.value = "";
   }
});

function addToDo(toDo, id, done, trash) {
   if (trash) {
      return;
   }

   const DONE = done ? CHECK : UN_CHECK;
   const LINE = done ? LINE_THROUGH : "";

   const item = `<li class="item">
                    <img class="${DONE}" job="complete" id="${id}" alt="">
                    <p class="text ${LINE}">${toDo}</p>
                    <img class="trash" src="assets/bin.svg" job="delete" id="${id}" alt="">
                  </li>
                `;

   const position = "beforeend";

   list.insertAdjacentHTML(position, item);
   if (!done) {
      num = num + 1;
   }
   taskLeft();
}

list.addEventListener("click", function (event) {
   const element = event.target;

   const elementJob = element.attributes.job.value;

   if (elementJob == "complete") {
      completeToDo(element);
   } else if (elementJob == "delete") {
      removeToDo(element);
   }
});

function completeToDo(element) {
   element.classList.toggle(CHECK);
   element.classList.toggle(UN_CHECK);
   element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

   LIST[element.id].done = LIST[element.id].done ? false : true;
   if (LIST[element.id].done) {
      num = num - 1;
   } else {
      num = num + 1;
   }
   taskLeft();
}

// remove to do
function removeToDo(element) {
   element.parentNode.parentNode.removeChild(element.parentNode);

   LIST[element.id].trash = true;
   num = num - 1;
   taskLeft();
}

// Complete task
complete.addEventListener("click", function (event) {
   while (list.firstChild) {
      list.removeChild(list.firstChild);
   }

   LIST.forEach(function (item) {
      toDoDone(item.name, item.id, item.done, item.trash);
   });
});

function toDoDone(toDo, id, done, trash) {
   if (trash) {
      return;
   }

   if (done) {
      const item = `<li class="item">
                    <img class="${CHECK}" job="complete" id="${id}" alt="">
                    <p class="text ${LINE_THROUGH}">${toDo}</p>
                    <img class="trash" src="assets/bin.svg" job="delete" id="${id}" alt="">
                  </li>
                `;
      const position = "beforeend";
      list.insertAdjacentHTML(position, item);
   }
}

// Incomplete Task
incomplete.addEventListener("click", function (event) {
   while (list.firstChild) {
      list.removeChild(list.firstChild);
   }

   LIST.forEach(function (item) {
      addToDoLeft(item.name, item.id, item.done, item.trash);
   });
});

function addToDoLeft(toDo, id, done, trash) {
   if (trash) {
      return;
   }

   if (!done) {
      const item = `<li class="item">
                    <img class="${UN_CHECK}" job="complete" id="${id}" alt="">
                    <p class="text">${toDo}</p>
                    <img class="trash" src="assets/bin.svg" job="delete" id="${id}" alt="">
                  </li>
                `;
      const position = "beforeend";
      list.insertAdjacentHTML(position, item);
   }
}

function taskLeft() {
   var elem = document.getElementById("task-left");
   if (elem) {
      elem.parentNode.removeChild(elem);
   }
   const taskLeft1 = `<p id="task-left">Task Left ${num}</p>`;
   const position = "beforeend";
   detailsBottom.insertAdjacentHTML(position, taskLeft1);
}

all.addEventListener("click", function (event) {
   while (list.firstChild) {
      list.removeChild(list.firstChild);
   }
   num = 0;
   LIST.forEach(function (item) {
      addToDo(item.name, item.id, item.done, item.trash);
   });
});

completeTaskTop.addEventListener("click", function (event) {
   while (list.firstChild) {
      list.removeChild(list.firstChild);
   }

   LIST.forEach(function (item) {
      item.done = true;
   });
   num = 0;
   taskLeft();
});

clearComplete.addEventListener("click", function (event) {
   while (list.firstChild) {
      list.removeChild(list.firstChild);
   }
   for (i = LIST.length - 1; i >= 0; i -= 1) {
      if (LIST[i].done) {
         LIST.splice(i, 1);
      }
   }
   num = 0;
   LIST.forEach(function (item, index) {
      item.id = index;

      if (!item.done) {
         addToDo(item.name, item.id, item.done, item.trash);
      }
   });
});
