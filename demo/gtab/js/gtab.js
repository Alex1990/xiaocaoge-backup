/*
 * gtab.js
 * Gtab is a jquery plugin which has the click and hover interaction and has
 * normal, scroll and fade switch effects.
 */

(function($) {

    $.fn.gtab = function(options) {
    
        return this.each(function() {
        
            $.fn.gtab.defaults = {
                interaction: 'mouseenter',
                switchEffect: 'normal',
                scrollDirection: 'horizontal',
                duration: 500
            }
            
            if (options && options.interaction && (options.interaction == 'hover')) {
                options.interaction == 'mouseenter';
            }
            
            var opts = $.extend({}, $.fn.gtab.defaults, options),
                $gtab = $(this),
                len = $gtab.find('.tc-item').length;
            
            if (opts.switchEffect == 'scroll' &&
                    opts.scrollDirection == 'horizontal') {
                
                $gtab.find('.tc').css({
                    width: opts.width * len,
                    height: opts.height,
                    overflow: 'hidden'
                }).find('.tc-item').css({
                    'float': 'left'
                });
            }
            
            if (opts.switchEffect == 'normal') {
                
                $gtab.find('.tt-item').bind(opts.interaction, function() {
                    var index = $gtab.find('.tt-item').index($(this));
                    
                    $(this).addClass('cur')
                            .siblings().removeClass('cur');
                    $gtab.find('.tc-item').addClass('hide')
                                        .eq(index).removeClass('hide');
                
                });
            } else if (opts.switchEffect == 'scroll') {
                
                if (opts.scrollDirection == 'horizontal') {
                
                    $gtab.find('.tt-item').bind(opts.interaction, function() {
                        var index = $gtab.find('.tt-item').index($(this));
                        
                        $(this).addClass('cur')
                                .siblings().removeClass('cur');
                        
                        $gtab.find('.tc-item').removeClass('hide');
                        
                        $gtab.find('.tc').finish().animate({
                            left: -opts.width * index + 'px'
                        }, opts.duration);
                    });
                } else if (opts.scrollDirection == 'vertical') {
                
                    $gtab.find('.tt-item').bind(opts.interaction, function() {
                        var index = $gtab.find('.tt-item').index($(this));
                        
                        $(this).addClass('cur')
                                .siblings().removeClass('cur');
                        
                        $gtab.find('.tc-item').removeClass('hide');
                        
                        $gtab.find('.tc').finish().animate({
                            top: -opts.height * index + 'px'
                        }, opts.duration);
                    });
                }
            } else if (opts.switchEffect == 'fade') {
            
                $gtab.find('.tt-item').bind(opts.interaction, function() {
                    var index = $gtab.find('.tt-item').index($(this));
                    
                    $(this).addClass('cur')
                            .siblings().removeClass('cur');
                    $gtab.find('.tc-item').siblings()
                                        .finish().fadeOut(opts.duration);
                    $gtab.find('.tc-item').eq(index)
                                        .finish().fadeIn(opts.duration);
                });
            }
        });
    };
}(jQuery));