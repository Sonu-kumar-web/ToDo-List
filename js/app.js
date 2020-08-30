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

/*list is the id of the ul we have fetched in begning*/
list.addEventListener("click", function (event) {
   /*event.target will fetch the datails of the image tag weather it is image tag of tick,untick or trash and it will have the html of that*/
   const element = event.target;

   /*It will give the job of the img tag we have written in item based on which we select i.e. complete or delete*/
   const elementJob = element.attributes.job.value;
   //console.log('element.attributes.job.value==', element.attributes.job.value);

   /*If the click is on img tag of job=complete then this logic will get executed*/
   if (elementJob == "complete") {
      /*On clicking on that we will execute this completeToDo function by passing the relevent html i.e. img tag*/
      completeToDo(element);

      /*If the click is on img tag of job=delete then this logic will get executed*/
   } else if (elementJob == "delete") {
      /*On clicking on that we will execute this removeToDo function by passing the relevent html i.e. img tag*/
      removeToDo(element);
   }
});

// complete to do
function completeToDo(element) {
   /*element.classList.toggle(CHECK); =>If tick class (CHECK) is not present in that img tag we get from elememt then it will add the tick class 
    and if present it will remove the tick class from the img tag*/
   element.classList.toggle(CHECK);

   /*element.classList.toggle(UNCHECK); =>If untick class (UNCHECK) is not present in that img tag we get from elememt then it will add the untick class 
    and if present it will remove the untick class from the img tag*/
   element.classList.toggle(UN_CHECK);

   /*Since we have to add the cross line to the text (p tag) and not add any class to img tag we are getting from the element we will
    go to parent of img tag and then select the p tag using class name by quary selector and then select the p tag and add class lineThrough to that*/
   /*On selecting first time it will add the class lineThrough to the p tag and on second time it will remove the class from there*/
   element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
   //console.log(element.parentNode.querySelector(".text"));

   /* If the done attribut is false we will set it to true when we enter in this if statement and if true then set it as false.
     So that we can use it to display the uncomplete task and complete task on clicking*/
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
   //console.log(element.parentNode.parentNode);

   /*We will first fo to the parent node of img tag i.e. li and then go to the ul and remove that li by doing removeChild(element.parentNode)*/
   element.parentNode.parentNode.removeChild(element.parentNode);

   /*We will set trash as true after deleting that*/
   LIST[element.id].trash = true;
   num = num - 1;
   taskLeft();
}

/*------------------------------------------ complete task box-----------------------------------------------------------------*/
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
      //const DONE = done ? CHECK : UNCHECK;
      //const LINE = done ? LINE_THROUGH : "";
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
/*-------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------ incomplete task box-----------------------------------------------------------------*/
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
      //const DONE = done ? CHECK : UNCHECK;
      //const LINE = done ? LINE_THROUGH : "";
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
/*-------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------Task Left------------------------------------------------------------*/
function taskLeft() {
   var elem = document.getElementById("task-left");
   if (elem) {
      elem.parentNode.removeChild(elem);
   }
   const taskLeft1 = `<p id="task-left">Task Left ${num}</p>`;
   const position = "beforeend";
   detailsBottom.insertAdjacentHTML(position, taskLeft1);
}

/*---------------------------------All Task---------------------------------------------------------------------------*/
all.addEventListener("click", function (event) {
   while (list.firstChild) {
      list.removeChild(list.firstChild);
   }
   num = 0;
   LIST.forEach(function (item) {
      addToDo(item.name, item.id, item.done, item.trash);
   });
});
/*-------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------Complete Task All--------------------------------------------- */
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

/*-----------------------------------------------------------------CLEAR COMPLETE-------------------------------------------- */
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
