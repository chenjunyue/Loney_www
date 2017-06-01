/**
 * Created by Administrator on 2017/5/9.
 */
var aqi = require('../model/waether.js')

var waether = {
    path: '/waether/all',
    method: 'get',
    func : function (request, response) {

        var aqis = aqi.data
        var data = JSON.stringify(aqis)
        response.send(data)
    }
}

var routes = [
    waether
]


module.exports.routes = routes