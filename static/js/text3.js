var e = function (event) {
    return document.querySelector(event)
}

var palyVideo = function() {
    var vi = e('.ppg_video')
    var but = e('.playBtn')
    but.addEventListener('click', function(event){
        var star = e('.star')
        if (star.classList.contains('show')) {
            star.classList.remove('show')
            star.classList.add('unshow')
        }
        vi.play()

    })
}
var showView = function() {
    var vi = e('.ppg_video')
    var but = e('.playBtn')
    var bt = e('.btn')

    if ( bt != null) {
        bt.addEventListener('click',function(event){
            var end = e('.end')
            if (end.classList.contains('show')) {
                end.classList.remove('show')
                end.classList.add('unshow')
            }
            vi.play()
        })
    }

    vi.addEventListener('ended',function(){
        console.log('视频播放结束了');
        var end = e('.end')
        if (end.classList.contains('unshow')) {
            end.classList.remove('unshow')
            end.classList.add('show')
        }

    })
}
var shopVi = function() {
    var vi = e('.ppg_video')
    vi.addEventListener('click',function(event) {
        var yp = vi.dataset.typ
        console.log(yp);
        if (yp == '播放') {
            vi.dataset.typ = '暂停'
            vi.pause()
        }else {
            vi.dataset.typ = '播放'
            vi.play()
        }
    })
}

var _mian = function() {
    palyVideo()
    showView()

    // shopVi()
}

_mian()
