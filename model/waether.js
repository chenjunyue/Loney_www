/**
 * Created by Administrator on 2017/5/11.
 */

var fs = require("fs")
var request = require('sync-request')
var log = console.log.bind()
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
setInterval(function () {
    getWaether()
},10000000)



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

var w = {
    data : getPm25()

}

module.exports = w