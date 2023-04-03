$('.js-anchor').click(function () {
  var elementClick = $(this).attr('href');
  var destination = $(elementClick).offset().top;
  $('html,body').animate({scrollTop: destination - 30}, 1000);
  return false;
});

  