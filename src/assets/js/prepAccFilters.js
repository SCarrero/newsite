// @ts-nocheck
/*
  author: Sherry Carrero
  plug in to allow users to filter through results in an accordion
*/
(function($) {
  $.fn.filterAccContent = function (options){
	 var accRefresh,
       defaults = {
       refreshRate: 50,
			 dataGP:'.accordion-pointer',
       dataE: '.accordion-item',
       dataL: '.accordion-title',
			 dataP: '.accordion-content',
			 dataC: 'li'
		},
		params = $.extend({}, defaults, options);
		params = $.metadata ? $.extend({}, params, this.metadata()) : params; 
    var 
      $frm = $(this).find('form'),
      $acc = $(this).find(params.dataGP);        
	  postFilter = function (){            
		  $acc.find(params.dataE).each(function(){
				var item = $(this),
            sections = item.find(params.dataP), 
            matches = sections.find(params.dataC).not(".hide").length;
        if(matches > 0) { 
          item.removeClass('hide');
          $acc.foundation('down', sections, true);
				}
				else {
          $acc.foundation('up', sections, false);
          item.addClass('hide'); 
				}
		  });
      toggleExpand();
      return;
		},      
	  postReset = function (){
      $acc.find(params.dataE).each(function(){
        var item = $(this),
            sections = item.find(params.dataP);				
          item.removeClass('hide');
          $acc.foundation('up', sections, false);
		  }); 
      return;
		},
    toggleExpand = function(){     
      if($acc.find(params.dataC).filter('.hide').length || $acc.find(params.dataE).not('.is-active').length) {
        $frm.find('.button-collapse').addClass('hide'); 
        $frm.find('.button-expand').removeClass('hide');
      }
      else {
        $frm.find('.button-expand').addClass('hide');
        $frm.find('.button-collapse').removeClass('hide');                 
      }
    },
		applyFilter = function(){ 
      var topic = $frm.find('[name="filterTopic"]:checked').length ? $frm.find('[name="filterTopic"]:checked').val() : '',
          str = $frm.find('.filter-field').length ? $frm.find('.filter-field').val().trim().replace(/\s+/g, '|') : '',
          patt = new RegExp(str, "i");
      $acc.find(params.dataP).find(params.dataC).each(function(){
        var text = $(this).text();
        if(
           (str.length && patt.test(text) && !topic.length) || 
           (str.length && patt.test(text) && topic.length && $(this).attr('data-topic').match(topic)) || 
           (!str.length && $frm.find('[name="filterTopic"]:checked').length && $(this).attr('data-topic').match(topic))  ||
           (!str.length && !topic.length)
          ){ 
          $(this).removeClass('hide');
        }
        else {
          $(this).addClass('hide');
        }  
      });
      if(str.length || $frm.find('[name="filterTopic"]:checked').length){
        postFilter();
      }
      else {
        toggleExpand();
      }
		},
    checkFilter  = function(evt){
      if($frm.find('.filter-field').length || $frm.find('[name="filterTopic"]:checked').length){
        applyFilter();
      }
    },
    exitFilter = function(evt){
      // console.log('leaving page');
    }; 
    $acc.on("up.zf.accordion", function(){
      // console.log("up triggered");
      toggleExpand();
    }); 
    $acc.on("down.zf.accordion", function(){
     // console.log("down triggered");
      toggleExpand();
    }); 
    $frm.find(".reset-filter").on("click", function(){
      clearTimeout(accRefresh);
      $frm.find('.filter-field').val("");
      accRefresh = setTimeout(applyFilter(), 0);
    });
    $frm.find('.filter-field').on("keyup", function(event){
      if (event.keyCode == 27) { return; } 	
      clearTimeout(accRefresh);
      accRefresh = setTimeout(applyFilter(), params.refreshRate);
    }); 
    $frm.find('[name="filterTopic"]').on("change", function(){
      clearTimeout(accRefresh);
      accRefresh = setTimeout(applyFilter(), 0);
    });
    $frm.find('.button-expand').on("click", function(){
      clearTimeout(accRefresh);   
      $acc.find(params.dataP).find(params.dataC).filter('.hide').removeClass('hide'); 
      $acc.find(params.dataP).filter('.hide').removeClass('hide'); 
      postFilter();
    });  
    $frm.find('.button-collapse').on("click", function(){
      clearTimeout(accRefresh); 
      $acc.find(params.dataE).each(function(){
        $(this).find(params.dataC).filter('.hide').removeClass('hide'); 
        $(this).filter('.hide').removeClass('hide'); 
        $acc.foundation('up', $(this).find(params.dataP), false);        
		  });
      toggleExpand();
    });
    return this;            
  };   
})(jQuery);  


if($('.data-filterable').length) {
  if($('.data-filterable').find('.accordion-pointer').length == $('.data-filterable').find('form').length) { 
    $('.data-filterable').filterAccContent();
    if ("onpagehide" in window) {
        window.addEventListener("pageshow", checkFilter, false);
        window.addEventListener("pagehide", exitFilter, false);
    } else {
        window.addEventListener("load", checkFilter, false);
        window.addEventListener("unload", exitFilter, false);
    }    
  }
}
