document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code that interacts with the form element
    const form = document.querySelector("[data-form]");
    const list = document.querySelector("[data-list]");
    const input = document.querySelector("[data-input]");
  
    //local storage

    class Storage {
        static addToStorage(todoArr) {
          try {
            localStorage.setItem("todo", JSON.stringify(todoArr));
          } catch (error) {
            // Handle errors here (e.g., storage quota exceeded)
            console.error("Error storing data in localStorage:", error);
          }
        }
      
        static getStorage() {
          let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
          return storage;
        }
      }
//array

let todoArr = Storage.getStorage();

//form part

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    console.log(id);
    const todo = new Todo(id, input.value);
    todoArr= [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    //remove from DOM
    UI.removeTodo();
    //add to storage
    Storage.addToStorage(todoArr);
});

// create objects

class Todo {
    constructor (id, todo) {
        this.id = id;
        this.todo = todo;
    }
}

//display todo in DOM

class UI{
    static displayData(){
        let displayData = todoArr.map((item) => `
        <div class="todo">
           <p>${item.todo}</p>
           <span class="remove" data-id = ${item.id}><i class="fas fa-trash"></i></span>
        </div>
        `);

        list.innerHTML = (displayData).join(" ");
    }
    static clearInput(){
        input.value = "";
    }
    static removeTodo(){
        list.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            //remove from array
            UI.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id );
        Storage.addToStorage(todoArr);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
  });

});