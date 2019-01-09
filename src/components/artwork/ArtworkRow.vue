<template>
  <tr class="artwork-row">

    <td class="cell-image">
      <g-link :to="artwork.path">
        <figure class="image is-1by1">
          <Lazymage
            itemprop="thumbnail"
            :src="artwork.images[0].thumb.url"
            :src-placeholder="artwork.images[0].thumb.b64"
            :width="artwork.images[0].thumb.width"
            :height="artwork.images[0].thumb.height"
            :alt="artwork.images[0].thumb.alt"
            v-if="artwork.images.length && artwork.images[0].thumb"
          />

          <div class="noimage has-background-grey-lighter" v-else>
            <span class="icon has-text-grey-light">
              <i class="fas fa-image fa-2x"></i>
            </span>
          </div>

        </figure>
      </g-link>
    </td>

    <td class="cell-title">
      <g-link :to="artwork.path" class="has-text-dark">
        <h3 class="has-text-weight-semibold">{{ artwork.title }}</h3>
      </g-link>
    </td>

    <td class="cell-title">
      <g-link :to="artwork.path" class="has-text-dark">
        John Oliver-Doe
      </g-link>
    </td>

    <td class="cell-date">
      <g-link :to="artwork.path" class="has-text-dark">
      {{ new Date(artwork.date).toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'numeric'
        }) }}
      </g-link>
    </td>

    <td class="cell-medium">
      <g-link :to="artwork.path" class="has-text-dark">
      {{ artworkUtil.medium }}
      </g-link>
    </td>

    <td class="cell-dimensions">
      <g-link :to="artwork.path" class="has-text-dark">
      {{ artworkUtil.dimensions }}
      </g-link>
    </td>

    <td class="cell-availability">
      <g-link :to="artwork.path" class="has-text-dark tags">
        <p v-if="artwork.collection">
          <span v-if="artwork.collection.anonymous" class="tag">Collection privée</span>
          <span v-else class="tag">{{ artwork.collection.name }}</span>
        </p>
        <div
          v-if="artwork.onsale"
          :to="artwork.path"
          class="tag is-info">
          Disponible
        </div>
      </g-link>
    </td>

  </tr>
</template>

<script>
import ArtworkUtil from "~/utils/artwork.js";
import CollectionLink from "~/components/CollectionLink"

export default {
  components: {
    CollectionLink
  },
  props: {
    artwork: Object,
  },
  computed: {
    artworkUtil() {
      return new ArtworkUtil(this.artwork)
    }
  },
};
</script>

<style scoped lang="stylus">
td
  padding 0
  vertical-align middle
  border 0
td > a
  display block
  align-items center
  height 100%
  padding 1rem .75em
  line-height 1.2
.cell-image 
  width 15%
  > a
    padding 0
    margin-right 1em
.cell-availability
  max-width 8em
  .tag
    display block
    width 100%
    white-space normal
    height auto
    overflow hidden
    text-overflow ellipsis
    padding .25em .75em
</style>
