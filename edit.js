let createButton = document.querySelector(".container > button");
let input = document.getElementById("Title");
let myTask = document.querySelector(".MYTASK");
let Description = document.getElementById("description");
let todo = input.value;
let todoStorage = [];

window.onload = function () {
  input.focus();
};

let createTodo = function (mk, promt, chidren) {
  if (input.value !== "") {
    let list = document.createElement(mk);
    if (promt) Object.assign(list, promt);
    if (chidren) list.append(...chidren);
    return list;
  }
};

let createMainTodo = function () {
  if (input.value === "") {
    Object.assign(input, { placeholder: "Pls Input A Valid Title" });
    this.previousElementSibling.previousElementSibling.classList.toggle(
      "caution"
    );
  } else {
    myTask.append(
      createTodo("div", { className: "todocontainer" }, [
        createTodo("span", {}, [
          createTodo("div", { className: "todoholder" }, [
            createTodo("input", { type: "checkbox", onclick: complete }),
            createTodo("p", { className: "title" }, [input.value.trim()]),
          ]),
          createTodo("div", { className: "buttonHolder" }, [
            createTodo("button", {
              onclick: editTodo,
              className: "editButton",
            }),
            createTodo("button", {
              onclick: deleteTodo,
              className: "deletetodo",
            }),
          ]),
        ]),
        createTodo("hr"),
        createTodo("p", { className: "Description" }, [
          Description.value.trim(),
        ]),
      ])
    );

    input.value = "";
    Description.value = "";
    Object.assign(input, { placeholder: "Title" });
    input.className = "Title";
    myTask.lastChild.focus()
  }
};

let deleteTodo = function () {
  this.parentElement.parentElement.parentElement.remove();
};

let editTodo = function () {
  let oldTodoEle = this.parentElement.previousElementSibling.lastChild;
  this.className = "Hidden";
  let checkbox = oldTodoEle.previousElementSibling;
  checkbox.className = "Hidden";
  let oldTodo = oldTodoEle.textContent;

  oldTodoEle.outerHTML =
    "<input type='text' placeholder=' New Title' class ='editing' >";
  this.parentElement.previousElementSibling.lastChild.value = oldTodo;
  let newTodoEle = this.parentElement.previousElementSibling.lastChild;
  newTodoEle.focus();

  newTodoEle.addEventListener("keydown", (e) => {
    if (newTodoEle.value == "") {
      newTodoEle.placeholder = "Pls Input A Valid Title";
      newTodoEle.classList.toggle("caution");
    } else {
      if (e.key === "Enter") {
        let newTitle = newTodoEle.value;
        newTodoEle.outerHTML = `<p class ='title'> ${newTitle}</p>`;

        let oldDes = this.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent
        this.parentElement.parentElement.nextElementSibling.nextElementSibling.outerHTML =
          "<input type='text' placeholder=' New Description' class ='editing' >";
        let newDesEle =
          this.parentElement.parentElement.nextElementSibling
            .nextElementSibling;
        newDesEle.focus();
        newDesEle.value = oldDes;

        newDesEle.addEventListener("keydown", (e) => {
          let newDescription = newDesEle.value;
          if (e.key === "Enter") {
            newDesEle.outerHTML = `<p class ='Description'> ${newDescription}</p>`;
            this.className = "editButton";
            checkbox.className = "";
          }
        });
      }
    }
  });
};

let complete = function () {
  this.nextElementSibling.classList.toggle("completed");
  this.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.toggle(
    "completed"
  );
  this.parentElement.nextElementSibling.firstChild.classList.toggle(
    "Hidden"
  );
};

createButton.onclick = createMainTodo;

input.addEventListener("keydown", (e) => {
  if (input.value === "") {
    Object.assign(input, { placeholder: "Pls Input A Valid Title" });
    input.classList.toggle("caution");
  } else {
    if (e.key === "Enter") {
      e.target.nextElementSibling.focus();
    }
  }
});
Description.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (input.value == "") {
      input.focus();
    } else {
      createMainTodo();
    }
    input.focus();
  }
});
