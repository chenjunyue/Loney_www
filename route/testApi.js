/**
 * Created by Administrator on 2017/4/23.
 */

const testApi = require('../model/testapi')

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
        testApi.done()
    }
}


var routes = [
    index,
]

module.exports.routes = routes
