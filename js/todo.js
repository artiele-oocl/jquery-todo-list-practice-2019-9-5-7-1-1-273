$(document)
    .ready(function () {

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
        function inputIsEmpty() {
            return $("input[name=ListItem]").val().length < 1;
        }
        function toggleInputCheck(idx) {
            // toggle: input.attr[checked] , li.toggleClass=checked
            // $("p").toggleClass("<css name>");
        }
        function addTodoItem() {
            Todoitem = { "todo": $("input[name=ListItem]").val(), "id": generateUUID() }
            todos.push(Todoitem);
        }
        function removeTodoItem(idx) {
            todos.splice(idx, 1);
        }
        function removeTodoItems() {
            todos.splice(0, todos.length);
        }
        function editTodoItems(idx, newContent) {
            todos[idx] = newContent;
            loadTodoItems();
        }
        function displayTodoItem() {
            if (todos.length > 0)
            {
                const item = todos[todos.length - 1];
                let out = '';
                out +=
                    `
                    <li id=${item.id} class="">
                    <input name="done-todo" type="checkbox" class="done-todo"> ${item.todo} </li>
                    `;
                $("ol").append(out);
            }
        }


        // event handlers
        let todos = [];
        $("#button").click(() => {
            inputIsEmpty() ? alert("You cannot add empty todo item on your list.") : addTodoItem();
            displayTodoItem();
        })

        $("li > input[type=checkbox]").change(() => console.log("toggleInputCheck()"));
    });
