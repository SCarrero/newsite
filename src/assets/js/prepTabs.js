function recalcTabs() {
  $('.tabs[id]').each(function(x) {
    var x = $(this).attr("id");
    if (x.length>1){
      $('#'+x).foundation('_setHeight');
    }
  })  
}

if($(".tabs[id]").length){ 
  var tabTimer=0;
  $(window).on('resize', function() {   
    clearTimeout(tabTimer);
    tabTimer = setTimeout(recalcTabs, 300);  
  }).on('change.zf.tabs', function() { 
    $(window).trigger('resize'); 
  });  
}
