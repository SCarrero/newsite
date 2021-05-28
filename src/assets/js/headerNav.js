  /************************************************************* */
  //TOP RIBBON  CODE
  /************************************************************* */

  //HIDE STYLE FOR TOP NAV RIBBON UNLESS LOADED
  $(function(){  
    $(".top-nav-wrapper").find('.hide').each(function(){
      $(this).removeClass('hide');
    });
  });
    
  //TOP RIBBON SLIDE OPEN ANIMATION
  function topNavAnimation(){
    $("#sf-link, #renters-link").on("click", function(){
      var $dropsOpen = $('#top-nav').find('.top-nav-nested').filter(":visible"),
          $child = $(this).next('.top-nav-nested');   
      if ($child.filter(":visible").length) {
        $child.slideUp(400);
      } else {
        if($dropsOpen.length) {
          $dropsOpen.slideUp(400);
        }
        $child.slideDown(400);
      }   
    });
  }

  //TOP RIBBON MOBILE DROPDOWN REVEAL ON CLICK
  function mobileTopNavAnimate (){
    var $first = mobileTopSubNav.find('a, button').first(), 
      $last = mobileTopSubNav.find('a, button').last();
    mobileTopSubNav.on(
      'on.zf.toggler', function() {
        $(this).hide();
        if(notice.length && notice.css('display') !== 'none'){
          notice.slideUp();
        }
        resetPeekNav();
        bodyWrapper.addClass('scroll-lock');
        $(this).slideDown(300,function(){
          $(this).addClass("opened");
        });
    });
    mobileTopSubNav.on(
      'off.zf.toggler', function() {
        bodyWrapper.removeClass('scroll-lock');
        $(this).slideUp(300,function(){
          $(this).removeClass("opened");
        });
    });
    $last.on('keydown', function(e) {
      if (e.which === 9 && !e.shiftKey) {
        mobileTopSubNav.foundation('toggle');
      }
    });
    $first.on('keydown', function(e) {
      if (e.which === 9 && e.shiftKey) {
        mobileTopSubNav.foundation('toggle');
      }
    });
  }


  /************************************************************* */
  //MAIN MENU CODE
  /************************************************************* */

  //MAIN MENU DROPDOWN ANIMATION
function navDropDownAnimate (){
  if($('html').hasClass("white")){
    $('.header-logo svg').addClass('transition-active'); // prevent css transition running on initial page load
  }
  //WHEN THE DESKTOP SUB NAV OPENS....  
  subNav.each(function(index, element){
    $(this).on(
      'show.zf.dropdown', function(){
        var $this = $(this);         
        if($(".is-dropdown-submenu-parent.is-active").length){
          $(".is-dropdown-submenu-parent.is-active").each(function(){
            $(this).children('a').trigger('click');
            console.log("closed dropdown");
          });
          
        }
        if($this.hasClass('is-open')){
          dropDownWrapper.fadeIn(150);
          clearTimeout(bgDropdownTimer);
          $this.fadeIn(150, function(){
            if($this.is('#search-sub-nav')){
              $(".search-input").trigger("focus");
            }
            else {
              $this.find('a, button').first().trigger("focus");
            }
            if($this.find('[data-equalize').length){
              equalCards($this.find('[data-equalize]'));
            }   
          });  
          logoImg.addClass('expanded');
          bodyWrapper.addClass('nav-expanded-overlay');  
        }
    }).on(
      'hide.zf.dropdown', function() {
        bgDropdownTimer = setTimeout(function() {
          dropDownWrapper.fadeOut(140);
          bodyWrapper.removeClass('nav-expanded-overlay');
        },100);
        var $this = $(this),
        parent = $this.attr('aria-labelledby') || '';
        $this.fadeOut(100); 
        logoImg.removeClass('expanded');
        if($("#"+parent).length){
          $("#"+parent).trigger('focus');
        }
    }); 
  })
}

function equalCards(elem){
  elem = new Foundation.Equalizer(elem, {});
}

function onMobileToggle() {  
  //MOBILE SEARCH BUTTON TOGGLER
  mobileSearchSubNav.on('on.zf.toggler', function() {   
    if(bodyWrapper.hasClass('is-open-right')){    
      hideMobileMenus(); 
      mobileNav.foundation('toggle');
    } 
    $(this).hide().slideDown(100, function(){
      $('#mobile-search-input').trigger("focus");
    });      
  }).on('off.zf.toggler', function() {
      $(this).slideUp(100);
      mobileSearchButton.trigger('focus');
  });
  $('body').on(
    'opened.zf.offCanvas', function(){
    resetPeekNav();
    if(notice.length && notice.css('display') !== 'none'){
      notice.slideUp();
    }
    if(mobileSearchSubNav.hasClass('expanded')){
      mobileSearchSubNav.foundation('toggle'); 
    } 
  }).on('closed.zf.offCanvas', function(){
    hideMobileMenus();
  });
  mobileNav.removeClass('hide-for-xlarge');

}
function hideMobileMenus(){  
  if(bodyWrapper.hasClass('is-open-right')){  
    $('#mobile-drilldown').find(".is-active").each(function(){ 
      $('#mobile-drilldown').foundation('_hide', $(this));
    });
    mobileNav.foundation('toggle');
  }  
}

function resetMobileDrillDown(){
  $('.js-off-canvas-overlay').on('click', function(){
    hideMobileMenus();
  })
}

//If the desktop Nav is open and the screen is resized to mobile while it's open then reset it
function resetNav() {    
  $(window).on('changed.zf.mediaquery', function(e, nS, oS){
    //cross threshold where desktop ribbon changes to mobile ribbon
    if((oS === "large" || oS==="xlarge" || oS==="xxlarge")  && (nS==="small" || nS==="medium")){
      bodyWrapper.removeClass('scroll-lock');
      if($('#top-nav').find(".is-active").length){
        $('#top-nav').trigger('hide.zf.dropdownMenu');
      }
    }
    //cross threshold where mobile ribbon changes to desktop ribbon
    if((nS === "large" || nS==="xlarge" || nS==="xxlarge")  && (oS==="small" || oS==="medium")){
      if(mobileTopSubNav.hasClass('is-shown')){
        mobileTopSubNav.foundation('toggle');
      }
    }
    //cross threshold where mega nav drops to mobile nav  
    if((oS==="xlarge" || oS==="xxlarge")  && (nS==="small" || nS==="medium" || nS==="large")){
      resetPeekNav();
      subNav.filter(".is-open").each(function(){
        $(this).foundation('close');
      });
      dropDownWrapper.hide();
    }
    //cross threshold where mobile nav swaps to mega nav  
    if((nS==="xlarge" || nS==="xxlarge")  && (oS==="small" || oS==="medium" || oS==="large")){
      resetPeekNav();
      hideMobileMenus();  
      if(mobileSearchSubNav.hasClass('expanded')){
        mobileSearchSubNav.foundation('toggle'); 
      } 
    }
  })
}

function focusSearch(){
  mobileSearchButton.on("click", function(){
    $('#mobile-search-input').trigger("focus");
  });
}

function AddTopNavTouch() {
  navItems.not(".divider").on("touchstart", function(e){
    var section = $(this).attr("data-toggle");
    if($('#'+section).attr('aria-hidden')!=="false") {      
      e.preventDefault();      
      $('#'+section).foundation('toggle');
    }
  }).on("keydown", function(e){
    var section = $(this).attr("data-toggle"), key  = e.which || e.keyCode;
    if(key === 13 && $('#'+section).attr('aria-hidden')!=="false"){     
      e.preventDefault();      
      $('#'+section).foundation('toggle');
    }
  });
}
function trapDropNavFocus(){
  navItems.not(".divider").each(function(){
    var section = $(this).attr("data-toggle"),
      $first = $('#'+section).find('a, button').first(), 
      $last = $('#'+section).find('a, button').last();
    $last.on('keydown', function(e) {
      if ($('#'+section).attr('aria-hidden')=="false" && e.which === 9 && !e.shiftKey) {
        e.preventDefault();
        $first.trigger("focus");
      }
    });
    $first.on('keydown', function(e) {
      if ($('#'+section).attr('aria-hidden')=="false" && e.which === 9 && e.shiftKey) {
        e.preventDefault();
        $last.trigger("focus");
      }
    });
  });
}
function trapMobileNavFocus(){
  bodyWrapper.on("openedEnd.zf.offCanvas", function(){
    var $first = mobileNav.find('li.header').first().find("a"), 
      $last = mobileNav.find('.nested-close-button').find("a");
    $first.trigger("focus");
    $last.on('keydown', function(e) {
      if (e.which === 9 && !e.shiftKey) {
        e.preventDefault();
        $first.trigger("focus");
      }
    });
    $first.on('keydown', function(e) {
      if (e.which === 9 && e.shiftKey) {
        e.preventDefault();
        $last.trigger("focus");
      }
    });
  });
  $("#mobile-drilldown").on("open.zf.drilldown", function(){
    subNavTimer = setTimeout(function(){
      var $panel = $("#mobile-drilldown").find('ul:last-child').filter(".is-drilldown-submenu").not('.invisible').last(),
        $links = $panel.children('li').children('a'), 
        $first = $links.first();
        $last = $links.last();  
      $last.on('keydown', function(e) {
        if (e.which === 9 && !e.shiftKey) {
          e.preventDefault();
          $first.trigger("focus");
        }
      });
      $links.each(function(){
        $(this).on('keydown', function(e) {
          if (e.which === 9 && e.shiftKey) {
            e.preventDefault();
            $(this).trigger("focus");
          }
        });
      });      
    }, Foundation.Drilldown.defaults.animationDuration + 80);
  });  
}
function resetPeekNav(){
  headerNav.removeClass("position-fixed");
  navFiller.css({"height": 0});
  headerNavContent.removeClass("downscroll");
  bodyWrapper.removeClass('nav-expanded-overlay').removeClass('scroll-lock');
}
function peekNav(){
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */  
  var prevScrollPos = window.pageYOffset,
      noticeHeight = 0;
  /* if user hasn't closed their alert, give it time to animate in before triggering peek nav */      
  if (peekDelay!=="on" && FM.form.getCookie("corpAlert") != "true") {
    peekDelay = "on";
    var peekTime = setTimeout(function(){peekNav()}, 600);
  }
  else {
    $(window).on('scroll resize orientationchange pageshow', function(){        
      noticeHeight = notice.length && notice.css('display') !== 'none' ? notice.outerHeight() : 0;  
      if(noticeHeight <= 10) {
        var navHeight = headerNavContent.outerHeight(), 
        navRem = navHeight/16+"rem",      
        intent = $("html").attr("data-whatintent"),
        currentScrollPos = window.pageYOffset;   
        if(currentScrollPos>20){
          var $dropsOpen = $('#top-nav').find('.top-nav-nested').filter(":visible");
          if($dropsOpen.length) {
            $dropsOpen.slideUp(200);
          }
        } 
        if(!headerNavContent.hasClass("downscroll") && currentScrollPos > navHeight){ 
          headerNavContent.addClass("downscroll");
        }
        if (prevScrollPos < currentScrollPos && headerNav.hasClass("position-fixed")){  
          peekCloseTimer = setTimeout(function(){
            headerNav.removeClass("position-fixed");
            navFiller.css({"height": 0});
          }, 200); 
        }
        if (prevScrollPos > currentScrollPos && intent !== "keyboard" && currentScrollPos > 2) {
          clearTimeout(peekCloseTimer);
          if(!headerNav.hasClass("position-fixed")){
            headerNav.addClass("position-fixed");
            navFiller.css({"height": navRem});
          } 
          headerNavContent.filter(".downscroll").removeClass("downscroll");
        }
        if(currentScrollPos <= 2){
          resetPeekNav();
        }
        prevScrollPos = currentScrollPos;
      }    
    });
  }  
}
function altRibbon(){
  $("#ribbon-rbo-section").on("touchstart.zf.dropdownMenu mouseleave", function(){ 
    var $t = $(".ribbon-rbo-toggle"); 
    if($t.hasClass("is-active")){
      $t.children('a').trigger('click');
    }
  });
  $("#ribbon-sf-section").on("touchstart.zf.dropdownMenu mouseleave", function(){ 
    var $t = $(".ribbon-sf-toggle"); 
    if($t.hasClass("is-active")){
      $t.children('a').trigger('click'); 
    }
  });
  $("#mobile-ribbon-trigger").on("click", function(){
    if(notice.length && notice.css('display') !== 'none'){
      notice.slideUp();
    }
    if(!$('#ribbon-nav').hasClass("is-mobile-expanded")){
      bodyWrapper.addClass('scroll-lock');
    } 
    else {
      bodyWrapper.removeClass('scroll-lock');
    }
  });
}
if($('#header-nav').length){
  var subNav = $('.sub-nav'),
    navItems = $('.main-nav-item'),
    dropDownWrapper = $('.dropdown-wrapper'),
    logoImg = $('.header-logo a'),
    bodyWrapper = $('#body-wrapper'),
    mobileTopSubNav = $('#mobile-top-sub-nav'), // ribbon
    mobileNav = $('#mobile-main-nav'),
    mobileSearchButton = $('#mobile-search-btn'),
    mobileSearchSubNav = $('#mobile-search-sub-nav'),
    headerNav = $('#header-nav'),
    headerNavContent = $('#header-nav-content'),
    navFiller = $('.head-fill'),
    notice = $('#mf-alert'),
    peekCloseTimer,
    subNavTimer,
    bgDropdownTimer,
    peekDelay = "off";
  mobileTopNavAnimate();  
  topNavAnimation();
  navDropDownAnimate();
  onMobileToggle();
  resetMobileDrillDown();
  resetNav();
  AddTopNavTouch();
  trapDropNavFocus();
  trapMobileNavFocus();
  focusSearch();
  peekNav();  
  altRibbon();
}

  
