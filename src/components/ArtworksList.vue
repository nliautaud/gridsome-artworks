<template>
  <transition appear name="artworkstransition">
  <div class="artworks-list">

    <ArtworksFilters
      :filteredArtworks="sortedEntries"
      @filter="onFilter"
      class="horizontal"
    />

    <main class="section">
      <div class="container">

        <table class="table is-fullwidth is-striped is-size-7"
          v-if="view == 'row'"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          :infinite-scroll-distance="2000"
          >
          <thead>
            <tr>
              <th>Artwork</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Date</th>
              <th>Medium</th>
              <th>Dimensions</th>
              <th>Collection</th>
            </tr>
          </thead>
          <tbody>
            <ArtworkRow
              v-for="artwork in sortedEntries.slice(0, maxEntries)"
              :key="artwork.id"
              :artwork="artwork"
              />
          </tbody>
        </table>

        <TransitionGroup v-else
          appear tag="div" name="cardanim"
          class="columns is-multiline"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          :infinite-scroll-distance="2000"
          >
          <div class="column"
            :class="[columnClass]"
            v-for="(artwork, i) in sortedEntries.slice(0, maxEntries)"
            :key="artwork.id"
            :style="{'transition-duration': `${200+(i%entriesPerPage)*100}ms`}"
            >
            <ArtworkCard
              :mode="view"
              :artwork="artwork"
            />
          </div>
        </TransitionGroup>

      </div>
    </main>
  </div>
  </transition>
</template>

<script>
import ArtworksFilters from '~/components/ArtworksFilters.vue'
import ArtworksViewInput from '~/components/ArtworksViewInput.vue'
import ArtworkCard from '~/components/artwork/ArtworkCard.vue'
import ArtworkRow from '~/components/artwork/ArtworkRow.vue'

import Fuse from 'fuse.js'
import { debounce } from "debounce";
var infiniteScroll = require('vue-infinite-scroll')

export default {
  components: {
    ArtworksFilters,
    ArtworksViewInput,
    ArtworkCard,
    ArtworkRow,
  },
  directives: {
    infiniteScroll
  },
  props: {
    artworks: Array,
    entriesPerPage: {
      default: 10,
      type: Number
    },
  },
  data() {
    return {
      loadedPages: 1,
      filters: {},
      sort: 'newest',
      view: 'default',
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    filteredEntries() {
      return this.artworks.filter(artwork => {

        if (this.filters.from && new Date(artwork.date) < this.filters.from)
          return false

        if (this.filters.to && new Date(artwork.date) > new Date(
            this.filters.to.getFullYear(),
            this.filters.to.getMonth() + 1,
            0))
          return false

        if (this.filters.supports && this.filters.supports.length) {
          if (!artwork.supports.some(s =>
            this.filters.supports.includes(s.id)
            || (s.parent && this.filters.supports.includes(s.parent.id))
          )) return false
        } 
        if (this.filters.techniques && this.filters.techniques.length) {
          if (!artwork.techniques.some(s =>
            this.filters.techniques.includes(s.id)
            || (s.parent && this.filters.techniques.includes(s.parent.id))
          )) return false
        }

        if (this.filters.format && this.filters.format.length) {
          let ratio = artwork.width / artwork.height
          let format = ratio > .99 && ratio < 1.01 ? 'square' : ratio > 1 ? 'landscape' : 'portrait'
          return this.filters.format.includes(format)
        }

        if (this.filters.collection) {
          if(!artwork.collection) return false
          if(artwork.collection.id != this.filters.collection) return false
        }

        if (this.filters.onsale && !artwork.onsale) return false

        return true
      })
    },
    sortedEntries() {
      let entries = this.filteredEntries

      if (this.filters.search) {
        entries = this.searchEntries(entries, this.filters.search)
      }

      switch (this.filters.sort) {
        case 'asc':
          return entries.sort((a,b) =>
            a.title.localeCompare(b.title))
        case 'dsc':
          return entries.sort((a,b) =>
            b.title.localeCompare(a.title))
        case 'old':
          return entries.sort((a,b) =>
            new Date(a.date) - new Date(b.date))
        case 'new':
          return entries.sort((a, b) => 
            new Date(b.date) - new Date(a.date))
        default:
          return entries
      }
    },
    maxEntries() {
      return this.loadedPages * this.entriesPerPage
    },
    columnClass() {
      return this.view == 'row' ? 'is-full' : 'is-12-mobile is-4-tablet is-4-desktop is-3-widescreen is-3-fullhd'
    }
  },
  methods: {
    onView(value) {
      this.view = value
      this.loadedPages = 1
    },
    onFilter(value) {
      this.filters = value
      this.loadedPages = 1
    },
    loadMore: debounce(function() {
      this.busy = false
      if(this.filteredEntries.length <= this.maxEntries) return
      this.loadedPages++
    }, 100),
    searchEntries(entries, search) {
      const options = {
        tokenize: true,
        threshold: 0.3,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 4,
        keys: [{
          name: 'title',
          weight: 0.6
        }, {
          name: 'tags.title',
          weight: 0.2
        }, {
          name: 'date',
          weight: 0.2
        }]
      }
      var fuse = new Fuse(entries, options)
      return fuse.search(search)
    },
  }
}
</script>

<style lang="stylus">
.artworks-list
  thead th
    font-weight 500
    opacity .5
    border-bottom-width 1px

/* base */
.artworkstransition
  backface-visibility hidden
  opacity 0
/* appearing */
.artworkstransition-enter-active
  transition-timing-function ease
  transition-property all
/* disappearing */
.artworkstransition-leave
  transition-duration 0 !important
  transition-delay 0 !important
  transition-timing-function ease-in
  transition-property none !important
  z-index 0
.artworkstransition-move
  transition-duration .5s
  transition-timing-function ease
/* appear at / disappear to */
.artworkstransition-enter
.artworkstransition-leave-to
  transform translateY(100px)
  opacity 0
  width 0
  height 0
</style>
