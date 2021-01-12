// @ts-nocheck
// code for the 4 share links -- prefer simple over pullin in an API.
var shareLinkDecode = function(value){
  return $("<div/>").html(value).text();
},
shareLinkUpdate1 = function(){
var winProps = 'channelmode=no,directories=no,fullscreen=no,location=no,status=no,toolbar=no,modal=yes,alwaysRaised=yes,resizable=yes',
    lnk = $('meta[property="og:url"]').length && $('meta[property="og:url"]:first').attr('content').length ? $('meta[property="og:url"]:first').attr('content') : encodeURIComponent(location),
    title1= $('meta[property="og:title"]').length && $('meta[property="og:title"]:first').attr('content').length ? $('meta[property="og:title"]:first').attr('content') : document.title,
    title = encodeURIComponent(shareLinkDecode(title1)),
    img = $('meta[property="og:image"]').length && $('meta[property="og:image"]:first').attr('content').length ? $('meta[property="og:image"]:first').attr('content') : '',
    sum1 = $('meta[property="og:description"]').length && $('meta[property="og:description"]:first').attr('content').length ? shareLinkDecode($('meta[property="og:description"]:first').attr('content')) : '',
    summary = encodeURIComponent(sum1),
    fblink = 'https://www.facebook.com/sharer/sharer.php?u='+lnk + location.search,
    lilink = 'https://www.linkedin.com/shareArticle?mini=true&url='+lnk+'&title='+title+'&source='+lnk+'&summary='+summary,
    mtlink = 'mailto:?body=You%20might%20be%20interested%20in%20this%20article.%20'+title+':%20'+summary+'%20'+lnk+'&Subject='+title,
    twlink = 'https://twitter.com/intent/tweet/?text='+title+'&url='+lnk+location.search+'&via=freddiemac';

$('.social-mailto').each(function(){
  $(this).attr('href',mtlink); 
});
$('.social-facebook').each(function(){ 
  $(this).attr('href', 'javascript:void(0);').on('click', function(e){ 
    var sharer_modal = window.open(fblink, "_blank", winProps + ',width=600,height=500', true); 
    sharer_modal.opener=null;
  });	
});
$('.social-linkedin').each(function(){ 
  $(this).attr('href', 'javascript:void(0);').on('click', function(e){  
    var sharer_modal = window.open(lilink, "_blank", winProps + ',width=800,height=600', true); 
    sharer_modal.opener=null;
  });	
});
$('.social-twitter').each(function(){ 
  $(this).attr('href', 'javascript:void(0);').on('click', function(e){ 
    var sharer_modal = window.open(twlink, "_blank", winProps + ',width=500,height=500', true); 
    sharer_modal.opener=null;
  });
});	
};

$(function(){  
$(".share-widget").filter('.hide').removeClass('hide');
if($(".share-widget").length){ shareLinkUpdate1(); }
});
