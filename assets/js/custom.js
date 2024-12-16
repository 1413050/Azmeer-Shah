


function whereIs($element) {
  /* Is element visible in viewport? Return "b" if before, "v" if visible, and "a" if after */
  const rect = $element[0].getBoundingClientRect();
  if (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= ($(window).height() || $(document).height()) &&
    rect.right <= ($(window).width() || $(document).width())
  )
    return "v"; // Visible
  if (rect.top < 0 || rect.left < 0) return "b"; // Before
  return "a"; // After
}

function loadBars() {
  let $imgs = $("main img"); // All main images
  let $bar_before = $("#bar_before ul");
  let $bar_after = $("#bar_after ul");

  $imgs.each(function () {
    let $img = $(this);
    let where_is = whereIs($img);

    /* Append HTML of image to bars */
    $bar_before.append(
      `<li ${where_is === "b" ? "" : "class='hidden'"} id="bb_${$img.attr(
        "id"
      )}"> <a href="#${$img.attr("id")}"><img src="${$img.attr(
        "src"
      )}" alt="${$img.attr("alt")}" /></a></li>`
    ); // Add class as hidden if is not before

    $bar_after.append(
      `<li ${where_is === "a" ? "" : "class='hidden'"} id="ba_${$img.attr(
        "id"
      )}"> <a href="#${$img.attr("id")}"><img src="${$img.attr(
        "src"
      )}" alt="${$img.attr("alt")}" /></a></li>`
    );
  });
}

$(window).on("load", loadBars); // Load bars on page load

window.refreshBars =function refreshBars() {
  let $imgs = $("main img"); // All main images

  /* For each img */
  $imgs.each(function () {
    let $img = $(this);
    let where_is = whereIs($img);

    /* Change class of images if needed */
    $(`#bb_${$img.attr("id")}`).attr("class", where_is === "b" ? "" : "hidden"); // Visible if before current - show on *before* bar

    $(`#ba_${$img.attr("id")}`).attr("class", where_is === "a" ? "" : "hidden"); // Visible if after current - show on *after* bar
  });
}

$("main#bar_scroll").on("scroll", refreshBars);

$(document).ready(function () {
  const $links = $(".nav-link");
  const $indicator = $(".indicator");
  const sections = {
    work: $("#work"),
    resume: $("#resume"),
    skills: $("#skills"),
  };

  $links.on("click", function (event) {
    event.preventDefault();

    // Remove active class from all links
    $links.removeClass("active");

    // Add active class to the clicked link
    $(this).addClass("active");

    // Move the indicator
    const linkIndex = $links.index(this);
    let indicatorTop;

    // Check if the clicked link is the last one
    if (linkIndex === $links.length - 1) {
      indicatorTop = 24 + linkIndex * 19.5 + "%"; // Last link calculation
    } else {
      indicatorTop = 24 + linkIndex * 19 + "%"; // Other links calculation
    }

    $indicator.css("top", indicatorTop);

    // Get the href attribute value without the '#' character
    const sectionId = $(this).attr("href").substring(1);

    // Translate all sections back to the initial position
    $.each(sections, function (_, $section) {
      $section.css("transform", "translateX(5000px)");
    });

    // Translate the clicked section to 0 position
    sections[sectionId].css("transform", "translateX(0)");

    // Check screen width and remove classes if less than or equal to 660px
    if ($(window).width() <= 660) {
      $(".navbar-toggler").removeClass("active");
      $(".left-panel").removeClass("active");
    }
  });
});

removeFixed = () => {
  $("#work").css("transform", "translateX(0)");
};

$(".skillbar").each(function () {
  $(this)
    .find(".skillbar-bar")
    .animate(
      {
        width: $(this).attr("data-percent"),
      },
      6000
    );
});

$(".circle-skillbar").each(function () {
  var $circle = $(this);
  var degree = 0;
  var targetDegree = parseInt($circle.data("percent"));
  var color = $circle.data("color");
  var $number = $circle.find(".number");

  var interval = setInterval(function () {
    degree += 1;
    if (degree > targetDegree) {
      clearInterval(interval);
      return;
    }

    $circle.css(
      "background",
      `conic-gradient(${color} ${degree}%, #9F9898 0%)`
    );
    $number.html(degree + "<span>%</span>");
    $number.css("color", color);
  }, 50);
});$(document).ready(function() {
  var aboutActive = $(".aboutActive");

  // Function to handle class change
  function handleClassChange() {
      if ($(window).width() <= 660) {
          if (aboutActive.hasClass("active")) {
              $(".right-panel").removeClass("right-panel-mob");
              $(".navbar-toggler").removeClass("active");
              $(".left-panel").removeClass("active");
          }
      }
  }

  // Set up a MutationObserver to monitor class changes on aboutActive element
  var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.attributeName === "class") {
              handleClassChange();
          }
      });
  });

  observer.observe(aboutActive[0], { attributes: true });

  // Optional: Handle window resize to re-check the condition if needed
  $(window).resize(handleClassChange);

  // Initial check
  handleClassChange();
});


$(".navbar-toggler").click(() => {
  $(".navbar-toggler").toggleClass("active");
  $(".left-panel").toggleClass("active");
  $(".right-panel").addClass("right-panel-mob");
});
