const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

// 삭제 함수
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    }); 
    toDos = cleanToDos;
    saveToDos();
}

// localStorage에 저장
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 화면에 출력, 배열에 삽입
function paintToDo(text){
    const li = document.createElement("li");
    const delbtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delbtn.innerText = "X";
    delbtn.className = "toDo_button";
    delbtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(delbtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const loadedToDos = { 
        text: text,
        id: newId
    };
    toDos.push(loadedToDos);
    saveToDos();
}

// submit 이벤트 핸들러
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

// list load 함수
function loadToDos(){
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){
       const parsedToDos = JSON.parse(toDos);
       parsedToDos.forEach(function(toDo){
           paintToDo(toDo.text);
       });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();