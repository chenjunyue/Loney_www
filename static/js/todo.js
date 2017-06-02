/*
1.刷新页面的时候载入todo.
1.1判断数据，载入完成，和非完成的列表里面。
2.绑定按键，
2.1绑定ADD按键。
2.2绑定删除按键，和完成按键。
2.3绑定事件列表和完成时间列表、
3.功能完成，检查本地存储是否有数据，
3.1添加todo的功能。
3.2完成进入完成列表的功能。
3.3删除的功能。
*/
var log = console.log.bind(console);
var ajax = request => {
    /*
    request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}


var todoTemp = todo => {
    var id = todo.id || ''
    var content = todo.content
    var state = ''
    if (todo.state) {
        state = 'checked'
    }
    var add_time = todo.add_time
    var done_time = todo.done_time || ''
    var t = `
        <div class="do_todo_con" data-todoid = ${id}>
        <br>
            <div class="checkbox">
                 <label class="todo_don">
                   <input type="checkbox" class="don_typ" value="" ${state} >
                   ${content}
                 </label>
                 <span class="add_time">${add_time}</span>
               </div>
               <span class="done_time">${done_time}</span>
            <button type="button" class="todo_del btn btn-warning btn-sm " style="float:right;">删除</button>
        </div>
    `
    return t
}

var loadTodo = todos => {
    var html =''
    var htmlDo = ''
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.state) {
            htmlDo += todoTemp(todo)
        }else {
            html += todoTemp(todo)
        }
    }
    $('.todolist').append(html)
    $('.donelist').append(htmlDo)
}

var addTodo = function() {
    $('#todo_ad').on('click',(event) => {
        var cont = $('#todo-input').val()
        //获取当前的时间。
        var t = new Date()
        var time = t.toLocaleString().slice(5, 14)
        //获取数据后发送给服务器，
        var todo = {
            'content': cont,
            'add_time': time,
        }


        // 发送数据
        var data = JSON.stringify(todo)
        // log('发送的数据',typeof  data ,data ,todo)
        var request = {
            url: '/todo/add',
            method: 'POST',
            contentType: 'application/json',
            data: data,
            callback: response => {
                var todo = JSON.parse(response)
                var d = todoTemp(todo)
                $('.todolist').append(d)
                localSeve()
            }
        }
        ajax(request)

    })
}

var deltodo = function() {
    $('#todo_content').on('click','.todo_del',(event) => {
        var par = $(event.target).parent()
        var id = par.data('todoid')
        // log(id)
        var todo = {
            id: id
        }
        //ajax 发送数据。
        // 发送数据
        var data = JSON.stringify(todo);
        var request = {
            url: '/del',
            method: 'POST',
            contentType: 'application/json',
            data: data,
            callback: response => {
                var todo = JSON.parse(response)
                // log(todo);
            }
        }
        ajax(request)
        par.remove()
        localSeve()
    })
}

var getTodo = function(id) {
    var todos = $('.do_todo_con')
    for (var i = 0; i < todos.length; i++) {
        var d = todos[i].dataset.todoid
        if (id == d) {
            var content = todos[i].querySelector('label').innerText
            var add_time = todos[i].querySelector('.add_time').innerText
            var todo = {
                id: d,
                content: content,
                add_time: add_time,
            }
            return todo
        }
    }
}

var dontodo = function() {
    $('#todo_content').on('click','input',(event) => {
        var sefl = $(event.target).parent().find('input')
        var con = $(event.target).closest('.do_todo_con')
        var id = con.data('todoid')
        var tup = sefl.prop('checked')
        if (tup) {
            var todo = getTodo(id)
            todo.state = true
            var t = new Date()
            todo.done_time = t.toLocaleString().slice(5, 14)
            var html = todoTemp(todo)
            $('.donelist').append(html)
            $('.do_todo_con').addClass('.done-typ')
            con.remove()
            localSeve()
        }else {
            var todo = getTodo(id)
            var html = todoTemp(todo)
            $('.todolist').append(html)
            $('.do_todo_con').removeClass('.done-typ')
            con.remove()
            localSeve()
        }
        // 发送数据
        var todo = getTodo(id)
        todo.state = tup
        var data = JSON.stringify(todo)
        var request = {
            url: '/don',
            method: 'POST',
            contentType: 'application/json',
            data: data,
            callback: response => {
                var todo = JSON.parse(response)
                // log(todo);
            }
        }
        ajax(request)
    })
}

var getTodoAll = function() {
    var arr = []
    var todos = $('.do_todo_con')
    for (var i = 0; i < todos.length; i++) {
        var id = todos[i].dataset.todoid
        var content = todos[i].querySelector('label').innerText
        var add_time = todos[i].querySelector('.add_time').innerText
        var done_time = todos[i].querySelector('.done_time').innerText
        var state = todos[i].querySelector('input').checked
        var todo = {
            id: id,
            content: content,
            add_time: add_time,
            done_time: done_time,
            state: state,
        }
        arr.push(todo)
    }
    return arr
}

var bindDoneList = function() {
    $('#done_button').on('click', () => {
        $('.donelist').toggle('.todo-none')
    })
}

var localSeve = function() {
    var t = getTodoAll()
    var data = JSON.stringify(t)
    localStorage.todo = data
}

var loadTodoAll = function() {
    var t = localStorage.todo
    if (t == undefined) {
        var request = {
            url: '/all',
            method: 'GET',
            contentType: 'application/json',
            callback: response => {
                var todos = JSON.parse(response)
                loadTodo(todos)
                localSeve()
            }
        }
        ajax(request)
    }else {
        var t = localStorage.todo
        var todos = JSON.parse(t)
        loadTodo(todos)
    }

}

var _main = function(){
    //新建todo
    addTodo()
    //删除todo
    deltodo()
    //完成todo
    dontodo()
    //完成列表缩收
    bindDoneList()
    //加载todo
    loadTodoAll()
}

_main()
