"use strict";


const makeId = (value = 0) => () => ++value;

const form = document.querySelector(".main-form");
const showButton = document.querySelector("#showButton");
const ul = document.querySelector("#root");
const userValues = [];
const getNextId = makeId();

form.addEventListener("submit", submitHandler);

showButton.addEventListener("click", showButtonHandler);


function submitHandler(event){
  event.preventDefault();
  const {
    target,
    target: {
      elements: {userInput}
    }
  } = event;
  const tempValue = userInput.value.trim();
  if(tempValue){
    userValues.push({
      id: getNextId(),
      value: tempValue
    });
  }
  target.reset();
}

function showButtonHandler(){
  fillList(userValues);
  changeBorder();
}


const deleteButtonHandler = (id) => () => removeItem(id);

function createListItem(id, value){
  const div = createElement("div", {classNames: ["userText"]}, document.createTextNode(value));
  const button = createElement("button", {
    classNames: ["deleteButton"],
    handlers:{
      click : deleteButtonHandler(id)
    }
  });
  button.innerText = "delete";
  const wrapper = createElement("div", {classNames: ["flexContainer"]}, div, button);
  const li = createElement("li", {classNames: ["listItem"]}, wrapper);
  li.dataset.id = id;
  return li;
}

function createElement(tagName, {classNames = [], handlers = {}}, ...children){
  const element = document.createElement(tagName);
  element.classList.add(...classNames);
  for(const [eventType, eventHandler] of Object.entries(handlers)){
    element.addEventListener(eventType, eventHandler);
  }
  element.append(...children);
  return element;
}


function removeItem(id){
  const items = [...document.querySelectorAll("#root > li")];
  const findItem = items.find((item) => +item.dataset.id === id);
  let index = findIndex(id);
  if(findItem && index >= 0){
    ul.removeChild(findItem);
    userValues.splice(index, 1);
  }else{
    throw new Error("");
  }
  changeBorder(); 
}

function fillList(data){
  const listItems = [...document.querySelectorAll("#root > li")];
  for(const item of data){
    const {id, value} = item;
    if(!hasId(listItems, id))
    {
      const li = createListItem(id, value);
      ul.append(li);
    }
  }
}


function changeBorder(){
  if(userValues.length){
    ul.classList.add("rootBorder");
  }else{
    ul.classList.remove("rootBorder");
  }
}

function findIndex(id){
  
  for(let i = 0; i < userValues.length; i++){
    if(userValues[i].id === id){
      return i;
    }
  }
}

function hasId(collection, id){
  for(const item of collection){
    if(+item.dataset.id === id){
      return true;
    }
  }
  return false;
}


