/*
 * jd-tab.js
 */

$(function(){
    $('.smt').bind('mouseover', function(){
        var arrowLeft = $(this).css('marginLeft');
        $(this).parent('.sm').addClass('cur')
                .siblings().removeClass('cur');
        $('.tab-arrow').delay(200)
                        .finish()
                        .animate({left: arrowLeft}, 200);
    });
});