var currentZIndex = 1;
$(document).ready(function() {

  $.backstretch("joe-forshaw.jpg", { fade: 500 });

  $("section").height($("nav ul li").outerHeight());

  $("nav ul li").click(function() {
    var $section = getSectionFor($(this));

    if ($("nav ul li").hasClass("changing")) {
      return;
    }

    if ($("nav ul li.open").length > 1 && $(this).hasClass("open")) {
      expandHorizontally($(this), $section, expandVertically);
    } else if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      closeVertically($(this), $section, closeHorizontally);
    } else {
      expandHorizontally($(this), $section, expandVertically);
    }
  });

});

$(window).resize(function() {
  $("nav ul li").not(".open").each(function() {
    getSectionFor($(this)).css("right", $(window).width() - $("nav ul li").width());
  })
});

function expandHorizontally(button, content, callback) {
  $(".backstretch img").animate({"opacity" : 0.1}, 500);
  button.addClass("changing");
  resetSection(button, content);
  content.css({ zIndex : currentZIndex++});
  content.animate({
    right : 0
  }, 500, function() {
    window.setTimeout(function() {
      callMasonry(content);
      callback(button, content);
    }, 300);
  });
}

function expandVertically(button, content) {
  content.animate({
    top    : 0,
    height : "100%"
  }, 500, function() {
    $("nav ul li.open").each(function() {
      $(this).removeClass("open");
      resetSection($(this), getSectionFor($(this)));
    });
    button.addClass("open");
    button.removeClass("changing");
    content.css({ overflow : "auto" });
  });
}

function closeVertically(button, content, callback) {
  button.addClass("changing");
  content.css({ overflow : "hidden" });
  content.animate({
    "top"    : button.position().top,
    "bottom" : button.position().bottom,
    "height" : button.outerHeight()
  }, 500, function() {
    callback(button, content);
  });
}

function closeHorizontally(button, content) {
  content.animate({"right" : $(window).width() - $("nav ul li").width()}, 500);
  $(".backstretch img").animate({"opacity" : 1}, 500, function () {
    button.removeClass("changing");
  });
}

function getSectionFor(button) {
  return $("#" + button.data("section") + "-section")
}

function resetSection(button, content) {
  content.css({
    backgroundColor : button.css("background-color"),
    top             : button.position().top,
    height          : button.outerHeight(),
    right           : $(window).width(),
    display         : "block",
    overflow        : "hidden"
  });
}

function callMasonry(content) {
  console.log(content.attr("id"));
  if (content.attr("id") === "me-section") {
    var container = $('#me-masonry');
    var msnry;
    container.imagesLoaded(function() {
      container.masonry({
        itemSelector: '.item'
      });
    });
  }
}
