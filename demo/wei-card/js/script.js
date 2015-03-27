/*
 * Greeting Card
 */

var onBridgeReady = function() {
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            'title': data.title,
            'img_url': data.imgUrl,
            'desc': data.desc,
            'link': data.link
        }, function(res) {
            alert(res.err_msg);
        });
    });
};
document.addEventListener('WeixinJSBridgeReady', onBridgeReady);

// 发送给朋友
var sendBtn = document.getElementsByClassName('send-btn')[0];
sendBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (typeof WeixinJSBridge == 'undefined') {
        alert('请通过微信分享此内容');
    } else {
        guide();
    }
});

// 取消发送或分享
var cancelBtn = document.getElementById('cancel-share');
cancelBtn.addEventListener('click', function() {
    var guideLayer = document.getElementById('guide');
    removeClass(guideLayer, 'show');
});
function guide() {
    var guideLayer = document.getElementById('guide');
    addClass(guideLayer, 'show');
}

function hasClass(obj, cls) {
    return obj.className && obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg1 = new RegExp('(\\s|^)' + cls + '(\\s|$)'),
            reg2 = new RegExp('\\s' + cls + '\\s');
        obj.className = reg2.test(obj.className) ?
                obj.className.replace(reg2, ' ') :
                obj.className.replace(reg1, '');
    }
}