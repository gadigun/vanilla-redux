import {createStore} from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  switch (action.type)
  {
    case ADD:
      return count + 1;
    case MINUS:
      return count -1;
    default:
      return count;
  }

  // 리턴되는 값이 현재 상태로 저장 되기 때문에 위의 식이 성립 된다.
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
}
const handleAdd = () => {
  countStore.dispatch({type: ADD});
}
const handleMinus = () => {
  countStore.dispatch({type: MINUS});
}

number.innerText = countStore.getState();
countStore.subscribe(onChange);
add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);