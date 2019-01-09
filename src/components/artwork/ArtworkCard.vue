<template>
  <div class="artwork-card" :class="['mode-'+mode, {'card' : mode == 'default'}]">

    <div class="card-image">
      <g-link :to="artwork.path">
        <figure class="image is-1by1">

          <Lazymage activeHover mode="cover"
            v-if="artwork.images.length && artwork.images[0].thumb"
            itemprop="thumbnail"
            :src="artwork.images[0].thumb.url"
            :src-placeholder="artwork.images[0].thumb.b64"
            :width="artwork.images[0].thumb.width"
            :height="artwork.images[0].thumb.height"
            :alt="artwork.images[0].thumb.alt"
          />

          <div class="noimage has-background-grey-lighter" v-else>
            <span class="icon has-text-grey-light">
              <i class="fas fa-image fa-2x"></i>
            </span>
          </div>

        </figure>
      </g-link>
      <div class="columns availability">
        <div class="column collec">
          <g-link
            :to="artwork.collection.path"
            v-if="showCollec && artwork.collection && !artwork.collection.anonymous"
            class="tag is-dark">
            {{ artwork.collection.name }}
          </g-link>
        </div>
        <div class="column onsale is-narrow"
          v-if="!noSale && artwork.onsale"
          >
          <g-link
            :to="artwork.path"
            class="tag is-info">
            Disponible
          </g-link>
        </div>
      </div>
    </div>

    <div class="card-content has-text-centered">
      <div v-if="mode == 'row'">
        <div class="columns">
          <div class="column">
            <h3 class="title is-5">
              <g-link :to="artwork.path">{{ artwork.title }}</g-link>
            </h3>
            <p class="subtitle is-6">{{ artworkUtil.dimensions }}</p>
          </div>
          <div class="column is-narrow has-text-right">
            <p class="author">John Oliver-Doe</p>
            <p class="date">{{ artworkUtil.date }}</p>
          </div>
        </div>
        <DataBlock
          v-if="mode == 'row'"
          :artwork="artwork"
          :without="{title: true, date: true, author: true, dimensions: true}"
          :singleLine="true"
          class="is-size-7" />
      </div>
      <div v-else-if="mode == 'image'">
        <h3 class="title is-6 has-text-centered"><g-link :to="artwork.path" class="has-text-dark">{{ artwork.title }}</g-link></h3>
      </div>
      <div v-else>
        <h3 class="title is-6"><g-link :to="artwork.path" class="has-text-dark">{{ artwork.title }}</g-link></h3>
        <p class="subtitle is-7" v-html="artworkUtil.description(
          Object.assign(infosOptions, { title: false, collection: false })
        )" />
      </div>
    </div>

  </div>
</template>

<script>
import ArtworkUtil from "~/utils/artwork.js";
import DataBlock from "~/components/artwork/DataBlock";
import CollectionLink from "~/components/CollectionLink"

export default {
  components: {
    DataBlock,
    CollectionLink
  },
  props: {
    artwork: Object,
    mode: {
      default: 'default',
      type: String
    },
    showCollec: Boolean,
    noSale: Boolean,
    infosOptions: {
      default: () => ({}),
      type: Object
    }
  },
  computed: {
    artworkUtil() {
      return new ArtworkUtil(this.artwork)
    }
  },
};
</script>

<style lang="sass">
.artwork-card

  &.mode-row
    display: flex
    .card-image
      width: 33%
    .card-content
      flex: 1
      width: 66%
  
  &.mode-default
    height: 100%

  &.mode-image
    .card-content 
      padding: .5em 0 0

  .image
    .noimage
      display: flex
      justify-content: center
      align-items: center
    .noimage,
    .lazymage
      position: absolute
      width: 100%
      height: 100%
      top: 0
      bottom: 0

  .collection .tag 
    white-space: normal
    height: auto
    display: block
    padding: .5em .75em
  
  .availability
    position: absolute
    bottom: 0
    width: 100%
    margin: 0
</style>
