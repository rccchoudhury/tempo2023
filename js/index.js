window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 7;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}



function bind_videos() {
  $('video').click(function(e) {
    e.stopPropagation();

    if (this.paused) {
      this.play();
      this.style.border = ""
    } else {
      if (!(this.id === "teaser")){
        this.pause();
        this.style.border = "2px solid red";
      }
    }
    var sel = this;

    $('video').each(function() {
      if (!(this.id === "teaser")){
        if (this != sel) { this.pause(); this.currentTime = 0; }
      } 
    });

    $("audio").remove(); $('.snd').removeClass('playing');
  });
}


$(document).ready(function() {

    bind_videos();
  $(document).click(function() {
    $("video").each(function() { 
      if (!(this.id === "teaser")){
        this.pause(); this.currentTime = 0; 
      }
    });
  });

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });


    var options = {
			slidesToScroll: 1,
			slidesToShow: 2.3,
			loop: true,
			infinite: true,
			autoplay: false,
    }
      var options_short = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: false,
      infinite: false,
      autoplay: false,
    }
		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel_long', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    $('.carousel').on('touchstart', function(event){
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).one('touchmove', function(event){
        const xMove = event.originalEvent.touches[0].pageX;
        const sensitivityInPx = 5;

        if( Math.floor(xClick - xMove) > sensitivityInPx ){
            $(this).carousel('next');
        }
        else if( Math.floor(xClick - xMove) < -sensitivityInPx ){
            $(this).carousel('prev');
        }
    });
    $(this).on('touchend', function(){
        $(this).off('touchmove');
    });
});

        var carousels_short = bulmaCarousel.attach('.carousel_short', options_short);


    // Loop on each carousel initialized
    for(var i = 0; i < carousels_short.length; i++) {
      // Add listener to  event
      carousels_short[i].on('before:show', state => {
        console.log(state);
      });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    // $('#interpolation-slider').on('input', function(event) {
    //   setInterpolationImage(this.value);
    // });
    // setInterpolationImage(0);
    // $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    // bulmaSlider.attach();

})
