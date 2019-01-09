<template>
  <DefaultLayout>

    <div class="section">
      <div class="container">
        <h1 class="title">{{$page.category.title}}</h1>
      </div>
    </div>

    <CategoriesList :category="$page.category"/>
    
    <ArtworksList :artworks="$page.category.artworks" />
    
  </DefaultLayout>
</template>

<page-query>
query Query ($path: String!) {
  category: category (path: $path) {
    title
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
    title: 'Category'
  },
}
</script>
