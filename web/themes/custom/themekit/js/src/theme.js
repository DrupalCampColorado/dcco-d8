/**
 * theme.js
 * Entry point for all theme related js.
 */
import './foundation-setup';
import './skip-link';
import './inject-svg';
import vidkit from "./jquery.vidKit";
const $ = jQuery;

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
  const bgVideo = new vidkit($(".paragraph--type--compound-banner .video-container"), opts);
});
