/*
 * jd-product-show.js
 */

$(function(){
    var offset = $('#product-detail .tab-nav-wrap').offset();
    
    $('a').attr('hideFocus', true);
    $('#product-detail .tab-nav li').click(function(){
        $(this).addClass('cur')
                .siblings().removeClass('cur');
        $('#product-detail .tab-content').addClass('hide')
                        .eq($('#product-detail .tab-nav li').index($(this)))
                        .removeClass('hide');
        if ( $(window).scrollTop() > offset.top ) {
            $(window).scrollTop(offset.top);
        }
    });
    $('#comment-list .tab-nav li').click(function(){
        $(this).addClass('cur')
                .siblings().removeClass('cur');
        $('#comment-list .tab-content').addClass('hide')
                        .eq($('#comment-list .tab-nav li').index($(this)))
                        .removeClass('hide');
    });
    $(window).scroll(function(){
        if ( $(this).scrollTop() > offset.top ) {
            $('.tab-nav-wrap').addClass('fixed');
        } else {
            $('.tab-nav-wrap').removeClass('fixed');
        }
    });
});