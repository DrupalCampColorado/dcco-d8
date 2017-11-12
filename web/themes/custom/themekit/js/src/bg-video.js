import vidkit from "./jquery.vidKit";
const $ = jQuery;

let vidLoaded = false;
const $vidWrapper = $(".paragraph--type--compound-banner .video-container");
let opts = {
  videoUrl: 'https://www.youtube.com/watch?v=M-aytlS3gwQ',
  videoType: 'youtube',
  aspectRatio: 1.33333, // 16:9
  autoplay: 1,
  loop: 1,
  controls: 0,
  backgroundSize: 'cover', // Same as css background-size: cover;
  verticalAlign: 'middle'
};

$(window).on('load', () => {
  if (window.matchMedia("(min-width: 640px)").matches) {
    vidLoaded = true;
    const bgVideo = new vidkit($vidWrapper, opts);
  }
});

$(window).on('resize', () => {
  if (!vidLoaded && window.matchMedia("(min-width: 639px)").matches) {
    vidLoaded = true;
    const bgVideo = new vidkit($vidWrapper, opts);
  }
});
