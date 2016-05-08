/*
 * gslide-0.1.js
 * Gslide is a jquery plugin which can play images in the fade or scroll way.
 */

(function($) {

    $.fn.gslide = function(options) {
        
        return this.each(function() {
        
            $.fn.gslide.defaults = {
                width: 766,
                height: 240,
                switchEffect: 'normal',
                scrollDirection: 'horizontal',
                duration: 500,
                delay: 3000,
                pagination: true,
                navigation: true,
                pauseOnhover: true
            }
            
            var opts = $.extend({}, $.fn.gslide.defaults, options),
                $gslide = $(this);
            
            $gslide.css({
                'width': opts.width,
                'height': opts.height,
                'overflow': 'hidden'
            }).find('img').css({
                'width': opts.width,
                'height': opts.height
            });
                        
            if (opts.navigation === true) {
                createNavigation($gslide);
            }
            
            if (opts.pagination === true) {
                createPagination($gslide);
            }
            
            playSlide($gslide);
            
            function createNavigation($gslide) {
                var $navi = $('<div class="navigation"><a href="javascript:;"' +
                            'class="navi-item navi-prev">&laquo;</a><a href=' +
                            '"javascript:;" class="navi-item navi-next">' +
                            '&raquo;</a></div>');
                
                $gslide.append($navi);
            }
            
            function createPagination($gslide) {
                var i,
                    len = $gslide.find('img').length,
                    $pagi = $('<div class="pagination"></div>'),
                    pagiItemStr= '';
                
                for (i = 0; i < len; i++) {
                    if (i > 0) {
                        pagiItemStr += '<a href="javascript:;" class="pagi-item">' +
                                        (i+1) + '</a>';
                    } else {
                        pagiItemStr = '<a href="javascript:;" class="pagi-item cur">' +
                                        1 + '</a>';
                    }
                }
                
                $pagi.append($(pagiItemStr));
                $gslide.append($pagi);
            }
            
            function switchImg($obj, index) {
                if (opts.switchEffect == 'scroll') {
                
                    if (opts.scrollDirection == 'horizontal') {
                    
                        var boxWidth = $obj.width();
                        
                        $obj.find('.pagi-item').eq(index).addClass('cur')
                                            .siblings().removeClass('cur');
                        
                        $obj.find('ul').stop(true)
                                    .animate({
                            left: -boxWidth * index + 'px'
                        }, opts.duration);
                    } else if (opts.scrollDirection == 'vertical') {
                    
                        var boxHeight = $obj.height();
                        
                        $obj.find('.pagi-item').eq(index).addClass('cur')
                                            .siblings().removeClass('cur');
                        
                        $obj.find('ul').find('li').css('float', 'none');
                        $obj.find('ul').stop(true)
                                    .animate({
                            top: -boxHeight * index + 'px'
                        }, opts.duration);
                    }
                } else if (opts.switchEffect == 'normal') {
                    // Show and hide widthout effect
                    
                    $obj.find('.pagi-item').eq(index).addClass('cur')
                                        .siblings().removeClass('cur');
                    
                    $obj.find('li').eq(index).show()
                                    .siblings().hide();
                
                } else if (opts.switchEffect == 'fade') {
                    // Show and hide width fade effect
                    
                    $obj.find('.pagi-item').eq(index).addClass('cur')
                                        .siblings().removeClass('cur');
                    
                    $obj.find('li').hide().eq(index).css({
                        'display': 'block',
                        'opacity': 0,
                        'z-index': 10
                    }).stop(true).animate({
                        opacity: 1
                    }, opts.duration).siblings().stop(true).animate({
                        opacity: 0
                    }, opts.duration).css({
                        'z-index': 9
                    });
                }
            }
            
            function playSlide($gslide) {
                var i = 1,
                    len = $gslide.find('img').length,
                    clear;
                
                clear = setInterval(function() {
                    if ( i >= len ) {
                        i = 0;
                    }
                    switchImg($gslide, i);
                    i++;
                }, opts.delay);
                
                if (opts.pauseOnhover == true) {
                    $gslide.hover(function() {
                        clearInterval(clear);
                    }, function(){
                    
                        clear = setInterval(function() {
                            if ( i >= len ) {
                                i = 0;
                            }
                            switchImg($gslide, i);
                            i++;
                        }, opts.delay);
                    });
                }
                
                $gslide.find('.pagi-item').hover(function() {
                
                    i = $gslide.find('.pagi-item').index($(this));
                    switchImg($gslide, i);
                
                });
                    
                
                $gslide.find('.navi-prev').click(function() {
                    
                    i--;
                    if ( i < 0 ) {
                        i = len - 1;
                    }
                    switchImg($gslide, i);
                });
                
                $gslide.find('.navi-next').click(function() {
                    
                    i++;
                    if ( i >= len ) {
                        i = 0;
                    }
                    switchImg($gslide, i);
                });
            }
        });
    };
        
}(jQuery));