<template>
  <div class="related">
    <h3 class="title is-4">Related</h3>
    <div class="columns">
      <div class="column"
        v-for="(relatedArtwork, index) in related"
        :key="index">
        <p class="is-size-7">score: {{ relatedArtwork.weight }}</p>
        <ArtworkCard :artwork="relatedArtwork" />
      </div>
    </div>
  </div>
</template>

<static-query>
query Query {
  artworks: allArtwork (perPage: 100) {
    edges {
      node {
        id
        date
        title
        path
        width
        height
        techniques {
          title
        }
        supports {
          id
          title
        }
        tags {
          id
        }
        images {
          thumb {
            url
            width
            height
            b64
          }
        }
        price
        collection {
          id
          name
        }
      }
    }
  }
}
</static-query>

<script>
import ArtworkCard from './ArtworkCard.vue'

export default {
  components: {
    ArtworkCard
  },
  props: {
    artwork: Object,
    count: {
      default: 5,
      type: Number
    }
  },
  created() {
    this.$static.artworks.edges.forEach(item => {
      let atw = item.node
      atw.weight = 0
      atw.weight += atw.techniques.filter(a =>
        this.artwork.techniques.some(b => a.id == b.id)).length
      atw.weight += atw.supports.filter(a =>
        this.artwork.supports.some(b => a.id == b.id)).length
      atw.weight += atw.tags.filter(a =>
        this.artwork.tags.some(b => a.id == b.id)).length
      atw.weight += Math.random()
    })
  },
  computed: {
    related() {
      return this.$static.artworks.edges
        .map(item => item.node)
        .filter(item => item.id != this.artwork.id)
        .sort((a, b) => b.weight - a.weight)
        .slice(0, this.count)
    }
  }
};
</script>

<style lang="stylus">
</style>
