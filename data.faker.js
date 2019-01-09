const faker = require('faker')

var data = {
  categories: [],
  techniques: [],
  supports: [],
  artworks: [],
  collections: [],
  tags: []
}

// categories
const getRandCats = (count) => {
  cats = []
  for (let i = 0; i < count; i++) {
    let childcats = getRandCats(faker.random.number({ 'min': 0, 'max': 2 }))
    cats.push({
      id: faker.random.uuid(),
      title: faker.commerce.department(),
      content: faker.lorem.paragraph(),
      images: [{
        thumb: {
          url: `https://loremflickr.com/600/600/painting,canvas,paper,drawing,sketch,print,etching,animation?lock=1`,
          width: 600,
          height: 600,
        }
      }],
      childs: childcats.map(c => c.id),
      artworks: []
    })
    cats = cats.concat(childcats)
  }
  return cats
}
data.categories = getRandCats(4)

// techniques
for (let i = 0; i < 20; i++) {
  data.techniques.push({
    id: faker.random.uuid(),
    name: faker.commerce.product(),
    parent: Math.random() > .5 && data.techniques.length > 0
      ? data.techniques.sort(() => .5 - Math.random())[0].id
      : undefined,
    artworks: []
  })
}

// supports
for (let i = 0; i < 10; i++) {
  data.supports.push({
    id: faker.random.uuid(),
    name: faker.commerce.productMaterial(),
    parent: Math.random() > .5 && data.supports.length > 0
      ? data.supports.sort(() => .5 - Math.random())[0].id
      : undefined,
    artworks: []
  })
}

// collections
for (let i = 0; i < 20; i++) {
  let isAnonymous = Math.random() < .9
  data.collections.push({
    id: faker.random.uuid(),
    anonymous: isAnonymous,
    name: isAnonymous ? null : 'Collection ' + faker.name.findName(),
    description: isAnonymous ? null : faker.lorem.paragraph(),
    artworks: []
  })
}

// tags
for (let i = 0; i < 50; i++) {
  let name = faker.random.word()
  data.tags.push({
    name: name,
    description: Math.random() > .7 ? faker.lorem.paragraph() : '',
    artworks: []
  })
}

const attributeSome = (arr, max, artworkId) => {
  let items = arr
    .sort(() => .5 - Math.random())
    .slice(0, faker.random.number({ 'min': 0, 'max': max }))
    items.forEach(item => item.artworks.push(artworkId))
    return items
}

// artworks
for (let i = 0; i < 50; i++) {
  let id = faker.random.uuid(),
    w = faker.random.number({ 'min': 5, 'max': 200 }),
    r = Math.random() < .2 ? 1 : Math.random() + .5,
    h = Math.round(w * r)

  let cat = ''
  if (Math.random() > .7) {
    cat = data.categories.sort(() => .5 - Math.random())[0]
    cat.artworks.push(id)
  }

  let collec = ''
  if (Math.random() > .3) {
    collec = data.collections.sort(() => .5 - Math.random())[0]
    collec.artworks.push(id)
  }

  let onsale = collec ? Math.random() > .9 : Math.random() > .1
  let price = 0
  if((onsale && collec && Math.random() > .9)
  || (onsale && !collec && Math.random() > .1))
    price = faker.commerce.price(10, 1000, 0)

  data.artworks.push({
    id: id,
    title: faker.commerce.productName(),
    date: new Date(faker.date.between('2011-01-01', new Date())),
    description: faker.lorem.paragraph(),
    width: w,
    height: h,
    techniques: attributeSome(data.techniques, 2, id).map(item => item.id),
    supports: attributeSome(data.supports, 2, id).map(item => item.id),
    tags: attributeSome(data.tags, 2, id).map(t => t.name),
    images: ['art', 'gallery', 'artist', 'brush', 'artist', 'color']
      .slice(0, faker.random.number({ 'min': 0, 'max': 6 }))
      .map((keyword, i) => {
        let iw = faker.random.number({ 'min': 800, 'max': 1500 }),
            ir = .5 + Math.random(),
            ih = !i ? Math.round(iw * r) : Math.round(iw * ir),
            itw = 600,
            ith = !i ? Math.round(itw * r) : itw
        return {
          full: {
            url: `https://loremflickr.com/${iw}/${ih}/painting,${keyword}/all?lock=${i}`,
            width: iw,
            height: ih,
          },
          thumb: {
            url: `https://loremflickr.com/${itw}/${ith}/painting,${keyword}/all?lock=${i}`,
            width: itw,
            height: ith,
          }
        }
      }),
    onsale: onsale,
    price: price,
    collection: collec ? collec.id : null,
    category: cat ? cat.id : null
  })
}

// remove unnecessary data
data.supports = data.supports.filter(t => t.artworks.length)
data.techniques = data.techniques.filter(t => t.artworks.length)
data.tags = data.tags.filter(t => t.artworks.length)
data.collections = data.collections.filter(t => t.artworks.length)

module.exports.data = data