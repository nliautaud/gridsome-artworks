<template>
  <DefaultLayout>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-three-fifths">

            <div class="title-info" v-if="$page.collection.anonymous">
              <h1 class="title">Private collection</h1>
              <p class="subtitle is-7 has-text-grey">#{{ $page.collection.id }}</p>
            </div>
            <div class="title-info" v-else>
              <h1 class="title">{{ $page.collection.name }} collection</h1>
            </div>

          </div>
          <div class="column is-two-fifths has-text-right">
            <div class="collection-info" v-if="$page.collection.name">
              <div>
                <b-dropdown position="is-bottom-left">
                  <button class="button is-primary" slot="trigger">
                    <span>Contact the owner</span>
                    <span class="icon">
                      <i class="fas fa-caret-down"></i>
                    </span>
                  </button>

                  <b-dropdown-item has-link>
                    <a href="tel:+33123456789">
                      <span class="icon">
                        <i class="fas fa-phone"></i>
                      </span>
                      <span>+33123456789</span>
                    </a>
                  </b-dropdown-item>

                  <b-dropdown-item :separator="true">
                    <hr>
                  </b-dropdown-item>

                  <b-dropdown-item has-link>
                    <a href="mailto:jean-baptisteduboudu@laposte.prout">
                      <span class="icon">
                        <i class="fas fa-at"></i>
                      </span>
                      jean-baptisteduboudu@laposte.prout
                    </a>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div class="anonymity-info" v-else>
              <p class="is-6">The owner(s) asked to remain anonymous</p>
              <p>
                <g-link to>Contact the artist</g-link>
              </p>
            </div>
          </div>
        </div>

        <div class="level columns is-variable is-8 content"
          v-if="$page.collection.content">
          <div class="column is-three-fifths">
            <p>{{ $page.collection.content }}</p>
          </div>
          <div class="column is-two-fifths">
            <div class="columns is-multiline is-variable is-2">
              <div class="column">
                <p>Artists :</p>
                <p class="tags">
                  <g-link to class="tag">John Oliver-Doe</g-link>
                  <g-link to class="tag">Margaret Oliver-Doe</g-link>
                </p>
              </div>
              <div class="column">
                <p>Types :</p>
                <p class="tags">
                  <g-link to class="tag">Large paintings</g-link>
                  <g-link to class="tag">Drawings</g-link>
                  <g-link to class="tag">Sketches</g-link>
                </p>
              </div>
              <div class="column">
                <p>Subjects :</p>
                <p class="tags">
                  <g-link to class="tag">Cat</g-link>
                  <g-link to class="tag">Still life</g-link>
                  <g-link to class="tag">Nature</g-link>
                  <g-link to class="tag">Workshop</g-link>
                  <g-link to class="tag">Nude</g-link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr>
        <div class="level">
          <div class="level-left">
            <g-link :to="{name: 'art'}" class="button">
              <span class="icon">
                <i class="fas fa-chevron-left"></i>
              </span>
              <span>All artworks</span>
            </g-link>
          </div>
          <div class="level-right">
            <p class="count"> {{ $page.collection.artworks.length }} artworks</p>
          </div>
          <div class="level-right">
          </div>
        </div>
        
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div
            class="column is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd"
            v-for="artwork in $page.collection.artworks"
            :key="artwork.id"
          >
            <ArtworkCard
              :artwork="artwork"
              noCollec />

          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<page-query>
query Query ($path: String!) {
  collection: collection (path: $path) {
    id
    anonymous
    name
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
        id
        anonymous
        name
      }
    }
  }
}
</page-query>

<script>
import ArtworkCard from "~/components/artwork/ArtworkCard.vue";
import arrayToSentence from "array-to-sentence";

export default {
  components: {
    ArtworkCard
  },
  computed: {},
  metaInfo() {
    return {
      title: this.$page.collection.name
    };
  }
};
</script>

<style lang="stylus" scoped>
.content
  align-items baseline
</style>
