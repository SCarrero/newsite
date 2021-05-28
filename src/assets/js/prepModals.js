// @ts-nocheck
// prep modals to add close button, prev/next nav, video markup, etc.
// basically make it so devs can build these with less effort.
function closestBlockParent(item) {
  $(item).parents().each(function(){
    if ($(this).css('display') == 'block') {
        return $(this);
    }
  });  
}

//  prep content for modals by adding buttons
function preReveal() {
  $(".reveal[id][data-reveal]").not('.overlay-video').each(function(){
    var  obj = $(this), 
    i = obj.attr('id'),
    svgClose = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.39 167.39"><path fill="#fff" d="M83.7 0a83.7 83.7 0 1 0 83.7 83.7A83.7 83.7 0 0 0 83.7 0zm42.67 127.06a6.13 6.13 0 0 1-8.67-.07l-34-34.55L49.69 127a6.13 6.13 0 1 1-8.74-8.6L75.1 83.7 41 49a6.13 6.13 0 1 1 8.74-8.6L83.7 75l34-34.55a6.13 6.13 0 1 1 8.74 8.6L92.29 83.7l34.14 34.69a6.13 6.13 0 0 1-.06 8.67z"/></svg>',    
    btnClose = $("<button />",{
    "class": "close-button",
    "aria-label": "Close modal",
    "data-close": "",
    "type": "button",
    "html": "<span aria-hidden='true'>"+svgClose+"</span>"
    });
    if($(this).filter('.overlay-image, .overlay-gallery').length){  
      obj.find('img:first').after(btnClose); 
      $('a[data-open="'+i+'"][href]').on("click",function(e){ e.preventDefault(); }); 
      obj.find('.modal-content').on("click",function(){ obj.foundation('close'); });
    }
    else {
      obj.find('.modal-header:first').append(btnClose);
    }
    obj.not('.overlay-gallery').attr('data-animation-in', "scale-in-up").attr('data-animation-out', "scale-out-down").addClass('fast');
  }); 
}

function preRevealGallery() {
  var galleryRel = [];
  $(".reveal[id][data-reveal]").filter('.overlay-gallery[rel]').each(function(){
    var rel=$(this).attr('rel');
    if ($.inArray(rel,galleryRel) < 0){galleryRel.push(rel);}
  });
  while (galleryRel.length > 0) {
    var $r = galleryRel.shift(), galleryCount = $(".reveal[id][data-reveal]").filter("[rel=" + $r + "]").length;
    $(".reveal[id][data-reveal]").filter("[rel=" + $r + "]").each(function(x){ 
      var  obj = $(this), 
      prevItem = (x == 0) ? (galleryCount - 1) : (x - 1),
      nextItem = (x == galleryCount - 1) ? 0 : (x + 1),
      prevID = $("[rel=" + $r + "]").eq(prevItem).attr('id'),
      nextID = $("[rel=" + $r + "]").eq(nextItem).attr('id'),
      btnPrev = $("<button />",{
        "class": "orbit-previous",
        "data-open": prevID,
        "type": "button",
        "html": '<span class="show-for-sr">previous slide</span><svg aria-hidden="true" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="14 14 22 22"><path d="M27.3 34.7L17.6 25l9.7-9.7 1.4 1.4-8.3 8.3 8.3 8.3z"/></svg>'
      }),
      btnNext = $("<button />",{
        "class": "orbit-next",
        "data-open": nextID,
        "type": "button",
        "html": '<span class="show-for-sr">next slide</span><svg aria-hidden="true" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="14 14 22 22"><path d="M22.7 34.7l-1.4-1.4 8.3-8.3-8.3-8.3 1.4-1.4 9.7 9.7z"/></svg>'
      });
      obj.find('figure').append(btnNext, btnPrev);
      obj.attr('data-animation-in', "fade-in").attr('data-animation-out', "fade-out").addClass('fast');
    });
  }   
}
function preRevealVideo() {  
  var w = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth; 
  if (w <= 450) { return; }
  var svgClose = '<svg class="slow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.39 167.39"><path fill="#fff" d="M83.7 0a83.7 83.7 0 1 0 83.7 83.7A83.7 83.7 0 0 0 83.7 0zm42.67 127.06a6.13 6.13 0 0 1-8.67-.07l-34-34.55L49.69 127a6.13 6.13 0 1 1-8.74-8.6L75.1 83.7 41 49a6.13 6.13 0 1 1 8.74-8.6L83.7 75l34-34.55a6.13 6.13 0 1 1 8.74 8.6L92.29 83.7l34.14 34.69a6.13 6.13 0 0 1-.06 8.67z"/></svg>',    
    btnClose = '<button class="close-button" aria-label="Close modal" data-close type="button"><span aria-hidden="true">'+svgClose+'</span></button>',
    frameAttributes = 'frameborder="0" allowfullscreen allowscriptaccess="always" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"',
    $frameWide = '<iframe id="frameWideYT" src="" '+frameAttributes+'></iframe>',
    $frameStandard = '<iframe id="frameStandardYT" src="" '+frameAttributes+'></iframe>',
    modalWide = $("<div />",{
      "class": "reveal overlay-video fast",
      "data-reveal": "",
      "data-reset-on-close": true,
      "data-deep-link": false,
      "id": "videoWideYT",
      "data-animation-in" : "scale-in-down",
      "data-animation-out" : "scale-out-up",
      "html": btnClose + '<div class="responsive-embed widescreen">'+$frameWide+'</div>'
    }),
    modalStandard = $("<div />",{
      "class": "reveal overlay-video",
      "data-reveal": "",
      "data-reset-on-close": true,
      "data-deep-link": false,
      "id": "videoStandardYT",
      "data-animation-in" : "scale-in-down",
      "data-animation-out" : "scale-out-up",
      "html": btnClose + '<div class="responsive-embed">'+$frameStandard+'</div>'
    });
  if($(".video-modal[data-src]").filter('.widescreen-video').length){
    $('body').prepend(modalWide); 
    $('#videoWideYT').on('closed.zf.reveal', function(){
      $('#frameWideYT').replaceWith($frameWide);
    });
  }
  if($(".video-modal[data-src]").length > $(".video-modal[data-src]").filter('.widescreen-video').length){  
    $('body').prepend(modalStandard); 
    $('#videoStandardYT').on('closed.zf.reveal', function(){
      $('#frameStandardYT').replaceWith($frameStandard);
    });
  }
  $(".video-modal[data-src]").each(function(x){    
    var $lnk = $(this),
      $src = $lnk.attr('data-src'),
      targetId = $lnk.hasClass('widescreen-video') ?  'videoWideYT' : 'videoStandardYT';
    $lnk.attr('data-open', targetId).attr('aria-controls', targetId);         
    $lnk.on("click",function(e){ 
      w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 
      if (w > 450) { 
        e.preventDefault(); 
      }
      if($lnk.hasClass('widescreen-video')) {
        $('#frameWideYT').attr('src', $src+'&autoplay=1&enablejsapi=1');
        $('#frameWideYT').on("click",function(){
          $(this).foundation('close');
        });
      }
      else {
        $('#frameStandardYT').attr('src',$src+'&autoplay=1&enablejsapi=1');
        $('#videoStandardYT').foundation('open').on("click",function(){
          $(this).foundation('close');
        });
      }     
    }); 
      
  });
} 
if($(".reveal").length){ 
  preReveal();
}
if($(".overlay-gallery").length){
  preRevealGallery();
}
if($(".video-modal").length) { 
  preRevealVideo();
}

$(function(){  
  // fix for full reveals not restoring scrollbar on close, may not be needed if fixed by Zurb. Animation takes 250ms
  if($(".reveal").length){ 
    $(window).on('closed.zf.reveal', function() {
        FM.form.resetReveal;
        FM.form.setTimer = setTimeout(FM.form.resetReveal, 400);
    }).on('open.zf.reveal', function() { 
        FM.form.setTimer = setTimeout(FM.form.offsetReveal, 350);  
    }).on('resizeme.zf.trigger', function() { 
        FM.form.setTimer = setTimeout(FM.form.offsetReveal, 300);  
    });
  }
 });