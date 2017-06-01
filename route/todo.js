/**
 * Created by Administrator on 2017/5/31.
 */
//路由函数。控制各种路由的。
//引入函数
const log = console.log.bind(console)
const todo = require('../model/todo')
//获取所有todo地址

let all = {
    path: '/all',
    method: 'get',
    func: function (request,response) {
        //获取所有todo的all函数
        let todos = todo.all()
        // log('返回的数据',todos)
        let r = JSON.stringify(todos)
        response.send(r)
    }
}
//创建一个新的todo
let add ={
    path: '/add',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form
        let form = request.body
        // log('创建返回的数据', typeof form)
        // 函数add用来创建新的todo ,并返回是否创建成功的数据。
        let b = todo.add(form)
        let r = JSON.stringify(b)
        response.send(r)
    }
}
// 修改一个todo
let edit = {
    path: '/edit',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form
        let form = request.body
        // 函数edit用来编辑todo ,并返回是否编辑成功的数据。
        let b = todo.edit(form)
        let r = JSON.stringify(b)
        response.send(r)
    }
}
//完成一个todo。
let done = {
    path: '/done',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form
        let form = request.body
        // 函数done用来编辑todo ,并返回是否成功的数据。
        let t = todo.done(form)
        // log(form,t)
        let r = JSON.stringify(t)
        response.send(r)
    }
}
//删除一个todo
let del = {
    path: '/del',
    method: 'post',
    func: function (request,response) {
        //获取浏览器发送过来的表单数据。form

        let form = request.body

        // 函数del用来删除todo ,并返回是否成功的数据。
        let seccess = todo.del(form.id)
        let result = {
            //这个是解包，等同与 seccess: seccess
            seccess,
        }
        let r = JSON.stringify(result)
        response.send(r)
    }
}

let routes = [
    all,
    add,
    edit,
    done,
    del
]

module.exports.routes = routes
