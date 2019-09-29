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
        function editTodoItem(node) {
            var editSpan = $("li#" + node[0].id + " span");
            $(editSpan).attr("contenteditable", true);
            $(editSpan).on('keypress', function (e) {
                if (e.which == 13)
                {
                    $(editSpan).attr("contenteditable", false);
                }
            })
        }
        function toggleChecked(node) {
            var toggleChecked = $("li#" + node[0].id);
            $(toggleChecked).toggleClass("checked")
        }

        // event handlers
        // $("button").click(function () { removeTodoItems(); }) // should remove CHECKED/COMPLETE items only
        // TODO:
        // 1. Able to Filter
        // 2. Able to Delete Complete todoItems
        $("#button").on('click', function () {
            if (inputIsEmpty())
            {
                alert("You cannot add empty item in your list.");
            } else
            {
                var text = $("input[name=ListItem]").val();
                var id = generateUUID();
                var out = $(`
                <li id=${id} class="">
                    <input name="done-todo" type="checkbox" class="done-todo"> <span>${text}</span> </input>
                </li>`)
                    .on('change', $("#" + id), function () {
                        toggleChecked($(this))
                    })
                    .on('dblclick', $("li > input"), function () {
                        editTodoItem($(this))
                    })
                $("ol").append(out);
            }
        })
    });
