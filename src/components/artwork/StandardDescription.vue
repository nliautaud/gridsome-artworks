<template>
  <span class="standard-description" v-html="description" />
</template>

<script>
import arrayToSentence from "array-to-sentence";
export default {
  props: {
    artwork: Object,
  },
  computed: {
    description() {
      let infos = []
      if(true)
        infos.push(`John Oliver-Doe`)
      if(this.artwork.title)
        infos.push(`<em>${this.artwork.title}</em>`)
      if(this.date)
        infos.push(this.date)
      if(this.techniques || this.supports)
        infos.push(arrayToSentence([this.techniques, this.supports], {
          lastSeparator: ' on '
        }))
      if(this.dimensions)
        infos.push(this.dimensions)
      if(this.collection)
        infos.push(this.collection)
      return arrayToSentence(infos, {
        separator: '; ', lastSeparator: '; '
      })
    },
    dimensions() {
      if(this.artwork.width && this.artwork.height && !this.artwork.depth) {
        return `${this.artwork.width}x${this.artwork.height}cm`
      }
      let dims = []
      if(this.artwork.width) dims.push(`width ${this.artwork.width} cm`)
      if(this.artwork.height) dims.push(`height ${this.artwork.height} cm`)
      if(this.artwork.depth) dims.push(`depth ${this.artwork.depth} cm`)
      return arrayToSentence(dims, {
        separator: ',', lastSeparator: ' and '
      })
    },
    date() {
      if(!this.artwork.date) return
      return new Date(this.artwork.date).getFullYear()
    },
    medium: function() {
      if(!this.artwork.techniques.length) return
      return arrayToSentence(this.artwork.techniques.map(t => t.title))
    },
    techniques: function() {
      if(!this.artwork.techniques.length) return
      return arrayToSentence(this.artwork.techniques.map(t => t.title))
    },
    supports: function() {
      if(!this.artwork.supports.length) return
      return arrayToSentence(this.artwork.supports.map(t => t.title))
    },
    collection: function() {
      if(!this.artwork.collection) return 'artist collection'
      if(this.artwork.collection.anonymous) return 'private collection'
      return this.artwork.collection.name
    }
  }
};
</script>

<style lang="stylus">

</style>

