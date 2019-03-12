/**
 * Created by Administrator on 2017/5/11.
 */


const fs = require("fs")
const request_sync = require('sync-request')
const log = console.log.bind()
const request = require('request');
const jar = request.jar()
const cookies = require("./cookies");
const superagent = require('superagent');  
const underscore = require('underscore');  

 

var toseve =function (path,data) {


    if (typeof data !== 'string'){
        var da = JSON.stringify(data, null, 2)
    }else {
        var da = data
    }
    fs.writeFile( path, da, (err)=>{
        if(err){
            console.log(err)
        }else {
            console.log('数据保存成功')
        }
    })
}
var tologin = function (path) {

    var da = fs.readFileSync(path, 'utf8')
    if (typeof da == "string"){
        var data = JSON.parse(da)
        return data
    }
    return da

}
//获取天气数据。
//获取城市列表数据（网上抄）
//处理数据，筛选自己想要的数据并返回
//设置数据的路由代码。
//前端页面的数据处理和对象的图表上

//拿到数据并且按unix时间来保存
var toSeveData= function(data){
    var time = Math.floor(new Date() / 1000)
    var timePath = 'db/AQI/loginTime.json'
    var timeFile = tologin(timePath)
    timeFile.push(time)
    toseve(timePath, timeFile)
    var path = `db/AQI/allCiytdata_${time}.json`
    toseve(path,data)
}

//获取实时的天气并做存储
var getWaether = function () {
    //和风天气 var  url = `https://free-api.heweather.com/v5/weather?city=${ctiy}&key=0ed0cc5dcdc245e297f867c0a21b9ee3`
    //下面是PM25的临时KEY和所有城市数据的接口
    var url = '	http://www.pm25.in/api/querys/all_cities.json?token=5j1znBVAsnSf5xQyNQyq'
    var r = request('GET',url)
    var da = r.getBody('utf-8')
    toSeveData(da)
}
// 宿主里面比较大小的
// var max = function (array) {
//     var max = 0
//     for (var i = 0; i < array.length; i ++){
//         var num = array[i]
//         if (max < num ){
//             max = num
//         }
//     }
//     return max
// }
//获取天气数据，path 是路径中不同的文件名
var getAllCtiyData = function () {
    var times = tologin('db/AQI/loginTime.json')
    for (var i = times.length - 1 ; i > 0; i --){
        var time = times[i]
        var path = `db/AQI/allCiytdata_${time}.json`
        var data = tologin(path)
        if (data.error === undefined){
            return data
        }
    }

}

//定时获取PM25的数据。时间间隔大概 2.7小时
// setInterval(function () {
//     getWaether()
// },10000000)



var suzquc = function(array) {
    var arr = []
    var json = {}
    for (var i = 0; i < array.length; i++) {
        if (!json[array[i]]) {
            arr.push(array[i])
            json[array[i]] = 1;
        }
    }
    return arr
}
//计算数组的平均数
var supinjz = function (array) {
    var restul = 0
    for (var i = 0; i < array.length; i ++){
        restul += array[i]
    }
    var aqi = parseInt(restul / array.length)
    return aqi
}
//获取城市的名字用来计算空气指数
var cityName = function () {
    var ca =  getAllCtiyData()
    var names = []
    for (var i = 0; i < ca.length; i ++){
        names.push(ca[i].area)
    }
    return suzquc(names)
}
//获取城市AQI的数据。
var getPm25 = function () {
    var ca =  getAllCtiyData()
    var names = cityName()
    var result = []
    for (var i = 0; i <names.length; i ++ ){
        var name = names[i]
        var ipa = []
        for(var j = 0; j < ca.length; j ++ ){
            var cana = ca[j].area
            if (name === cana){
                ipa.push(ca[j].aqi)
            }
        }
        result.push({name : name, value :supinjz(ipa) })
    }
    return result

}

/*

*/


// var getHefenData = function () {
//     var ca =  getAllCtiyData('Hefen')
//     var names = tologin('DataCityName.json')
//     var result = []
//     for (var i = 0; i <names.length; i ++ ){
//         var name = names[i].cityZh
//         var ipa = []
//         for(var j = 0; j < ca.length; j ++ ){
//             var cana = ca[j].area
//             if (name == cana){
//                 ipa.push(ca[j].aqi)
//             }
//         }
//         result.push({name : name, value :supinjz(ipa) })
//     }
//     return result
// }
// var getHefen = function (ctiy) {
//     var url =`https://free-api.heweather.com/v5/forecast?city=${ctiy}&key=0ed0cc5dcdc245e297f867c0a21b9ee3`
//     var r = request('GET', url)
//     var cont = r.getBody('utf-8')
//     var cityDa = JSON.parse(cont)
//     return cityDa
// }
// var  Hefeng = function () {
//     var ctiys = tologin('DataCityName.json')
//     var ctiysData = []
//     for (var i = 0; i < ctiys.length; i++){
//         var ctiy = ctiys[i].id
//         var data = getHefen(ctiy)
//         log(i,data)
//         ctiysData.push(data)
//     }
//     toSeveData(ctiysData,'Hefen')
// }
// var getAllCity = function () {
//     var url = 'http://www.pm25.in/api/querys/all_cities.json?&token=5j1znBVAsnSf5xQyNQyq'
//     var r = request('GET', url)
//     var cont = r.getBody('utf-8')
//     var dat = JSON.parse(cont)
//     var data = JSON.stringify(dat, null, 2)
//     var path = 'allCiyt.json'
//     fs.writeFile(path, data,(err)=>{
//         if(err){
//             console.log(err)
//         }else {
//             console.log('天气数据保存成功')
//         }
//     })
// }
//

// var _ = require('underscore');  
// var cheerio = require('cheerio');  

// var async = require('async');  
// var mkdirp = require('mkdirp');  
// var fs = require('fs');  
// var http = require('http');  
  
// function saveImg(url, dir,name , cb){  
//   http.get(url, function(res){  
//     res.setEncoding('binary');  
//     var data='';  
//     res.on('data', function(chunk){  
//       data+=chunk;  
//     });  
//     res.on('end', function(){  
//       fs.writeFile(dir + "/"+name, data, 'binary', function (err) {  
//         if (err) throw err;  
//         console.log('file saved '+name);  
  
//         console.log("---")  
  
//         cb();  
//       });  
//     });  
//   }).on('error', function(e) {  
//     console.log('error'+e)  
//     cb();  
//   });  
// }  
let _time = 1
let _arrIdx = 0
let  _idx = 0
let _isOverIdx = 0
let _resObj = {}

function _forever(){
    if(_idx < 100){
        _idx ++;
        console.log(cookies[_arrIdx], _idx, _arrIdx)
        sendData(cookies[_arrIdx], _idx, _arrIdx);
        sendData(cookies[_arrIdx+100], _idx, _arrIdx);
        sendData(cookies[_arrIdx+200], _idx, _arrIdx);
        sendData(cookies[_arrIdx+300], _idx, _arrIdx);
        sendData(cookies[_arrIdx+400], _idx, _arrIdx);
        sendData(cookies[_arrIdx+500], _idx, _arrIdx);
        sendData(cookies[_arrIdx+600], _idx, _arrIdx);
        sendData(cookies[_arrIdx+700], _idx, _arrIdx);
        sendData(cookies[_arrIdx+800], _idx, _arrIdx);
        sendData(cookies[_arrIdx+900], _idx, _arrIdx);
        _arrIdx ++;
        setTimeout(res=>{
            _forever();
        },_time);
    }
    console.log('调用结束了。')
}

var sendData = function (cookie, idx, arrIdx){
    
    var ip = underscore.random(1 , 254)  
    + "." + underscore.random(1 , 254)  
    + "." + underscore.random(1 , 254)  
    + "." + underscore.random(1 , 254)  

    // var ip = "10.111.198.90"
    superagent.post(apiUrl)  
    .set('Cookie', cookie)
    .set('Accept', 'application/json')
    .send({uid: "1551939332560462107"})
    // .set("X-Forwarded-For" , "10.111.198.90")  
    .set("X-Forwarded-For" , ip)  
    .end(function (err, response) {  
    if (err) {  
        console.log(err)  
        return;  
    }  
    _resObj[idx+ '_' + ip] = {
        body:response.body,
        ip:ip,
        idx: idx,
        cookie:cookie,
    }

    console.log( `调用接口的次数${idx};   使用的ip${ip};  调用状态${response.status};
      调用结果${JSON.stringify(response.body)}`, ip, response.status, idx, arrIdx, cookie,`
      
      
      
      
      `)

      _isOverIdx++
      if(_isOverIdx > 99){
        console.log( '回调全部结束')
        var newTime = new Date()
        _resObj['REDE_TIME'] = newTime.toString()
        var da = JSON.stringify(_resObj, null, 2)

        fs.writeFile(`db/apiRuslt_${Math.floor(new Date() / 100)}.json`, da, (err)=>{
            if(err){
                console.log(err)
            }else {
                console.log('数据保存成功')
            }
        })
      }
    
    } )  

return

var  requestData = {
    uid: "1551939332560462107"
}
var cookie = request.cookie('uuvid=BFdWDwBqBDINbQM9WWQMPlI2BWEKZAwxUm9QYQFpBzEFO1BjXG4FYQVjVzkIZw5tAz1QPghrCWZTMgQ1XGNfawQ6VmU=')
jar.setCookie(cookie, apiUrl, (coodRrr, cookie)=>{
    request({
        url: apiUrl,
        method: "POST",
        json: true,
        jar:jar,
        headers: {
            "content-type": "application/json",
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
            'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
            'referer': 'http://www.66ip.cn/'
        },
        body: JSON.stringify(requestData)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
        }
        console.log('request',error, response.statusCode)
    }); 
})
}


function _main() {
    cookies.reverse()
    console.log('cookies....',cookies.length)
    _forever()

}

var w = {
    done : _main()
}

module.exports = w
