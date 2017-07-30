/**
 * Created by Administrator on 2017/4/21.
 */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
//配置这个就可以在路由函数中用request。body的方式获取到ajax的发过来的json格式数据
app.use(bodyParser.json())
//配置静态目录，目录名是static。静态目录可以完全映射到网站上。
app.use(express.static('static'))

var registerRoutes = function(app, routes){
    for (var i = 0; i < routes.length; i ++ ){
        var route = routes[i]
        console.log(route)
        //app['get'](路径，路由函数)
        app[route.method](route.path, route.func)
    }
}


const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)
 const routeAqi = require('./route/waether')
 registerRoutes(app, routeAqi.routes)
const routeTodo = require('./route/todo')
registerRoutes(app, routeTodo.routes)



var server = app.listen(8011,function () {
    var host = server.address().address
    var port = server.address().port
    console.log('运行成功！')
})
