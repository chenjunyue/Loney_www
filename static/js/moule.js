/*
1.获取输入框里面的内容，并绑定到提交按钮。并跳转到百度
2。获取输入框实时输入的内容。
3.将内容以获取内容的搜索补全。
4.形成下拉菜单
5。点击下拉菜单可以调转到百度的搜索页面。
*/

// 不要把页面绑定作为一个重复调用的函数，因为这样你会被重复执行。

//3.将内容以获取内容的搜索补全。
var search = {
    baidu : [
        (function(content) {
                    var url = `http://suggestion.baidu.com/su?wd=${content}&cb=baiduCallback`
                    var script = document.createElement("script");
                    script.src = url;
                    // console.log('baidu ','请求网址',url);
                    document.head.appendChild(script)
                    baiduCallback = function(data){
                            // console.log('百度',data);
                            str = ''
                            for (var i = 0; i < data.s.length; i++) {
                                str += `<li><a href = https://www.baidu.com/s?ie=UTF-8&wd=${data.s[i]}  target="_blank"> ${data.s[i]} </a></li>`
                            }
                            e('#id_search_list').innerHTML = str
                    }
                    if (script.src === url) {
                        document.head.removeChild(script)
                    }
            }),
            'https://www.baidu.com/s?ie=UTF-8&wd='
    ],
    biying : [function(content) {
                var url = `http://api.bing.com/qsonhs.aspx?type=cb&q=${content}&cb=biyingCallback`
                var script = document.createElement("script");
                script.src = url;
                document.head.appendChild(script)
                // console.log('必应','请求网址',url);
                biyingCallback = function(data){
                        // console.log('这是必应的',data);
                        str = ''
                        if (data.AS.Results[0]) {
                            for (var i = 0; i < data.AS.Results[0].Suggests.length; i++) {
                                str += `<li><a href = ${data.AS.Results[0].Suggests[i].Url} target="_blank"> ${data.AS.Results[0].Suggests[i].Txt} </a></li>`
                            }
                        }
                        e('#id_search_list').innerHTML = str
                }
                if (script.src === url) {
                    document.head.removeChild(script)
                }
            },
            'https://www.bing.com/search?q='
    ],
        sogou : [function(content) {
                    // var url = `https://www.sogou.com/suggnew/ajajjson?key=${content}&type=web`
                    var url = `http://w.sugg.sogou.com/sugg/ajaj_json.jsp?key=${content}&type=web`
                    var script = document.createElement("script");
                    script.src = url;
                    document.head.appendChild(script)
                    // console.log('sougu','请求网址',url);
                    window.sogou = {
                        sug : function(data) {
                            // console.log('这是搜狗的',data);
                            str = ''
                            if (true) {
                                for (var i = 0; i < data[1].length; i++) {
                                    str += `<li><a href = https://www.sogou.com/web?query=${data[1][i]}&ie=utf8 target="_blank"> ${data[1][i]} </a></li>`
                                }
                            }
                            e('#id_search_list').innerHTML = str
                        }
                    }
                    if (script.src === url) {
                        document.head.removeChild(script)
                    }
                },
                'https://www.sogou.com/web?query='
        ],
    taobao : [function(content) {
                var url = ` https://suggest.taobao.com/sug?code=utf-8&q=${content}&callback=taobaoCallback`
                var script = document.createElement("script");
                script.src = url;
                document.head.appendChild(script)
                // console.log('taobao','请求网址',url);
                taobaoCallback  =  function(data) {
                        // console.log('这是淘宝',data);
                        str = ''
                        for (var i = 0; i < data.result.length; i++) {
                            str += `<li><a href = https://s.taobao.com/search?q=${data.result[i][0]} target="_blank"> ${data.result[i][0]} </a> <span>数量：${data.result[i][1]}</span></li>`
                        }
                        e('#id_search_list').innerHTML = str
                }
                if (script.src === url) {
                    document.head.removeChild(script)
                }
            },
            'https://s.taobao.com/search?q='
        ],
    sogouZhihu : [function(content) {
                var url = `http://w.sugg.sogou.com/sugg/su.jsp?key=${content}&type=zhihu&pr=zhihu`
                var script = document.createElement("script");
                script.src = url;
                // console.log('zhihu ','请求网址',url);
                document.head.appendChild(script)
                window.sogou = {
                    sug : function(data) {
                        // console.log('知乎',data);
                        str = ''
                        if (true) {
                            for (var i = 0; i < data[1].length; i++) {
                                str += `<li><a href = http://zhihu.sogou.com/zhihu?query=${data[1][i]}&ie=utf8 target="_blank"> ${data[1][i]} </a></li>`
                            }
                        }
                        e('#id_search_list').innerHTML = str
                    }
                }
                if (script.src === url) {
                    document.head.removeChild(script)
                }
            },
            'http://zhihu.sogou.com/zhihu?query='
        ],
    sogouWeixin  : [function(content) {
                var url = `http://w.sugg.sogou.com/sugg/ajaj_json.jsp?key=${content}&type=wxart&pr=web`
                var script = document.createElement("script");
                script.src = url;
                // console.log('微信','请求网址',url);
                document.head.appendChild(script)
                window.sogou  =  {
                        sug : function(data) {
                        // console.log('微信data',data);
                        str = ''
                        if (true) {
                            for (var i = 0; i < data[1].length; i++) {
                                // str += `<li><a href = http://weixin.sogou.com/weixin?type=2&s_from=input&query=${data[1][i]}&ie=utf8 > ${data[1][i]} </a></li>`
                                str += `<li><a href = http://weixin.sogou.com/weixin?type=2&s_from=input&query=${data[1][i]}&ie=utf8  target="_blank"> ${data[1][i]} </a></li>`
                            }
                        }
                        e('#id_search_list').innerHTML = str
                    }
                }
                if (script.src === url) {
                    document.head.removeChild(script)
                }
            },
            'http://weixin.sogou.com/weixin?type=2&s_from=input&query='
        ]
}

var seap = ['baidu']

function opt(sug){
     var b = []
     var url = search[sug][1]
     b.push(url)
     var func = search[sug][0]
     b.push(func)
     return b
}

var bindseach = function() {
    var searchBut = e('#id_search_button')
    var searInput = e('#id_search_input')
    var searMorLis = e('.search_type')
    var morButton = e('#id_search_type')
    bindEvent(morButton, 'click', (event) => {
        toggleClass(e('.search_type'), 'show')
    })
    bindEvent(searMorLis, 'click', (event) => {
        var self = event.target
        var co = self.dataset.search
        var na = self.innerText
        //用来筛选需要的返回的函数
        seap.push(co)
        searchBut.innerHTML = na
        if (searInput.value != '') {
            var con = searInput.value
            var b = seap[seap.length - 1]
            var bm = opt(b)
            bm[1](con)
        }
    })
    bindEvent(searchBut, 'click', () => {
        var co = searInput.value
        //来打开窗口的函数
        var b = seap[seap.length - 1]
        var bm = opt(b)
        var path = bm[0] + co
        window.open(path)
    })
    bindEvent(searInput, 'input', () => {
        var co = searInput.value
        //用来获取搜索补全并的函数
        var b = seap[seap.length - 1]
        var bm = opt(b)
        bm[1](co)
    })
}
bindseach()
