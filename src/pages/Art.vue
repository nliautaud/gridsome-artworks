<template>
  <DefaultLayout>

    <a @click="$page.categories.edges.push($page.categories.edges[0])">Add</a>
    <a @click="$page.categories.edges.pop()">Rem</a>

    <CategoriesList :categories="rootCategories">
      <template slot="title">This is it</template>
      <template slot="content">
        <p>Nunc varius ex at dolor rutrum vulputate. Nunc non purus maximus, ornare odio sit amet, mollis justo. Etiam nec sollicitudin mauris. Curabitur ac nulla mollis, lobortis ligula at, congue enim. Sed nec congue diam. Duis euismod dapibus ipsum. Fusce turpis neque, pretium sed facilisis id, pulvinar cursus leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus rutrum non lacus eget lacinia.</p>
      </template>
    </CategoriesList>
    
    <ArtworksList :artworks="artworks" />
    
  </DefaultLayout>
</template>


<page-query>
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
  categories: allCategory (perPage: 100000) {
    edges {
      node {
        path
        title
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
</page-query>

<script>
import CategoriesList from '~/components/CategoriesList.vue'
import ArtworksList from '~/components/ArtworksList.vue'

export default {
  components: {
    CategoriesList,
    ArtworksList
  },
  metaInfo: {
    title: 'Collection'
  },
  computed: {
    artworks() {
      return this.$page.artworks.edges.map(item => item.node)
    },
    rootCategories() {
      return this.$page.categories.edges
        .filter(item => !item.parent)
        .map(item => item.node)
    },
  }
}
</script>
