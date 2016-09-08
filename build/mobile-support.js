    AFRAME.registerComponent('videospheremobile', {
      dependencies: ['material'],
      init: function () {
        var self = this;
        //this.el.sceneEl.addBehavior(this);
        this.videoEl = document.querySelector(this.el.components.material.textureSrc);
        if (!this.videoEl) return;
        if(true){//if (!/android|iphone|ipod|ipad/i.test(navigator.userAgent)) {
          // pc
          this.videoEl.play();
          return;
        } else {
          // mobile
          this.videoEl.pause(); // for simulator
        }
        this.videoEl.setAttribute('webkit-playsinline', true); // for inline playable some iPhone browser.
        
        // change a fullscreen element
        // because fullscreen element is top most (z-Index = 2147483647)
        this.container = document.createElement('div');
        this.container.classList.add('videosphere-splash-container');
        var canvas = this.el.sceneEl.canvas;
        var parentNode = canvas.parentNode;
        parentNode.removeChild(canvas);
        this.container.appendChild(canvas);
        parentNode.appendChild(this.container);
        this.el.sceneEl.canvas = this.container
        canvas = null;
        parentNode = null;


        this.el.sceneEl.canvas.onclick = function () {
          var method = '';
          if (self.videoEl.paused) {
            self.videoEl.play();
            method = 'remove';
          } else {
            self.videoEl.pause();
            method = 'add';
          }
          self.splashes.forEach(function (splash) {
            splash.classList[method]('pause');
            splash.classList.add('videosphere-splash-animation');
            splash.classList.remove('hidden');
          })
        };
        this.splashes = [];
        this.splashes.push(document.createElement('div'));
        var splash = this.splashes[0];
        splash.classList.add('videosphere-splash');
        splash.addEventListener('animationend', function () {
          self.splashes.forEach(function (splash) {
            splash.classList.remove('videosphere-splash-animation');
            splash.classList.add('hidden');
          });
        }, false);
        this.splashes.push(this.splashes[0].cloneNode());
        this.splashes[1].classList.add('right');
        this.container.appendChild(this.splashes[0]);
        this.container.appendChild(this.splashes[1]);

        document.addEventListener("webkitfullscreenchange", function () {
          self.splashes.forEach(function (splash) {
            !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement) && splash.classList.add('vrmode');
          });
        }, false);
      }
    });