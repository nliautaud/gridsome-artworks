<template>
  <DefaultLayout class="artworkpage">

    <section class="section description has-background-light">
      <div class="container">
        <div class="columns is-variable is-0-mobile is-7-desktop">

          <div class="gallery column is-7">

            <div class="gallery-main"
              itemscope itemtype="http://schema.org/ImageGallery">
              <figure
                itemprop="associatedMedia"
                itemscope
                itemtype="http://schema.org/ImageObject"
                v-for="(item, index) in [this.$page.artwork.images[0]]"
                v-bind:key="index"
              >
                <a class="image"
                  :href="item.full.url"
                  itemprop="contentUrl"
                  @click.prevent="$refs.gallery.open(index, $el.querySelectorAll('[itemprop=thumbnail]'))">
                  <Lazymage
                    itemprop="thumbnail"
                    :src="item.full.url"
                    :src-placeholder="item.full.b64"
                    :width="item.full.width"
                    :height="item.full.height"
                    :alt="item.alt"
                    showLoader
                    />
                </a>
              </figure>
            </div>
          </div>

          <div class="infos column is-5">
            <h1 v-html="$page.artwork.title" class="title is-4"/>
            <p class="subtitle is-6">
              <g-link class="author" :to="{path: 'about'}">John Doe</g-link>,
              <g-link class="date" :to="{path: 'about'}">{{ artworkUtil.date }}</g-link>
            </p>

            <DataBlock :artwork="$page.artwork" />

            <SaleBlock :artwork="$page.artwork"/>

          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns is-variable is-0-mobile is-7-desktop" >
          <div class="infos column">
            <div class="columns is-variable is-mobile"
              itemscope itemtype="http://schema.org/ImageGallery"
              transition-duration="0.3s" item-selector="figure">
              <figure
                class="column is-size-6 image"
                itemprop="associatedMedia"
                itemscope itemtype="http://schema.org/ImageObject"
                v-for="(item, index) in this.$page.artwork.images.slice(1)"
                :src="item.src"
                v-bind:key="index"
              >
                <a class="ldkgnv"
                  :href="item.full.url"
                  itemprop="contentUrl"
                  style="display:block"
                  @click.prevent="$refs.gallery.open(index+1, $el.querySelectorAll('[itemprop=thumbnail]'))">
                  <Lazymage
                    itemprop="thumbnail"
                    :src="item.thumb.url"
                    :src-placeholder="item.thumb.b64"
                    :width="item.thumb.width"
                    :height="item.thumb.height"
                    :alt="item.alt"
                  />
                </a>
              </figure>
            </div>
          </div>
          <div class="column">
              <div class="content" v-html="$page.artwork.content"/>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <RelatedCollection :artwork="$page.artwork" />
      </div>
    </section>

    <section class="section has-background-light">
      <div class="container">
        <RelatedArtworks :artwork="$page.artwork"/>
      </div>
    </section>

    <SwipeGallery
      ref="gallery"
      :slides="this.$page.artwork.images.map(img =>({
        src: img.full.url,
        msrc: img.full.url,
        w: img.full.width,
        h: img.full.height,
        title: `${artworkUtil.description()} © ASC`
      }))"
      :options="{
        bgOpacity : .9,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
      }"
    />

    <template slot="foot">
      <p class="is-size-7" v-html="artworkUtil.description()" />
    </template>
  </DefaultLayout>
</template>

<page-query>
query Query ($path: String!) {
  artwork: artwork (path: $path) {
    id
    title
    content
    date
    width
    height
    supports {
      id
      path
      title
    }
    techniques {
      id
      path
      title
    }
    images {
      full {
        url
        width
        height
      }
      thumb {
        url
        width
        height
        b64
      }
    }
    onsale
    price
    collection {
      id
      anonymous
      path
      name
    }
  }
}
</page-query>

<script>
import ArtworkUtil from "~/utils/artwork.js";

import DataBlock from "~/components/artwork/DataBlock";
import SaleBlock from "~/components/artwork/SaleBlock";
import RelatedArtworks from "~/components/artwork/RelatedArtworks";
import RelatedCollection from "~/components/artwork/RelatedCollection";

import SwipeGallery from "~/components/SwipeGallery";

export default {
  components: {
    RelatedArtworks,
    RelatedCollection,
    DataBlock,
    SaleBlock,
    SwipeGallery,
  },
  data() {
    return {
      lighboxIndex: null,
    }
  },
  computed: {
    artworkUtil() {
      return new ArtworkUtil(this.$page.artwork)
    }
  },
  metaInfo() {
    return {
      title: this.$page.artwork.title
    };
  }
};
</script>

<style lang="sass">
@import '~/assets/_variables.scss'

.artworkpage
  .section.description
    .gallery-main,
    figure,
    .image
      height: 100%

.pswp__top-bar, .pswp__caption
  background: none !important
  padding: 0.5em 0

</style>
