/**
 * Created by Administrator on 2017/5/31.
 */
//控制函数。用来操作todo程序的。
let fs = require('fs')
const log = console.log.bind(console);

//todo数据地址
let todoFilePath = 'db/todoData.json'
//用来储存todo数据的对象。
const ModelBlog = function (form) {
    this.content = form.content || ''
    this.state = form.state || false
    var t = new Date()
    this.add_time = t.toLocaleString().slice(5, 14)
    // this.add_time = Math.floor(new Date()/1000)
    this.edit_time = form.edit_time || ''
    this.done_time = form.done_time || ''
}
//读取加载todo的数据文件。
const loadTodos = function () {
    var content = fs.readFileSync(todoFilePath, 'utf8')
    var todos = JSON.parse(content)
    // console.log('blogs', blogs)
    return todos
    //已下异步回调的方法，是输出的结果是undefined
    // fs.readFile(todoFilePath,'utf-8',(err,data) => {
    //     if (err){
    //         log(err)
    //     }else {
    //
    //         var da = JSON.parse(data)
    //         return da
    //     }
    // })
    //这边省掉了数据内容的检查
    // let todos = JSON.parse(content)
    // return todos

}

let a = {
    data: loadTodos()
}
//获取所有的todo
a.all = function () {
    let todos = this.data
    // log('model里面的all',todos,this.data)
    return todos
}
//创建新的todo
a.add = function (form) {
    let t =new ModelBlog(form)
    let d = this.data[this.data.length - 1]
    if (d == undefined){
        t.id = 1
    }else {
        t.id = d.id + 1
    }
    this.data.push(t)
    this.seve()
    //返回新创建的数据
    return t
}
a.edit = function (form) {
    let d = form.id
    let todos = this.data
    for (let i = 0; i < todos.length; i++) {
        let id = todos[i].id
        if (d === id){
            todos[i].content = form.content

            todos[i].edit_time =  Math.floor(new Date() / 1000)
            this.seve()
            return todos[i]
        }
    }
}
//来保存完成状态的修改。
a.done = function (form) {
    let todos = this.data
    let d = form.id
    for(let i = 0; i < todos.length; i ++) {
        let id = todos[i].id
        if(d === id) {
            todos[i].state = form.state
            var t = new Date()
            todos[i].done_time = t.toLocaleString().slice(5, 14)
            return todos[i]
        }
    }
    let b =  false
    return b

}
a.del = function (id) {
    var id = Number(id)
    let todos = this.data
    for(let i = 0; i < todos.length; i ++) {
        let d = todos[i].id
        if(id === d) {
            todos.splice(i, 1)
            this.seve()
            return true
        }
    }
        return false
}
a.seve = function () {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(todoFilePath, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('保存成功')
        }
    })
}


module.exports = a
