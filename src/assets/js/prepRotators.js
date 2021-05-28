// @ts-nocheck
// prep content for Rotators using Orbit
//automate insertion of Close Buttons, nav buttons, and active item highlighting
function orbBulletMarkup(container, slClass){
  var orbBullets = '';
  container.find('.'+slClass).each(function(i){    
    orbBullets += '<button type="button" data-slide="' + i + '"><span class="show-for-sr">slide '+ (i+1) + '</span></button>';  
  }); 
  return orbBullets;
}
// my attempt to duplicate the height logic and reset it as needed
function recalcOrbit() {
  $('.orbit').each(function(x) {
    var max = 0, temp, counter = 0, 
    orb = $(this),    
    slideClass = orb.attr('data-slide-class') || "orbit-slide",
    orbContainerClass = orb.attr('data-container-class') || "orbit-container",
    $wrapper = orb.find('.'+orbContainerClass),
    $slides = orb.find('.'+slideClass);
    $wrapper.css({'height': 'auto'}); 
    $slides.each(function() {
      temp = this.getBoundingClientRect().height;
      $(this).attr('data-slide', counter);
      if ($slides.filter('.is-active')[0] !== $slides.eq(counter)[0]) {
        $(this).css({'position': 'relative', 'display': 'none'});
      }
      max = temp > max ? temp : max;
      counter++;
    });
    if (counter === $slides.length) {
      $wrapper.css({'height': max + 'px'}); 
    }
  })  
}

function preOrbit() {  
  $('.orbit').each(function(x) {
    var orb = $(this), 
    useBullets = orb.attr('data-bullets') || "true",
    useButtons = orb.attr('data-nav-buttons') || "true", 
    buttonParentClass = orb.attr('data-nav-parent-class') || 'orbit',
    bulletBox = orb.attr('data-box-of-bullets') || "orbit-bullets",
    slideClass = orb.attr('data-slide-class') || "orbit-slide",
    orbContainerClass = orb.attr('data-container-class') || "orbit-container",
    nextBtnClass = orb.attr('data-next-class') ? "orbit-next " + orb.attr('data-next-class') : "orbit-next",
    prevBtnClass = orb.attr('data-prev-class') ? "orbit-previous " + orb.attr('data-prev-class') : "orbit-previous",
    orbContainer = orb.find('.'+orbContainerClass+':first'),
    orbSlides = orbContainer.children('.'+slideClass),
    useOverlay = orb.hasClass('bullets-overlay'),
    activeSlide = 0,
    automateNav = orb.attr('data-automate-nav') || "true",
    btnPrev = $("<button />",{
      "class": prevBtnClass,
      "type": 'button',
      "html": '<span class="show-for-sr">previous slide</span><svg aria-hidden="true" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9	c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/></svg>'
    }),
    btnNext = $("<button />",{
      "class": nextBtnClass,
      "type": 'button',
      "html": '<span class="show-for-sr">next slide</span><svg aria-hidden="true" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/></svg>'
    }),
    orbControls = $("<div />", { "class": "orbit-controls" }),    
    orbBulletContainer = $("<nav />", {
      "class": bulletBox + " orbit-bullets",
      "html" : orbBulletMarkup(orbContainer, slideClass)
    });    
    if (orbSlides.length<1){ 
      return;
    }    
    if (automateNav=="true"){      
      if (useOverlay || useButtons=="true" || useBullets=="true"){
        if(buttonParentClass=='orbit'){
          orb.append(orbControls);
        }
        else if(orb.find('.'+buttonParentClass).length>0){
          orb.find('.'+buttonParentClass+':first').append(orbControls);
        }
      }
      if (useBullets=="true") {   
        if(useOverlay && orb.find('.orbit-controls').length){
          orb.find('.orbit-controls').eq(0).append(orbBulletContainer);
        }
        else {
          orb.append(orbBulletContainer);
        }
      }
      if(useButtons=="true") { 
        orb.find('.orbit-controls').eq(0).prepend(btnPrev).append(btnNext);      
      }
    }
    if (orbSlides.filter('.is-active').length<1){ 
        orbSlides.eq(0).addClass('is-active');
    }
    activeSlide = orbSlides.filter('.is-active').index();
    orb.find('.orbit-bullets').children('button').eq(activeSlide).addClass('is-active');
  });
}

if($(".orbit").length){ 
  preOrbit();
  var orbitTimer=0;
  $(window).on('resize', function() {   
    clearTimeout(orbitTimer);
    orbitTimer = setTimeout(recalcOrbit, 300);  
  });  
}
