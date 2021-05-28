// @ts-nocheck
// functionality for notification bar cookie
// made more generic to support us past Covid era
//Notification
if (FM.form.getCookie("mfAlert") != "true") {
  Foundation.Motion.animateIn($(".notification"), 'slide-in-down');
  $("#corp-alert .close-button").on("click", function () {
    document.cookie = "mfAlert=true;path=/;expires=0";
  });
}