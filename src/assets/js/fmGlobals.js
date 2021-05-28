// @ts-nocheck
var FM=FM || {},
QueryParam={},
captchaonloadCallback = function(){
  if($("#form-submit").attr('disabled')){
  }
  else{
    $("#form-submit").attr("disabled","disabled");
    grecaptcha.reset();
  }
  grecaptcha.render('recaptcha', {
    'sitekey' : '6LemIFwUAAAAAFGv',
    'callback' : checkResponse,
    'expired-callback' : captchaonloadCallback
  });
},
checkResponse = function(response){
  $.post("/cgi-bin/captcha/captcha.cgi" , { token: response }, function( data ) {
    if(data.success){
      $("#form-submit").removeAttr('disabled');
    }
    else{
      alert("Validation failed, please try again!");
    }
  }, "json");
};
FM.form = {  						
  domain : 'https://mf.freddiemac.com',	
  protocol : location.protocol, 			// returns http:
  hostname : location.hostname, 			// returns www.fm.com no port)
  pathname : location.pathname, 			// returns /test/test.htm
  pathElements: location.pathname.replace(/^\//,'').split("/"),   // returns array of path sections 
  hash : location.hash, 					// returns #part2 
  href : location.href, 					// returns http://www.fm.com/test.htm#part2
  querystr : location.search, 			// returns ?f=try&g=it if URL is: http://fm.com/js/aa.cgi?f=try&g=it
  referrer:  document.referrer,          // returns referring page, if available
  fmTimer:0,
  QueryPairs : location.search.replace(/^\?/,'').split(/\&/),
  setCookie: function (a,b,c,d){b||(b="");if(!c||isNaN(c))c=.5;d||(d="/");var e=new Date;e.setTime(e.getTime()+c*24*60*60*1e3),e=e.toGMTString(),a&&(document.cookie=a+"="+b+";expires="+e+";path="+d)},
  getCookie:	function (a){var b=new RegExp(a+"=[^;]+","i");return a&&document.cookie.match(b)?document.cookie.match(b)[0].split("=")[1]:""},
  deleteCookie: function (a,b){b||(b="/"),FM.form.getCookie(a)!==""&&FM.form.setCookie(a,"","-1",b)},
  limitText: function(a,b,m) {var v=$(a).val(),l=v.length,n=m-l,r=n==1?n+' char':n+' chars'; if(l>m){$(a).val(v.substring(0,m));}else {$(b).html(r);}},
  trimWhiteSpace: function(v){v = v.replace(/^\s+/,'');v = v.replace(/\s+$/,'');return v.replace(/\s{2,}/g,' ');},
  useOmni: false,
  toggleClick:function(){var f=arguments;return this.each(function(){var it=0;$(this).on("click",function(){f[it].apply(this, arguments);it=(it+1) % f.length;});})},
  setTimer: function(routine,delay) { if(routine && delay>0){ clearTimeout(FM.form.fmTimer); FM.form.fmTimer = setTimeout(routine, delay);}},
  resetReveal: function(){if ($('.reveal:visible').length === 0) {$('.is-reveal-open').removeClass('is-reveal-open');}},
  offsetReveal: function(){var rev = $(".reveal[aria-hidden='false']").filter('.full');  if(rev.length){ rev.css('top', '0px');}},
  cta: function(a,b){if(typeof dataLayer != 'undefined'){a||(a="");b||(b="");dataLayer.push({'event':'ctaClick','ctaType':a,'parentComponentName':b});}},
  isInViewport: function(el){if (el.getBoundingClientRect){var r = el.getBoundingClientRect(),h=r.height/2;return (r.bottom-h >= 0 && r.top+h <= (window.innerHeight || document.documentElement.clientHeight));}else {return true;}},
  animOnce: function(){var l = document.querySelectorAll('.animate-once');if(Foundation.MediaQuery.atLeast('large')){for (var i = 0; i < l.length; i++) {if (FM.form.isInViewport(l[i])) {l[i].classList.remove('animate-once');}}}}
};
for (var x in FM.form.QueryPairs) {
  QueryParam[decodeURIComponent(FM.form.QueryPairs[x].split('=')[0] || "")] = decodeURIComponent(FM.form.QueryPairs[x].split('=')[1] || "");
};

$("input[type='text'],input[type='search'],input[type='email']").on('change',
  function(){var v = $(this).val();$(this).val(FM.form.trimWhiteSpace(v));
});

// process offsite
$('[href]').filter('.offsite, [rel="external"]').each(function(){
  var x = $(this)[0].hasAttribute('rel') ? $(this).attr('rel') : '',  y = x!=='' ? 'noopener noreferrer '+x : 'noopener noreferrer';	
  $(this).attr('target','_blank').attr('rel',y); 
  
});

// process file markers
if (FM.form.pathElements[0] !== "search") { 
	$(".iw_section:gt(0)").find("a[href]").not('.plain').not(":has(img)").not(":has(.callout)").not(":has(.card)").not(function(){
    return (/.+\.(html?|#|javascript)(\?.*)?(#.*)?$/i).test($(this).attr('href'));
  }).filter(function(){
    return (/.+\.(pdf|zip|csv|doc|xls|ppt)[mx]?(\?.*)?(#.*)?$/i).test($(this).attr('href'));
  }).each(function(){ 
    var h=$(this).attr('href').toLowerCase().replace(/.+\.(pdf|zip|csv|doc|xls|ppt)[mx]?(\?.*)?(#.*)?$/, "$1"); 
    if ($(this).is('.button')&& h.length) { $(this).append(" <span class='icon-file'>"+h+"</span>") }     
    else if($(this).closest('.data-filterable').length==0) { $(this).append(" <span class='icon-file'>"+h+"</span>"); }
  });
} 
if($('.animate-once').length){
  FM.form.animOnce;
  window.addEventListener('load', FM.form.animOnce, false);
  window.addEventListener('scroll', FM.form.animOnce, false);
  window.addEventListener('resize', FM.form.animOnce, false);
  window.addEventListener('orientationchange', FM.form.animOnce, false);
  window.addEventListener('touchmove', FM.form.animOnce, false);
  window.addEventListener('pageshow', FM.form.animOnce, false);
  window.addEventListener('wheel', FM.form.animOnce, false);
  window.addEventListener('charCode', function(e){
  var x = e.charCode || e.keyCode;
  if(33 >= e.which >= 36 || e.which == 9){  // run on home, end, page down, page up, and tab keyboard interactions
    FM.form.animOnce;
  }
}, false);
}