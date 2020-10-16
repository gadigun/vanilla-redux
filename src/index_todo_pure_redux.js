import {createStore} from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
    return { type: ADD_TODO, text };
};

const deleteToDo = (id) => {
    return {type: DELETE_TODO, id};
}

const reducer = (state = [], action) => {
    switch (action.type)
    {
        case ADD_TODO:
            //return state.push(action.text);
            const newToDoObj = { text: action.text, id: Date.now() };
            return [newToDoObj, ...state];

        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== action.id);
            return cleaned;
        default:
            return state;
    }
};

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
    store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        
        const li = document.createElement("li");
        li.id = toDo.id;
        li.innerText = toDo.text;        
        ul.appendChild(li);

        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener("click", dispatchDeleteToDo);
        li.appendChild(btn);        
    });
};

store.subscribe( paintToDos );

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);