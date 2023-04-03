(($, window, document) => {


    const Kurly = {
        init: function(){
            this.goTop();            
        },
        goTop: function(){
          let offsetTop = 0;
          let _path = './';

          try{
            offsetTop = $('#section2  .slide-container').offset().top;
          }
          catch{
            offsetTop = 248;
          }

          $('.go-top-btn').on({
              mouseenter: function(){
                $(this).find('img').attr('src',`${_path}img/go_top/go_top_on.png`);
              },
              mouseleave: function(){
                $(this).find('img').attr('src',`${_path}img/go_top/go_top.png`);
              },
              click: function(){
                $('html, body').stop().animate({scrollTop: 0}, 600, 'easeInOutExpo');
              }
          });

          $(window).scroll(function(){
              scrollEvent();
          });
          
          function eventFn(z){
              if( $(window).scrollTop() >= z ){
                $('#goTop').stop().fadeIn(600);
              }
              else{
                $('#goTop').stop().fadeOut(600);
              }
          }

          function scrollEvent(){
              try{
                eventFn(offsetTop); 
              }
              catch{
                eventFn(offsetTop);  
              }
          }
          scrollEvent(); 
        }
    }

    Kurly.init();
 

})(jQuery, window, document);