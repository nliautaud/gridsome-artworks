<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" ref="pswp">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          
          <span class="rotation-wrapper">
            <i class="material-icons"
              v-if="options.rotationOn"
              @click="rotate(-90)">
              rotate_left
            </i>
            <i class="material-icons"
              v-if="options.rotationOn"
              @click="rotate(90)">
              rotate_right
            </i>
          </span>
          
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button
          class="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"
          @click="resetAngle"
        ></button>
        <button
          class="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
          @click="resetAngle"
        ></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from "photoswipe/dist/photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
export default {
  props: {
    slides: {
      default: () => ({}),
      type: Array
    },
    options: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      angle: 0
    }
  },
  mounted() {
    // Parse URL and open gallery if it contains #&pid=3&gid=1
    if (this.hash.pid && this.hash.gid == this.id) {
      this.open(this.hash.pid)
    }
  },
  computed: {
    hash: function() {
      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      let hash = window.location.hash.substring(1),
          params = {}
      if (hash.length < 5) return params
        
      let vars = hash.split("&")
      for (let i = 0; i < vars.length; i++) {
        if (!vars[i]) continue
        let pair = vars[i].split("=")
        if (pair.length < 2) continue
        params[pair[0]] = pair[1]
      }
      if (params.gid) params.gid = parseInt(params.gid, 10)
      return params
    }
  },
  methods: {
    closest: function closest(el, fn) {
      // find nearest parent element
      return el && (fn(el) ? el : this.closest(el.parentNode, fn));
    },
    open: function(index, items) {
      this.options.index = index
      if(items) {
        this.options.getThumbBoundsFn = (index) => {
          const rect = items[index].getBoundingClientRect();
          return {
            x: rect.left + (window.scrollX || window.pageXOffset),
            y: rect.top + (window.scrollY || window.pageYOffset),
            w: rect.width
          }
        }
      }

      const photoswipe = new PhotoSwipe(
        this.$refs.pswp,
        PhotoSwipeUI_Default,
        this.slides,
        this.options
      )
      photoswipe.listen('close', () => { this.$emit('close'); })
      photoswipe.init()
    },
    rotate: function(newAngle) {
      this.angle = this.angle + newAngle;
      this.$el
        .querySelectorAll(".pswp__img")
        .forEach(i => (i.style.transform = `rotate(${this.angle}deg)`));
    },
    resetAngle: function() {
      this.angle = 0;
      this.$el
        .querySelectorAll(".pswp__img")
        .forEach(i => (i.style.transform = `rotate(${this.angle}deg)`));
    }
  }
}
</script>

<style>
.pswp__top-bar {
  text-align: right;
}
.pswp__caption__center {
  text-align: center;
}
.rotation-wrapper {
  color: white;
  position: relative;
  top: 10px;
}
</style>