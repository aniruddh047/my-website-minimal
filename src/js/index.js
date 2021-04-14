import $ from "jquery";
$(document).ready(main);

function main() {
  const year = (new Date()).getFullYear().toString()
  $('#copyright-year').append(year);
  $(".js-header-btn").on("click", handleNavClick);
  checkWidth();
  $('#js-prev-card').on('click', navigateCards);
  $('#js-next-card').on('click', navigateCards);
}

function handleNavClick(e) {
  var d = document.querySelector('.mdl-layout');
  d.MaterialLayout.toggleDrawer();
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

function navigateCards(e) {
  const activeCard = $('.skill-card.active');

  if(e.currentTarget.id === 'js-next-card') {
    $('#js-prev-card').removeClass('hide-btn');
    const nextCard = activeCard.next('.skill-card');
    // check if there is a card available next
    if(nextCard.length > 0) {
      activeCard.toggleClass('active');
      nextCard.toggleClass('active');
    }
  } else if(e.currentTarget.id === 'js-prev-card') {
    $('#js-next-card').removeClass('hide-btn');
    const prevCard = activeCard.prev('.skill-card');
    // check if there is a card available before this card
    if(prevCard.length > 0) {
      activeCard.toggleClass('active');
      prevCard.toggleClass('active');
    } 
  }
  hideNavBtns();
}

function hideNavBtns (){
  const activeCard = $('.skill-card.active');
  if(activeCard.is('#skill-card4')) {
    // hide the next nav button when end of card list is reached 
    $('#js-next-card').addClass('hide-btn');
  }
  else if(activeCard.is('#skill-card1')) {
    // hide the prev nav button when start of card list is reached
    $('#js-prev-card').addClass('hide-btn');
  }
}