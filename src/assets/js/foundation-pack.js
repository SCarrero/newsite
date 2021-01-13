// if this is used, swap template to js-footer-pack

import $ from 'jquery';
import 'what-input';

window.jQuery = $;

/* any settings that need to change prior to foundation getting initialized go here. */
// for example:
// Foundation.Accordion.defaults.allowAllClosed = true;
function getWidth(){
  var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 
  return w;
} 
Foundation.Accordion.defaults.multiExpand = true;
Foundation.Accordion.defaults.allowAllClosed = true;
if (preferReducedMotion()) {
  Foundation.Orbit.defaults.useMUI = false;
}
Foundation.Reveal.defaults.deepLink = true;
Foundation.Reveal.defaults.fullScreen = false;
Foundation.Reveal.defaults.resetOnClose = true;
Foundation.Reveal.defaults.updateHistory = true;
Foundation.Reveal.defaults.vOffset = 0;
// Reveal closeOnEsc and closeOnClick are both true 
// disabling deeplink and update history to prevent bug where other bookmarks in url disable all active tabs
//Foundation.Tabs.defaults.deepLink = true;
//Foundation.Tabs.defaults.updateHistory = true;
//Foundation.Tabs.defaults.deepLinkSmudge = true; 
if (getWidth() > 569) { 
  Foundation.Tabs.defaults.matchHeight = true;
}
Foundation.Abide.defaults.patterns['digits_dashes'] = /^[0-9-]*$/;
Foundation.Abide.defaults.patterns['digits_slashes'] = /^[0-9\/]*$/;
Foundation.Abide.defaults.patterns['YYslashMM'] = /^\d{2}\/(0[1-9]|1[0-2])$/;
Foundation.Abide.defaults.patterns['tel'] = /^\(?\d{3}\)?[\s+|-]?\d{3}[\s+|-]?\d{4}/;
Foundation.Abide.defaults.patterns['ssn'] = /^[0-9]{4}$/;
Foundation.Abide.defaults.patterns['alpha-num-hyphen'] = /^[-A-Za-z0-9 ]+$/;
Foundation.Abide.defaults.patterns['no-unsafe'] = /^[^\[\]{}<>#%^*_+=|\\/~`]+$/;
Foundation.Abide.defaults['validators']['checked_required'] =
  function ($el, required, parent) {
    var group = parent.closest('.checked-group');
    var min = group.attr('data-validator-abide-min') || 1;
    var max = group.attr('data-validator-abide-max') || 9999;
    var checked = group.find(':checked').length;
    if (checked >= min  && checked <= max) {
      group.find('label').filter('.is-invalid-label').removeClass('is-invalid-label');
      group.find('[data-abide-error]').hide();   
      return true;
    } else {
      group.find('label').each(function() { $(this).addClass('is-invalid-label'); });
      group.find('[data-abide-error]').css({ display: 'block' });
      group.find('[data-validator="checked_required"]').siblings('label').addBack().on('click', function(){ 
        group.find('[data-abide-error]').hide().end().find('label').filter('.is-invalid-label').removeClass('is-invalid-label');
      });
      return false;
    }
  };

// If you want to pick and choose which modules to include, comment out "require('foundation-sites');"  
// and  uncomment the line below, and in that file comment ont the plugins you don't need.
// if you swap to the pieces method, a few have already been commented out, to show how it works.
// typically the full bundle is smaller than the pieces, so unless you can live without several components,
// your js will be smaller if you don't go piecemeal. 

import './lib/foundation-explicit-pieces';
