jQuery(window).ready(function(){
    setTimeout(function(){
        jQuery('.interface-interface-skeleton__sidebar').width(localStorage.getItem('toast_rs_personal_sidebar_width'))
        jQuery('.interface-interface-skeleton__sidebar').resizable({
            handles: 'w',
            resize: function(event, ui) {
                jQuery(this).css({'left': 0});
                localStorage.setItem('toast_rs_personal_sidebar_width', jQuery(this).width());
           }
        });
        
        determine_if_sidebar_open();

    }, 500);

    jQuery('body').on('click', 'button[aria-controls="edit-post:document"]', function(){
        determine_if_sidebar_open();
    });

    function determine_if_sidebar_open(){
        if(jQuery('button[aria-controls="edit-post:document"]').hasClass('is-pressed')){
            jQuery('.edit-post-layout').addClass('is-sidebar-opened');
        }else{
            jQuery('.edit-post-layout').removeClass('is-sidebar-opened');
        }
    }

})