<template>
  <div class="categories-list">
    <div class="section">
      <div class="container">
        <div class="columns is-vcntered is-mobile is-multiline">

          <div v-if="categories.length"
            class="column is-5-tablet is-8-mobile is-offset-3-mobile">
            <g-link :to="{ path: categories[0].path }" class="cat-item">
              <div class="image is-4by5">
                <Lazymage noSpinner mode="cover"
                  itemprop="thumbnail"
                  :src="categories[0].images[0].thumb.url"
                  :src-placeholder="categories[0].images[0].thumb.b64"
                  :width="categories[0].images[0].thumb.width"
                  :height="categories[0].images[0].thumb.height"
                  :alt="categories[0].images[0].thumb.alt"
                />
              </div>
              <h3 class="title">{{ categories[0].title }}</h3>
            </g-link>
          </div>

          <div class="column is-12-mobile content">
            <div class="column is-9 content" v-if="categories.length > 2">
              <h1><slot name="title" /></h1>
              <slot name="content" />
            </div>
            <div v-if="categories.length"
              class="columns is-mobile is-multiline">
              <div class="column"/>
              <div class="column"
                v-for="(cat, i) in categories.slice(1)"
                :class="[aspects[i].width, `is-offset-${i*0}`]"
                :key="cat.id">
                  <g-link :to="{ path: cat.path }" class="cat-item">
                    <div class="image"
                      :class="aspects[i].ratio">
                      <Lazymage noSpinner mode="cover"
                        itemprop="thumbnail"
                        :src="cat.images[0].thumb.url"
                        :src-placeholder="cat.images[0].thumb.b64"
                        :width="cat.images[0].thumb.width"
                        :height="cat.images[0].thumb.height"
                        :alt="cat.images[0].thumb.alt"
                      />
                    </div>
                    <div class="content">
                      <h3 class="title">{{ cat.title }}</h3>
                    </div>
                  </g-link>
                </div>
            </div>
            <div class="column is-9 content" v-if="categories.length <= 2">
              <h1><slot name="title" /></h1>
              <slot name="content" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<static-query>
query Query {
  categories: allCategory (perPage: 100000) {
    edges {
      node {
        id
        date
        title
        path
        images {
          thumb {
            url
            width
            height
            b64
          }
        }
        artworks {
          id
          date
          title
          path
          width
          height
          techniques {
            id
            title
          }
          supports {
            id
            title
          }
          tags {
            title
            path
            artworks {
              id
            }
          }
          images {
            thumb {
              url
              width
              height
              b64
            }
          }
          onsale
          collection {
            id
            path
            name
            anonymous
          }
        }
      }
    }
  }
}
</static-query>

<script>
import ArtworkCard from '~/components/artwork/ArtworkCard.vue'

export default {
  components: {
    ArtworkCard,
  },
  props: {
    title: String,
    content: String,
    categories: Array
  },
  data() {
    return {
      aspects: [
        {
          ratio: 'is-2by1',
          width: 'is-9',
        },
        {
          ratio: 'is-5by4',
          width: 'is-6',
        },
        {
          ratio: 'is-5by3',
          width: 'is-6',
        },
        {
          ratio: 'is-5by4',
          width: 'is-5',
        },
        {
          ratio: 'is-4by5',
          width: 'is-4',
        },
        {
          ratio: 'is-5by4',
          width: 'is-4',
        },
        {
          ratio: 'is-3by1',
          width: 'is-7',
        },
      ]
    }
  },
}
</script>

<style lang="sass">
.categories-list
  .cat-item
    display: block
    position: relative
    .title
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      display: flex
      justify-content: center
      align-items: center
      text-align: center
      margin: 0
</style>
