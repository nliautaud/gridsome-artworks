<template>
  <DefaultLayout>
    <div class="level">
      <div class="level-left">
        <div class="title-info">
          <h1 class="title"># {{ $page.tag.title }}</h1>
        </div>
      </div>
    </div>
    <div class="level columns" v-if="$page.tag.content">
      <div class="column is-half">{{ $page.tag.content }}</div>
    </div>
    <div class="level is-mobile">
      <g-link :to="{name: 'art'}" class="button">
        <span class="icon">
          <i class="fas fa-chevron-left"></i>
        </span>
        <span>All artworks</span>
      </g-link>
      <p><span class="count">{{ $page.tag.artworks.length }}</span> artworks</p>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd"
        v-for="artwork in $page.tag.artworks"
        :key="artwork.id"
      >
        <ArtworkCard
          :artwork="artwork"
          :showTitle="true"
          :showInfos="true"
          :showCollec="true"
        />
      </div>
    </div>
  </DefaultLayout>
</template>

<page-query>
query Query ($path: String!) {
  tag: tag (path: $path) {
    id
    title
    content
    artworks {
      id
      path
      title
      date
      width
      height
      techniques {
        title
      }
      supports {
        title
      }
      images {
        thumb {
          url
          width
        }
      }
      onsale
      collection {
        name
        anonymous
      }
    }
  }
}
</page-query>

<script>
import ArtworkCard from "~/components/artwork/ArtworkCard.vue";
export default {
  components: {
    ArtworkCard
  },
  computed: {},
  metaInfo() {
    return {
      title: this.$page.tag.name
    };
  }
};
</script>