const $ = jQuery;

export default class VidKit {
  constructor($el, opts) {
    if (!opts.videoUrl || !opts.videoType) {
      return;
    }
    this.init(opts, $el);
  }


  init(settings, $base) {
    this.opts = $.extend({
      videoUrl: '',
      videoType: 'youtube',
      elementId: 'bg-video',
      loop: 1,
      autoplay: 1,
      controls: 0,
      aspectRatio: 1.3333333,
      verticalAlign: 'middle',
      backgroundSize: 'cover'
    }, settings);

    this.$base = $($base);
    this.$parent = this.$base.parent();

    this.opts.videoId = this.getVideoId();
    this.playerReady = false;
    this.state = -1;
    this.player = '';

    // Autoplay isn't supported on many mobile devices so we
    // shouldn't even bother with a background video.
    if (typeof Modernizr !== 'undefined' && Modernizr.touchevents) {
      return;
    }

    if (this.opts.videoType === "youtube") {
      this.initYT();
    } else if (this.opts.videoType === "vimeo") {
      this.initVimeo();
    } else {
      throw new Error('The video type is not supported.');
    }

    this.setFluidContainer();
  }

  initYT() {
    let player;
    let inst = this;
    // This code loads the IFrame Player API code asynchronously.
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create container element since YT API can only select elements by id.
    this.$base.prepend('<div id="' + this.opts.elementId + '" />');

    // This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player(inst.opts.elementId, {
        width: '100%',
        height: '100%',
        videoId: inst.opts.videoId,
        playerVars: {
          'autoplay': inst.opts.autoplay,
          'controls': inst.opts.controls,
          'showinfo': 0,
          'rel' : 0,
          'modestbranding': 1,
          'wmode': 'transparent',
          'relatedvideos': 0
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    // The API will call this function when the video player is ready.
    window.onPlayerReady = function(event) {
      inst.player = event.target;

      if (inst.opts.autoplay === 1) {
        event.target.playVideo();
        inst.$base.trigger('vidKit.playing');
      } else {
        inst.$base.addClass('loaded');
      }

      player.setVolume(0);

      let $vidKit = $(player.getIframe());
      let styles = {
        position: 'absolute',
        left: '0',
        top: '0'
      };

      if (player.getPlayerState(0)) {
        $vidKit.css(styles);
      }
      $vidKit.attr('tabindex', '-1');
      inst.playerReady = true;
      inst.$base.trigger('vidKit.ready');
    };

    window.onPlayerStateChange = function(state) {
      inst.state = state.data;
      if (state.data === 0) { // ended
        player.seekTo(0); // restart
        inst.$base.trigger('vidKit.ended')
      } else if (state.data === 1) { // playing
        inst.$base.trigger('vidKit.playing');
        inst.$base.addClass('loaded');
      }
    };
  }


  play() {
    if (this.playerReady) {
      this.player.playVideo();
    }
  }

  pause() {
    if (this.playerReady && this.state === 1) {
      this.player.pauseVideo();
    }
  }

  stop() {
    if (this.playerReady) {
      this.player.stopVideo();
    }
  }

  seekTo(seconds) {
    if (this.playerReady) {
      seconds = seconds || 0;
      this.player.seekTo(seconds);
    }
  }


  initVimeo() {
    let player,
      tag,
      firstScriptTag,
      $iframe;
    let inst = this;
    let width = Math.ceil(inst.$parent.width());
    let height = Math.ceil(width / inst.opts.aspectRatio);
    let src = '//player.vimeo.com/video/' + inst.opts.videoId + '?';
    let params = {
      api: 1,
      title: 0,
      byline: 0,
      width: width,
      height: height,
      loop: inst.opts.loop,
      autoplay: inst.opts.autoplay,
      badge: 0
    };

    $.each(params, function(key, val) {
      src = src + key + '=' + val + '&amp;';
    });

    // Remove last ampersand.
    src = src.slice(0, src.lastIndexOf('&amp;'));

    $iframe = $('<iframe />', {
      src: src,
      frameborder: 0,
      width: '100%',
      height: '100%'
    });

    tag = document.createElement('script');
    tag.setAttribute('id', 'froogaloop2');

    tag.src = "https://f.vimeocdn.com/js/froogaloop2.min.js";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    inst.$base.prepend($iframe);

    $('#froogaloop2').load(function() {
      player = $f($iframe[0]);

      player.addEvent('ready', function() {
        player.api('setVolume', 0);
      });
    });
  }

  setFluidContainer() {
    let inst = this;
    let $video = inst.$base;
    let $parent = inst.$parent;
    let styles = {
      left: '50%',
      transform: 'translateX(-50%)'
    };

    if (inst.opts.verticalAlign === 'middle') {
      styles.top = '50%';
      styles.transform += ' translateY(-50%)';
    } else if (inst.opts.verticalAlign === 'bottom') {
      styles.bottom = '0';
    } else {
      styles.top = '0';
    }

    $video.css(styles);

    $(window).resize(function() {
      let elWidth = $parent.outerWidth();
      let elHeight = $parent.outerHeight();

      if (inst.opts.backgroundSize === 'cover') {
        setWidth($video, elWidth, inst.opts.aspectRatio);

        if ($video.height() <= elHeight) {
          setHeight($video, elHeight, inst.opts.aspectRatio);
        }
      } else if (inst.opts.backgroundSize === 'contain') {
        setWidth($video, elWidth, inst.opts.aspectRatio);

        if ($video.height() >= elHeight) {
          setHeight($video, elHeight, inst.opts.aspectRatio);
        }
      } else if (inst.opts.backgroundSize === '100%') {
        setWidth($video, elWidth, inst.opts.aspectRatio);
      } else {
        console.log('Please specify a valid backgroundSize option.');
      }

    }).trigger('resize');
  }

  getVideoId() {
    let index, id;
    let url = this.opts.videoUrl;

    // Remove trailing slash if one exists.
    if (url.charAt(url.length - 1) === '/') url.slice(0, -1);

    // Save the url globally now that we cleaned it up.
    this.opts.videoUrl = url;

    if (this.opts.videoType === 'youtube') {
      index = url.indexOf('v=');
      if (index > -1) {
        id = url.slice(index + 2);
      } else {
        id = url.slice(url.lastIndexOf('/'));
      }
    } else if (this.opts.videoType === 'vimeo') {
      id = url.slice(url.lastIndexOf('/') + 1);
    }
    return id;
  };
}

function setWidth($el, width, ratio) {
  $el.width(Math.ceil(width));
  $el.height(Math.ceil(width / ratio));
}

function setHeight($el, height, ratio) {
  $el.height(Math.ceil(height));
  $el.width(Math.ceil(height * ratio));
}

