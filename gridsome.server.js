const axios = require('axios'),
      sharp = require('sharp'),
      request = require('request-promise-native')
  
//arrayToSentence = require('array-to-sentence')

var b64 = async function(id, url) {
  try {
    const body = await request({
      url: url,
      cacheKey: url,
      encoding: null
    })
    let image = await sharp(body)
      .resize(20, 20, {
        kernel: sharp.kernel.nearest,
        fit: 'inside'
      })
      .toFormat('jpeg')
      .toBuffer()
    console.log('B64', id, url)
    return `data:image/jpg;base64,`+image.toString("base64")
  } catch (error) {
    return undefined
    throw Error(error)
  }
}
module.exports = function (api) {

  api.loadSource(async store => {
    //const { data } = await axios.get(API_URL)
    const { data } = require('./data.faker.js')

    // categories
    console.log(`ADD ${data.categories.length} categories =======`)
    const categoryType = store.addContentType({
      typeName: 'Category',
      route: '/art/:slug'
    })
    await Promise.all(data.categories.map(async cat => {
      await Promise.all(cat.images.map(async img => {
        if (img.full) img.full.b64 = await b64(cat.id, img.full.url)
        img.thumb.b64 = await b64(cat.id, img.thumb.url)
        return Promise.resolve()
      }));
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
    data.techniques.forEach(technique => {
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
            id: technique.artworks
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
    data.supports.forEach(support => {
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
            id: support.artworks
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
            id: collec.artworks
          }
        }
      })
    })

    // tags
    console.log(`ADD ${data.tags.length} tags =======`)
    const tagType = store.addContentType({
      typeName: 'Tag',
      route: '/art/tag/:slug'
    })
    data.tags.forEach(tag => {
      tagType.addNode({
        id: tag.name,
        title: tag.name,
        content: tag.description,
        fields: {
          artworks: {
            typeName: 'Artwork',
            id: tag.artworks
          }
        }
      })
    })

    // artworks
    console.log(`ADD ${data.artworks.length} artworks =======`)
    const artworkType = store.addContentType({
      typeName: 'Artwork',
      route: '/art/:year/:month/:day/:slug'
    })

    await Promise.all(data.artworks.map(async artwork => {

      await Promise.all(artwork.images.map(async img => {
        img.full.b64 = await b64(artwork.id, img.full.url)
        img.thumb.b64 = await b64(artwork.id, img.thumb.url)
        return Promise.resolve()
      }));

      console.log('ADD', artwork.id)

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
            id: artwork.techniques
          },
          supports: {
            typeName: 'Support',
            id: artwork.supports
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
            id: artwork.collection
          } : undefined,
          category: artwork.category ? {
            typeName: 'Category',
            id: artwork.category
          } : undefined,
        }
      })

      return Promise.resolve()

    }))

    console.log('ENDED =========')


    // artworkType.addSchemaField('technicalDescription', ({ graphql }) => ({
    //   type: graphql.GraphQLString,
    //   resolve (root) {
    //     let tech = '', supp = '', size = '', sep = ''
    //     let {techniques, supports} = root.fields
    //     if (techniques.length)
    //       tech = arrayToSentence(techniques.map(t => t.title))
    //     if (supports && supports.length)
    //       supp = arrayToSentence(supports.map(t => t.title))
    //     if (root.fields.width || root.fields.height)
    //       size = `${root.fields.height ? root.fields.height : '?'}x${root.fields.width ? this.width : '?'}cm`
    //     sep = supp ? (tech ? ' on ' : 'On ') : ''
    //     return `${tech}${sep}${supp}${(tech || supp) && size ? ', '+size:''}`
    //   }
    // }))

  })
}