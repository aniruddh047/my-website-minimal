import $ from "jquery";
$(document).ready(main);

function main() {
  // var observer = new IntersectionObserver(callback);
  // $(".animate-src").each(animate);
  // function animate(index, item) {
  //   observer.observe(item);
  // }
  // function callback(entries) {
  //   entries.forEach(entry => {
  //     if (entry.intersectionRatio > 0.7) {
  //       entry.target.classList.add("active-transition");
  //     }
  //   });
  // }
  
  $(".js-header-btn").on("click", handleNavClick);
  checkWidth();
}

function handleNavClick(e) {
  var scrollto = "." + e.currentTarget.getAttribute("data-scrollto");
  $(scrollto)[0].scrollIntoView({ behavior: "smooth" });
}

function checkWidth() {
  var windowsize =  $(window).width();
  if(windowsize < 768) {
    relocateContent();
  }
}

function relocateContent(){
  var tabsContent = $('.mdl-tabs section');
  tabsContent.appendTo('.js-mobile-content')
}
