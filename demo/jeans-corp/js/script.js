/*
 * tree.js
 */
$(function() {
    
    // Remove the outline of anchor in IE 6
    $('a').attr('hideFocus', true);
    
    // Sidenav expands and folds
    $('.sub-sidenav').hide();
    $('.sidenav').click(function(e) {
        $(e.target).parent().find('.sub-sidenav').stop(true).slideToggle()
                .parent().siblings().find('.sub-sidenav').stop(true).slideUp();
    });
    
    // Show or hide the job details
    $('.job-detail').hide();
    $('.job-info tbody tr').click(function() {
        if ($(this).hasClass('cur')) {
            $(this).removeClass('cur')
                    .next().slideUp();
        } else {
            $(this).siblings().removeClass('cur');
            $(this).addClass('cur')
                    .after($('.job-detail'))
                    .next().slideDown();
        }
    });
    $('.job-detail').click(function() {
        $(this).slideUp()
                .prev().removeClass('cur');
    });
});