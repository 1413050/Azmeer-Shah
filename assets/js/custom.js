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
});

function whereIs(element) {
  /* Is element visible in viewport? Return "b" if before, "v" if visible and "a" if after */
  const rect = element.getBoundingClientRect();
  if (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
    return "v"; // Visible
  if (rect.top < 0 || rect.left < 0) return "b"; // Before
  return "a"; // After
}

function loadBars() {
  let imgs = document.querySelectorAll("main img"); // All main images
  let bar_before = document.querySelector("#bar_before ul");
  let bar_after = document.querySelector("#bar_after ul");
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    let where_is = whereIs(img);
    /* Append HTML of image to bars */
    bar_before.insertAdjacentHTML(
      "beforeend",
      `<li ${where_is == "b" ? "" : "class='hidden'"} id="bb_${
        img.id
      }"> <a href="#${img.id}"><img src="${img.src}" alt="${
        img.alt
      }" /></a></li>`
    ); // Add class as hidden if is not before
    bar_after.insertAdjacentHTML(
      "beforeend",
      `<li ${where_is == "a" ? "" : "class='hidden'"} id="ba_${
        img.id
      }"> <a href="#${img.id}"><img src="${img.src}" alt="${
        img.alt
      }" /></a></li>`
    );
  }
}

window.onload = loadBars; // Load bars on page load

function refreshBars() {
  let imgs = document.querySelectorAll("main img"); // All main images

  /* For each img */
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    let where_is = whereIs(img);

    /* Change class of images if needed */
    document.querySelector(`#bb_${img.id}`).className =
      where_is == "b" ? "" : "hidden"; // Visible if before current - show on *before* bar

    document.querySelector(`#ba_${img.id}`).className =
      where_is == "a" ? "" : "hidden"; // Visible if before current - show on *after* bar
  }
}
$(document).ready(function() {
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
