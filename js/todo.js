$(document)
    .ready(function () {

        let todos = [];
        function loadTodoItems() {
            if (todos.length > 0) displayTodoItems();
        }
        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++)
            {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20)
                {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }
        function addTodoItem() {
            todos.push($("input[name=ListItem]").val());
        }
        function removeTodoItem(idx) {
            todos.splice(idx, 1);
        }
        function removeTodoItems() {
            todos.splice(0, todos.length);
        }
        function editTodoItems(idx, newContent) {
            todos[idx] = newContent;
        }
        function inputIsEmpty() {
            return $("input[name=ListItem]").val().length < 1;
        }
        function displayTodoItems() {
            // <li id="c57aab79-7dfa-4d85-8ede-aa653a8b5d93" class="">
            // <input name="done-todo" type="checkbox" class="done-todo"> Parking Lot APP Refactor </li>
            // list items
        }


        // code to be implemented
        loadTodoItems();
        $("#button").click(() => {
            inputIsEmpty() ? alert("You cannot add empty todo item on your list.") : addTodoItem();
            console.log(todos);
        })
    });
