/**
 * Created by Administrator on 2017/5/31.
 */
//路由函数。控制各种路由的。
//引入函数
const log = console.log.bind(console)
const todo = require('../model/todo')
//获取所有todo地址

var all = {
    path: '/todo/all',
    method: 'get',
    func: function (request,response) {
        //获取所有todo的all函数
        var todos = todo.all()
        // console.log(todos,"被调用了。")
        // log('返回的数据',todos)
        var r = JSON.stringify(todos)
        response.send(r)
    }
}
//创建一个新的todo
var add ={
    path: '/todo/add',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form
        var form = request.body
        // log('创建返回的数据', typeof form)
        // 函数add用来创建新的todo ,并返回是否创建成功的数据。
        var b = todo.add(form)
        var r = JSON.stringify(b)
        response.send(r)
    }
}
// 修改一个todo
var edit = {
    path: '/todo/edit',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form
        var form = request.body
        // 函数edit用来编辑todo ,并返回是否编辑成功的数据。
        var b = todo.edit(form)
        var r = JSON.stringify(b)
        response.send(r)
    }
}
//完成一个todo。
var done = {
    path: '/todo/done',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form
        var form = request.body
        // 函数done用来编辑todo ,并返回是否成功的数据。
        var t = todo.done(form)
        // log(form,t)
        var r = JSON.stringify(t)
        response.send(r)
    }
}
//删除一个todo
var del = {
    path: '/todo/del',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form

        var form = request.body

        // 函数del用来删除todo ,并返回是否成功的数据。
        var seccess = todo.del(form.id)
        var result = {
            //这个是解包，等同与 seccess: seccess
            seccess,
        }
        var r = JSON.stringify(result)
        response.send(r)
    }
}

var routes = [
    all,
    add,
    edit,
    done,
    del
]

module.exports.routes = routes
