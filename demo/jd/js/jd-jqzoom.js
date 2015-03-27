/*
 * jd-jqzoom.js
 */

$(function(){
    $('.jqzoom').hover(function(){
        var src = $('.jqzoom img').attr('src'),
            imgName = src.slice(src.search(/[\w-_\$]+\.jpg$/)),
            zoomSrc = 'images/n2/' + imgName;
        
        if (!$('.zoom-shader').attr('class')) {
            $(this).append($('<div class="zoom-shader">&nbsp;</div>'));
        } else {
            $('.zoom-shader').css('visibility', 'visible');
        }
        if (!$('.zoom-show').attr('class')) {
            $(this).after('<div class="zoom-show"><img src="' + zoomSrc +
                '"</div>');
        } else {
            $('.zoom-show').css('visibility', 'visible');
            $('.zoom-show img').attr('src', zoomSrc);
        }
    }, function(){
        $('.zoom-shader').css('visibility', 'hidden');
        $('.zoom-show').css('visibility', 'hidden');
    });
    $('.jqzoom').bind('mousemove', function(e){
        var offset = $(this).offset(),
            diffX = e.clientX - offset.left,
            diffY = e.clientY - offset.top,
            mouseX = e.clientX,
            mouseY = e.clientY;
        
        // Low performance
        if ((diffX > 88) && (diffX < 264)) {
            $('.zoom-shader').css('left', (diffX - 88) + 'px');
            $('.zoom-show img').css('left', -2.3 * (diffX - 88) + 'px');
        } else if ( diffX >= 264) {
            $('.zoom-shader').css('left', '176px');
            $('.zoom-show img').css('left', -2.3 * 176 + 'px');
        } else if ( diffX <= 88) {
            $('.zoom-shader').css('left', '0px');
            $('.zoom-show img').css('left', '0px');
        }
        if ((diffY > 88) && (diffY < 264)) {
            $('.zoom-shader').css('top', (diffY - 88) + 'px');
            $('.zoom-show img').css('top', -2.3 * (diffY - 88) + 'px');
        } else if ( diffY >= 264) {
            $('.zoom-shader').css('top', '176px');
            $('.zoom-show img').css('top', -2.3 * 176 + 'px');
        } else if ( diffY <= 88) {
            $('.zoom-shader').css('top', '0px');
            $('.zoom-show img').css('top', '0px');
        }
    });
});