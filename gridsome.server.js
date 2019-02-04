module.exports = function (api) {

  api.loadSource(async store => {
    //const { data } = await axios.get(API_URL)
    const data = require('./data/data.json')

    // categories
    console.log(`ADD ${data.categories.length} categories =======`)
    const categoryType = store.addContentType({
      typeName: 'Category',
      route: '/art/:slug'
    })
    await Promise.all(data.categories.map(async cat => {

      if(cat.images) {
        await Promise.all(cat.images.map(async img => {
          if (img.full) img.full.b64 = await b64(cat.id, img.full.url)
          img.thumb.b64 = await b64(cat.id, img.thumb.url)
          return Promise.resolve()
        }));
      }

      categoryType.addNode({
        id: cat.id,
        title: cat.title,
        content: cat.content,
        fields: {
          images: cat.images,
          childs: {
            typeName: 'Category',
            id: cat.childs
          },
          artworks: {
            typeName: 'Artwork',
            id: cat.artworks
          }
        }
      })
      return Promise.resolve()
    }))

    // techniques
    console.log(`ADD ${data.techniques.length} techniques =======`)
    const techniqueType = store.addContentType({
      typeName: 'Technique',
      route: '/art/technique/:slug'
    })
    data.techniques.forEach((technique, i) => {
      techniqueType.addNode({
        id: technique.id,
        title: technique.name,
        fields: {
          parent: {
            typeName: 'Technique',
            id: technique.parent ? [technique.parent] : []
          },
          artworks: {
            typeName: 'Artwork',
            id: data.artworks.filter(a => a.techniques.includes(i)).map(a => a.id)
          }
        }
      })
    })

    // supports
    console.log(`ADD ${data.supports.length} supports =======`)
    const supportType = store.addContentType({
      typeName: 'Support',
      route: '/art/support/:slug'
    })
    data.supports.forEach((support, i) => {
      supportType.addNode({
        id: support.id,
        title: support.name,
        fields: {
          parent: {
            typeName: 'Support',
            id: support.parent ? [support.parent] : []
          },
          artworks: {
            typeName: 'Artwork',
            id: data.artworks.filter(a => a.supports.includes(i)).map(a => a.id)
          }
        }
      })
    })

    // collections
    console.log(`ADD ${data.collections.length} collections =======`)
    const collecType = store.addContentType({
      typeName: 'Collection',
      route: '/art/collection/:slug'
    })
    data.collections.forEach(collec => {
      collecType.addNode({
        id: collec.id,
        title: collec.name,
        content: collec.description,
        fields: {
          anonymous: collec.anonymous,
          name: collec.name ? collec.name : ' ',
          artworks: {
            typeName: 'Artwork',
            id: collec.artworks.map(i => data.artworks[i].id)
          }
        }
      })
    })

    // tags
    // console.log(`ADD ${data.tags.length} tags =======`)
    // const tagType = store.addContentType({
    //   typeName: 'Tag',
    //   route: '/art/tag/:slug'
    // })
    // data.tags.forEach(tag => {
    //   tagType.addNode({
    //     id: tag.name,
    //     title: tag.name,
    //     content: tag.description,
    //     fields: {
    //       artworks: {
    //         typeName: 'Artwork',
    //         id: tag.artworks || []
    //       }
    //     }
    //   })
    // })

    // artworks
    console.log(`ADD ${data.artworks.length} artworks =======`)
    const artworkType = store.addContentType({
      typeName: 'Artwork',
      route: '/art/:id-:slug'
    })

    data.artworks.map(artwork => {
      artworkType.addNode({
        id: artwork.id,
        title: artwork.title,
        date: artwork.date,
        content: artwork.description,
        fields: {
          width: artwork.width,
          height: artwork.height,
          techniques: {
            typeName: 'Technique',
            id: artwork.techniques.map(i => data.techniques[i].id)
          },
          supports: {
            typeName: 'Support',
            id: artwork.supports.map(i => data.supports[i].id)
          },
          images: artwork.images,
          tags: {
            typeName: 'Tag',
            id: artwork.tags
          },
          onsale: artwork.onsale,
          price: artwork.price,
          collection: artwork.collection ? {
            typeName: 'Collection',
            id: data.collections[artwork.collection].id
          } : undefined,
          category: artwork.category ? {
            typeName: 'Category',
            id: data.categories[artwork.category].id
          } : undefined,
        }
      })
    })
    console.log('ENDED =========')
  })
}