/*
 * jd-pscroll.js
 */

$(function(){
    $('.img-items li').bind('mouseover', function(){
        var curSrc = $(this).children().attr('src'),
            curImgName = curSrc.slice(curSrc.search(/[\w-_\$]+\.jpg$/)),
            oldSrc = $('#img-show img').attr('src'),
            newSrc = oldSrc.replace(/[\w-_\$]+\.jpg$/, curImgName);
        $('#img-show img').attr('src', newSrc);
        $(this).addClass('item-hover')
                .siblings().removeClass('item-hover');
    });
    $('#img-next').click(function(){
        var curLeft = parseInt($('.img-items ul').css('left')),
            len = $('.img-items li').length,
            minLeft = -(len - 5) * 60;
        if (curLeft > (minLeft + 60)) {
            $('#img-prev').removeClass('ctrl-off');
            $('.img-items ul').animate({left: (curLeft-=60) + 'px'}, 100);
        } else if (curLeft == (minLeft + 60)) {
            $(this).addClass('ctrl-off');
            $('#img-prev').removeClass('ctrl-off');
            $('.img-items ul').animate({left: (curLeft-=60) + 'px'}, 100);
        }
    });
    $('#img-prev').click(function(){
        var curLeft = parseInt($('.img-items ul').css('left'));
        if (curLeft < -60) {
            $('#img-next').removeClass('ctrl-off');
            $('.img-items ul').animate({left: (curLeft+=60) + 'px'}, 100);
        } else if (curLeft == -60) {
            $(this).addClass('ctrl-off');
            $('#img-next').removeClass('ctrl-off');
            $('.img-items ul').animate({left: (curLeft+=60) + 'px'}, 100);
        }
    });
});