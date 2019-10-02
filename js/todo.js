$(document)
    .ready(function () {

        /* To generate IDs for each list item */
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
        /* users cannot add empty todoItem into list */
        function inputIsEmpty() {
            return $("input[name=ListItem]").val().length < 1;
        }
        /* users can edit todoItem and save onblur and onkeypress Enter */
        function editTodoItem(node) {
            var editSpan = $("li#" + node[0].id + " span");
            $(editSpan).attr("contenteditable", true);
            $(editSpan).on('keypress', function (e) {
                if (e.which == 13)
                {
                    $(editSpan).attr("contenteditable", false);
                    for (var i in todoList) {
                        if (todoList[i].id == node[0].id) {
                            todoList[i].text = $(editSpan).text();
                           break; //Stop this loop, we found it!
                        }
                    }
                }
            })
            $(editSpan).on('blur', function (e) {
                $(editSpan).attr("contenteditable", false);
                for (var i in todoList) {
                    if (todoList[i].id == node[0].id) {
                        todoList[i].text = $(editSpan).text();
                        break; //Stop this loop, we found it!
                    }
                }
            })
        }
        /* toggle input attribute checked */
        function toggleChecked(node, id) {
            var toggleChecked = $("li#" + node[0].id);
            $(toggleChecked).toggleClass("checked")
            for (var i in todoList) {
                if (todoList[i].id == id) {
                    todoList[i].isComplete = !todoList[i].isComplete;
                   break; //Stop this loop, we found it!
                }
            }
        }
        /* callback function to filter in active todoItems  */
        function filterByActive(arr) {
            return !arr.isComplete;
        }
        /* callback function to filter in complete todoItems  */
        function filterByComplete(arr) {
            return arr.isComplete;
        }
        /* utility function to render todoList on DOM */
        function renderTodoItems(todos) {
            $("ol").empty();
            todos.forEach(todo => {
                // console.log(todo);
                var checked = todo.isComplete ? 'checked' : '';
                var out = $(`
                <li id=${todo.id} class="${checked}">
                    <input name="done-todo" type="checkbox" class="done-todo" ${checked}> <span>${todo.text}</span> </input>
                </li>`)
                    .on('change', $("#" + todo.id), function () {
                        toggleChecked($(this))
                        
                        for (var i in todoList) {
                            if (todoList[i].id == todo.id) {
                                todoList[i].text = todo.text;
                                todoList[i].isComplete = !todoList[i].isComplete;
                               break; //Stop this loop, we found it!
                            }
                        }

                    })
                    .on('dblclick', $("li > input"), function () {
                        editTodoItem($(this))
                    })
                $("ol").append(out);
            });
        }
        /* function to render all todo items */
        function renderAllTodoItems() {
            renderTodoItems(todoList)
        }
        /* function to render all active todo items on DOM */
        function renderActiveTodoItems(activeTodoItems) {
            renderTodoItems(activeTodoItems);
        }
        /* function to render all complete todo items on DOM */
        function renderCompleteTodoItems(completeTodoItems) {
            renderTodoItems(completeTodoItems);
        }
        /* utility function to add item in list, and render added todoItems on DOM */
        function addTodoItemOnClick() {
            var text = $("input[name=ListItem]").val();
            var id = generateUUID();
            todoList.push({
                id,
                text,
                isComplete: false
            })
            
            var out = $(`
            <li id=${id} class="">
                <input name="done-todo" type="checkbox" class="done-todo"> <span>${text}</span> </input>
            </li>`)
                .on('change', $("#" + id), function () {
                    toggleChecked($(this), id)
                })
                .on('dblclick', $("li > input"), function () {
                    editTodoItem($(this))
                })
            $("ol").append(out);
        }

        /**
         * Event handler for adding todoItem
         */
        var todoList = [];
        $("#button").on('click', function () {
            inputIsEmpty() ? alert("You cannot add empty item in your list.") : addTodoItemOnClick();
        });
        $("input[name=ListItem]").on('keypress', function (e) {
            if(e.which == 13) {
                inputIsEmpty() ? alert("You cannot add empty item in your list.") : addTodoItemOnClick();
            }
        })

        /**
         * Event handler for filters
         */
        $('a[data-filter="all"]').on('click', function (e) {
            e.preventDefault();
            $('#filters li a').removeClass("selected");
            $(this).addClass("selected");
            renderAllTodoItems();
        })
        $('a[data-filter="active"]').on('click', function (e) {
            e.preventDefault();
            $('#filters li a').removeClass("selected");
            $(this).addClass("selected");
            var filtered = todoList.filter((filterByActive));
            renderActiveTodoItems(filtered);
        })
        $('a[data-filter="complete"]').on('click', function (e) {
            e.preventDefault();
            $('#filters li a').removeClass("selected");
            $(this).addClass("selected");
            var filtered = todoList.filter((filterByComplete));
            renderCompleteTodoItems(filtered);
        })
    });
