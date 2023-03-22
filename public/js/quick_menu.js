(($,window,document) => {

    const Kurly = {
        init:function(){
            this.quickMenu();
        },
        quickMenu: function(){
            let quickTop = 0;

            function quickMenuFn(){
                try{ 

                    if( $(window).scrollTop() >= $('#section2 .slide-container').offset().top ){
                        quickTop = ($(window).height()-554)/2 + $(window).scrollTop();
                        $('#quickMenu').stop().animate({top:quickTop }, 300, 'easeOutExpo');
                    }
                    else {
                        $('#quickMenu').stop().animate({top: $('#section2 .slide-container').offset().top }, 300, 'easeOutExpo');
                    }
                }
                catch {
    
                    if( $(window).scrollTop() >= 248 ){
                        quickTop = ($(window).height()-554)/2 + $(window).scrollTop();
                        $('#quickMenu').stop().animate({top:quickTop }, 300, 'easeOutExpo');
                    }
                    else {
                        $('#quickMenu').stop().animate({top: 248 }, 300, 'easeOutExpo');
                    }
                }
            }
            quickMenuFn();

            $(window).scroll(function(){
                quickMenuFn();
            });
        }
    }
    Kurly.init();

})(jQuery,window,document);