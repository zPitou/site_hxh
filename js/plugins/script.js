window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById("video-back");
  const intervalo = 79; 
  const volumeBar = document.getElementById('volumeBar');
  const soundToggle = document.getElementById('soundToggle');

  const savedVolume = 0
  let lastVolume = savedVolume;

  video.volume = savedVolume;
  video.muted = savedVolume === 0;

  volumeBar.value = savedVolume;
  soundToggle.textContent = video.muted ? '🔇' : '🔊';

  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= intervalo) {
      video.currentTime = 0;
      video.play();
    }
  });

  volumeBar.addEventListener('input', () => {
    const newVolume = parseFloat(volumeBar.value);
    video.volume = newVolume;
    video.muted = newVolume === 0;
    soundToggle.textContent = video.muted ? '🔇' : '🔊';

    localStorage.setItem('videoVolume', newVolume);

    if (newVolume > 0) {
      lastVolume = newVolume;
    }
  });

  soundToggle.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      video.volume = lastVolume;
      volumeBar.value = lastVolume;
    } else {
      video.muted = true;
      lastVolume = video.volume;
      video.volume = 0;
      volumeBar.value = 0;
    }

    soundToggle.textContent = video.muted ? '🔇' : '🔊';
    localStorage.setItem('videoVolume', video.volume);
  });
});


$(document).ready(function () {
    $("#banners ul").bxSlider({
        auto: true,
        speed: 1000,
        // mode: 'fade'
        // pager: false
    });

    $('.galeria').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });
});