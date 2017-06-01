/**
 * Created by Administrator on 2017/4/23.
 */

var sendHtml = function(path, response){
    var fs = require("fs")
    path = 'template/' + path
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function(err, data ) {
        if (err) {
            console.log(err)
        } else {
            // console.log('读取的文件是:', data)
            response.send(data)
        }
    })
}


var index  = {
    path: '/',
    method: 'get',
    func : function (request, response) {
        var path = 'waether_index.html'
        sendHtml(path, response)
    }
}

var waether = {
    path: '/waether/',
    method: 'get',
    func : function (request, response) {
        var path = 'waether.html'
        sendHtml(path, response)
    }
}

var todo = {
    path: '/todo/',
    method: 'get',
    func : function (request, response) {
        var path = 'index_todo.html'
        sendHtml(path, response)
    }
}
var routes = [
    index,
    waether,
    todo,
]

module.exports.routes = routes

