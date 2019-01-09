<template>
  <div class="lazymage"
    :class="['mode-'+mode, {
      loaded: loaded,
      'not-cached': !cached,
      'active-hover': activeHover
    }]"
    :style="{
      paddingTop: !mode ? `${verticalPadding}%` : undefined
    }">
    <VLazyImage class="real"
      :src="src"
      :src-placeholder="srcPlaceholder"
      :width="width"
      :height="height"
      @intersect="intersected = true"
      @load="loaded = true"
      />
    <img class="placeholder"
      :src="cached ? src : srcPlaceholder"
      :style="{
        filter: `blur(${blurLevel}px)`,
        transform: `scale(${scaleRatio})`
      }"/>
    <b-loading class="spinner"
      v-if="!noSpinner && intersected && !loaded && !cached"
      :is-full-page="false"
      active
      :can-cancel="false"
      />
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image"

export default {
  components: {
    VLazyImage
  },
  props: {
    src: String,
    srcPlaceholder: String,
    mode: String,
    activeHover: Boolean,
    noSpinner: Boolean,
    blurLevel: {
      type: Number,
      default: 20
    },
    duration: {
      type: Number,
      default: 10
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    rate: 1,
    intersected: false,
    loaded: false,
    cached: false
  }),
  beforeMount() {
    let test = new Image()
    test.src = this.src
    this.cached = test.complete
  },
  computed: {
    verticalPadding() {
      return (this.height / this.width * 100).toFixed(2)
    },
    scaleRatio() {
      let max = Math.max(this.width, this.height)
      return (1 + (this.blurLevel / max) * 10).toFixed(2)
    },
  }
};
</script>

<style lang="sass">
@import '~/assets/_variables.scss'
.lazymage
  position: relative
  line-height: 0
  width: 100%
  overflow: hidden
  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    transition: all .2s ease
  &.loaded .placeholder
    opacity: 0
    
  &.mode-cover,
  &.mode-contain,
  &.mode-scale,
  &.mode-none
    position: absolute
    top: 0
    bottom: 0
  &.mode-cover img
    object-fit: cover
  &.mode-contain img
    object-fit: contain
  &.mode-scale img
    object-fit: scale-down
  &.mode-none img
    object-fit: none


  &.active-hover
    .placeholder 
      z-index: 1
    .real 
      z-index: 2
    .spinner 
      z-index: 3
    &.not-cached
      .real
        clip-path: polygon(49.9% 49.9%, 49.9% 50%, 50% 50%, 50% 50%)
        transform: scale(1.5)
    &.loaded
      .real
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)
        transform: scale(1)
      .placeholder
        opacity: 1
    &:hover
      .real
        transform: scale(.95)
        clip-path: polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)

  .loading-overlay
    .loading-background
      background: hsla(0, 0%, 100%, 0)
    .loading-icon:after
      border-left-color: $primary
      border-bottom-color: $primary

</style>