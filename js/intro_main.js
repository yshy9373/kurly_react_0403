(($, window, document) => {
    const Kurly = {
        init: function(){
            this.section1();
            this.section2();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
        },
        section1: function(){
            let cnt = 0;    
            let setId = 0;

            const $s1SlideWrap      = $('#section1 .slide-wrap');
            const $s1Slide          = $('#section1 .slide');
            const $s1CountNumber    = $('#section1 .count-number');
            const $s1TotalNumber    = $('#section1 .total-number');
            const $s1SlideContainer = $('#section1 .slide-container');
            const $s1NextBtn        = $('#section1 .next-btn');
            const $s1PrevBtn        = $('#section1 .prev-btn');
            const n                 = $('#section1 .slide').length-2;

            mainSlide();  

            
            function mainSlide(){
                $s1SlideWrap.animate({ left: `${-100*cnt}%` }, 600,   function(){
                    if(cnt >= n){  
                        cnt=0; 
                        $s1SlideWrap.animate({ left: `${-100*cnt}%` }, 0);
                    }
                    
                    if(cnt <= -1){  
                        cnt=n-1; 
                        $s1SlideWrap.animate({ left: `${-100*cnt}%` }, 0);
                    }
                });

                let total = $s1Slide.length-2; 
                $s1CountNumber.text( cnt===n ? 1 : (cnt+1===0 ? n : cnt+1) ); 
                $s1TotalNumber.text( total ); 

            }

            function nextCount(){
                cnt++; 
                mainSlide();
            }

            function prevCount(){
                cnt--; 
                mainSlide();
            }


            function autoTimer(){
                clearInterval( setId );
                setId = setInterval(nextCount, 3000); 
            }
            autoTimer();


            $s1SlideContainer.on({
                mouseenter: function(){
                    clearInterval( setId );  
                    $s1NextBtn.stop().fadeIn(1000);
                    $s1PrevBtn.stop().fadeIn(1000);                   
                },
                mouseleave: function(){
                    autoTimer(); 
                    $s1NextBtn.stop().fadeOut(1000);
                    $s1PrevBtn.stop().fadeOut(1000);
                }
            })

            $s1NextBtn.on({
                click: function(e){
                    e.preventDefault();               
                    if( $s1SlideWrap.is(':animated')===false ){
                        nextCount();
                    }

                }
            });


            $s1PrevBtn.on({
                click: function(e){
                    e.preventDefault();
                    if ( $s1SlideWrap.is(':animated')===false  ){
                        prevCount();
                    }
                }
            });


            let touchStart = null;
            let touchEnd = null;
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;
            let winW = $(window).innerWidth();
           
            $s1SlideContainer.on({
                mousedown(e){
                    clearInterval(setId);
                    winW = $(window).innerWidth();
                    touchStart = e.clientX;
                    dragStart = e.clientX - $s1SlideWrap.offset().left-winW;
                    mouseDown = true;
                },
                mouseup(e){
                    touchEnd = e.clientX;
                    if( touchStart - touchEnd > 0){
                        nextCount();
                    }
                    if( touchStart - touchEnd < 0){
                        prevCount();
                    }
                    mouseDown = false;
                },
                mouseleave(e){
                    touchEnd = e.clientX;
                    autoTimer();
                    mouseDown = false;
                },
                mousemove(e){
                    if(mouseDown===false) return;
                    dragEnd = e.clientX;
                    $s1SlideWrap.css({left: dragEnd-dragStart});
                }    
            });

            $s1SlideContainer.on({
                touchstart(e){
                    clearInterval(setId);
                    winW = $(window).innerWidth();
                    touchStart = e.originalEvent.changedTouches[0].clientX;
                    dragStart = e.originalEvent.changedTouches[0].clientX - $s1SlideWrap.offset().left-winW;
                    mouseDown = true;
                },
                touchend(e){
                    touchEnd = e.originalEvent.changedTouches[0].clientX;
                    if( touchStart - touchEnd > 0){
                        nextCount();
                    }
                    if( touchStart - touchEnd < 0){
                        prevCount();
                    }
                    mouseDown = false;
                },
                touchmove(e){
                    if(mouseDown===false) return;
                    dragEnd = e.originalEvent.changedTouches[0].clientX;
                    $s1SlideWrap.css({left: dragEnd-dragStart});
                }    
            });

        },
        section2: function(){
            let cnt = 0;
            const $s2NextBtn = $('#section2 .next-btn');
            const $s2PrevBtn = $('#section2 .prev-btn');
            const $s2SlideWrap = $('#section2 .slide-wrap');


           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $s2NextBtn.stop().fadeOut(300);
                }
                else{
                    $s2NextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $s2PrevBtn.stop().fadeOut(300);
                }
                else {
                    $s2PrevBtn.stop().fadeIn(300);
                }             
                $s2SlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide();

 
           function nextCount(){
                cnt++;                
                mainSlide();
           }

           function prevCount(){
                cnt--;                
                mainSlide();
           }

       
           $s2NextBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    nextCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },

           });

           $s2PrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    prevCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },
           });

        },
        section5: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section5 .next-btn');
            const $sPrevBtn =   $('#section5 .prev-btn');
            const $sSlideWrap = $('#section5 .slide-wrap');


           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); 

        
           function nextCount(){
                cnt++;                
                mainSlide();
           }
          
           function prevCount(){
                cnt--;                
                mainSlide();
           }


           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    nextCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },

           });
           
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    prevCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },
           });

        },
        section6: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section6 .next-btn');
            const $sPrevBtn =   $('#section6 .prev-btn');
            const $sSlideWrap = $('#section6 .slide-wrap');


           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); 

           
           function nextCount(){
                cnt++;                
                mainSlide();
           }
            
           function prevCount(){
                cnt--;                
                mainSlide();
           }

          
           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    nextCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },

           });
           
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    prevCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },
           });

        },   
        section7: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section7 .next-btn');
            const $sPrevBtn =   $('#section7 .prev-btn');
            const $sSlideWrap = $('#section7 .slide-wrap');


           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); 


           function nextCount(){
                cnt++;                
                mainSlide();
           }
           
           function prevCount(){
                cnt--;                
                mainSlide();
           }

          
           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    nextCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },

           });
           
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault();
                    prevCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },
           });

        },
        section8: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section8 .next-btn');
            const $sPrevBtn =   $('#section8 .prev-btn');
            const $sSlideWrap = $('#section8 .slide-wrap');


           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); 

            
           function nextCount(){
                cnt++;                
                mainSlide();
           }
           
           function prevCount(){
                cnt--;                
                mainSlide();
           }

           
           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    nextCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },

           });
           
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); 
                    prevCount();
                },
                mouseenter: function(){
                    $(this).attr('src','./img/intro_main/arrow_perple.svg');
                },
                mouseleave: function(){
                    $(this).attr('src','./img/intro_main/arrow_white.svg');
                },
           });

        }

    }

    Kurly.init();

})(jQuery, window, document);