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
        function removeTodoItems() {
            $("ol").empty();
        }
        function editTodoItem(node) {
            // console.dir(node)
            var editSpan = $("li#" + node[0].id + " span");
            $(editSpan).attr("contenteditable", true);
            $(editSpan).on('keypress', function (e) {
                if (e.which == 13)
                {
                    $(editSpan).attr("contenteditable", false);
                }
            })
        }

        // event handlers
        // TODO: Double click to EDIT
        // TODO: add item onclick or on keypress==13
        // $("button").click(function () { removeTodoItems(); }) // should remove CHECKED/COMPLETE items only
        // $("ol").on('click', $("li"), function () {
        //     $("li").toggleClass("checked")
        // })
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
                </li>`).on('dblclick', $("li > input"), function () {
                    editTodoItem($(this))
                    // $("#" + id).toggleClass("checked")
                    // .on('dblclick', function (e) {
                    // Add attribute in span[contenteditable="true"]
                    // e.stopPropagation();
                    // var currNode = $(this);
                    // var value = $(this).html();
                    // editTodoItem(id, currNode, value)
                    // });
                })
                $("ol").append(out);
            }
        })
    });
