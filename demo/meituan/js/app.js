/*
 * app.js
 */

Zepto(function($) {

    // 检测是否是触摸屏
    var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    // 检测IE Mobile版本
    var isIE11m = window.navigator.pointerEnabled ? true: false;
    var isIE10m = window.navigator.msPointerEnabled && !isIE11m ? true : false;

    // 根据不同浏览器，以及是否触屏返回相应的事件
    var startEvt;
    if (isTouch) {
        if (isIE11m) {
            startEvt = 'pointerdown';
        } else if (isIE10m) {
            startEvt = 'MSPointerDown';
        } else {
            startEvt = 'touchstart';
        }
    } else {
        startEvt = 'click';
    }


    // 元素相对于页面的垂直坐标
    function pageY(el) {
        var y = 0;
        do {
            y += el.offsetTop;
        } while (el = el.offsetParent);
        return y;
    }

    // 隐藏半透明遮罩层
    $('#overlay').on(startEvt, function() {
        $(this).removeClass('show');
        $('.t-item').removeClass('active');
        $('.dropdown').removeClass('show');
    });

    // 固定
    $('#filter').on(startEvt, function() {
        window.scrollTo(0, pageY(this));
    });

    //筛选器显示与隐藏
    $('.t-item').on(startEvt, function() {
        var $dropdown = $('#' + $(this).attr('data-dropdown'));
        $('#overlay').addClass('show');

        if ($(this).hasClass('active')) {

            $(this).removeClass('active');
            $dropdown.removeClass('show');
            $('#overlay').removeClass('show');
        } else {
            $(this).addClass('active')
                    .siblings().removeClass('active');
            $dropdown.addClass('show')
                    .siblings().removeClass('show');
        }
    });

    // 筛选器下拉列表项的click事件
    $('.dropdown').delegate('li', startEvt, function() {
        $(this).addClass('selected')
                .siblings().removeClass('selected');

        $('.t-item').eq($(this).parent().index())
                .find('span').text($(this).find('p').text());

        request($(this).parent().attr('id'), this);

        $('.overlay').addClass('ajax');
        $('.t-item').eq($(this).parent().index()).removeClass('active');
        $(this).parent().removeClass('show');
    });

    // 根据所选类别/地区/排序方式发送ajax请求
    function request(ddId, item) {
        ddId = ddId.replace('dropdown-', '');

        var url,
            href = window.location.href,
            dataId = $(item).attr('data-' + ddId + '-id');

        // 实际url
        url = querySet(href, ddId, dataId);

        // 改变URL添加历史记录，这样可以利用回退、前进按钮
        history.pushState({ddId: dataId}, ddId + dataId, url);

        // 测试url，删掉下一行代码
        url = 'testData.txt';

        $.ajax({
            url: url,
            success: function(data) {
                listRender(JSON.parse(data));
                $('.overlay').removeClass('ajax show');
            }
        });
    }

    // 滑动到底部加载更多
    var ajaxing = false;
    $(window).on('scroll', function() {
        // 距离底部 0px 时，加载更多
        var offset = 0;
        if (!ajaxing && ($(document).height() - $(window).height() - 
                $(window).scrollTop() <= offset)) {
            loadMore();
            ajaxing = true;
        }
    });

    // 加载更多数据
    function loadMore() {
        var pageIndex = $('#list').attr('data-page-index'),
            pageSize = $('#list').attr('data-page-size');

        pageIndex = parseInt(pageIndex, 10) + 1;

        url = querySet(window.location.href, 'pageIndex', pageIndex);
        url = querySet(url, 'pageSize', pageSize);

        // 测试URL
        url = 'testData.txt';
        $('.loading').addClass('show');
        
        $.ajax({
            url: url,
            success: function(data) {
                if (data != '[]') {
                    var listTplFn = doT.template($('#list-tpl').html());

                    $('#list').append(listTplFn(JSON.parse(data)));
                    $('#list').attr('data-page-index', pageIndex);
                    $('.loading').removeClass('show');
                    ajaxing = false;
                } else {
                    $('.loading').hide();
                }
            }
        });
    }

    // 将返回的数据渲染到文档页面中
    function listRender(data) {
        var listTplFn = doT.template($('#list-tpl').html());
        $('#list').html(listTplFn(data));
    }


    // 设置url查询参数
    function querySet(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }

});