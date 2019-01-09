<template>
  <div class="related-collection content" v-if="!artwork.collection">
    <p><em>{{ artwork.title }}</em> isn't part of any collection.</p>
    <p>
      <g-link :to="{ path: '' }" class="button is-primary">
        <span>Create a collection</span>
        <span class="icon">
          <i class="fas fa-chevron-right"></i>
        </span>
      </g-link>
    </p>
  </div>
  
  <div class="related-collection" v-else>
    <div class="columns is-mobile is-multiline" :class="parentClass">

      <div class="column is-full-desktop is-one-fifth-desktop info">
        <h3 class="title is-4">Collection</h3>
        <div class="content">
          <p>
            <em>{{ artwork.title }}</em> is part of
              <g-link :to="{ path: artwork.collection.path }">
                <span v-if="artwork.collection.anonymous">a private collection</span>
                <span v-else>{{ artwork.collection.name }}</span>
              </g-link>.
          </p>
        </div>
        <g-link :to="{ path: artwork.collection.path }" class="button">
          <span>See full collection</span>
          <span class="icon">
            <i class="fas fa-chevron-right"></i>
          </span>
        </g-link>
      </div>

      <div class="column is-full-mobile iems">
        <div class="columns is-mobile is-multiline" :class="parentClass">
          <div class="column item"
            v-for="(relatedArtwork, index) in related"
            :key="index">
            <ArtworkCard :artwork="relatedArtwork" mode="image" noCollec />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<static-query>
query Query {
  artworks: allArtwork (perPage: 100000) {
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
        collection {
          id
          anonymous
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
  computed: {
    parentClass() {
      let map = [
        '', 'is-multiline'
      ]
      if(this.count > 0 && this.count < map.length) return map[this.count]
      return ''
    },
    related() {
      return this.$static.artworks.edges
        .map(item => item.node)
        .filter(item => item.id != this.artwork.id && item.collection && item.collection.id == this.artwork.collection.id)
        .slice(0, this.count)
    }
  }
};
</script>

<style lang="stylus">
.related-collection
  .item.column
    max-width 14em
  .column.info
    display flex
    flex-direction column
    .button
      margin-top auto
</style>
