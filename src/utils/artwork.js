import arrayToSentence from "array-to-sentence";

export default class Artwork {

  constructor(data) {
    this.data = data;
  }

  description(options) {
    const opt = Object.assign({
      author: true,
      title: true,
      date: true,
      medium: true,
      dimensions: true,
      collection: true,
    }, options)
    let infos = []
    if(opt.author)
      infos.push(`John Oliver-Doe`)
    if(opt.title && this.data.title)
      infos.push(`<em>${this.data.title}</em>`)
    if(opt.date && this.date)
      infos.push(this.date)
    if(opt.medium && this.medium)
      infos.push(this.medium)
    if(opt.dimensions && this.dimensions)
      infos.push(this.dimensions)
    if(opt.collection && this.collection)
      infos.push(this.collection)
    return arrayToSentence(infos, {
      separator: '; ', lastSeparator: '; '
    })
  }

  get dimensions() {
    if(this.data.width && this.data.height && !this.data.depth) {
      return `${this.data.width}x${this.data.height}cm`
    }
    let dims = []
    if(this.data.width) dims.push(`width ${this.data.width} cm`)
    if(this.data.height) dims.push(`height ${this.data.height} cm`)
    if(this.data.depth) dims.push(`depth ${this.data.depth} cm`)
    return arrayToSentence(dims, {
      separator: ',', lastSeparator: ' and '
    })
  }

  get date() {
    if(!this.data.date) return
    return new Date(this.data.date).getFullYear()
  }

  get medium() {
    if(!this.techniques && !this.supports) return
    let medium = ''
    if(this.techniques) medium += this.techniques
    if(this.techniques && this.supports) medium += ' on '
    if(this.supports) medium += this.supports
    return medium
  }

  get techniques() {
    if(!this.data.techniques.length) return
    return arrayToSentence(this.data.techniques.map(t => t.title))
  }

  get supports() {
    if(!this.data.supports.length) return
    return arrayToSentence(this.data.supports.map(t => t.title))
  }

  get collection() {
    if(!this.data.collection) return 'artist collection'
    if(this.data.collection.anonymous) return 'private collection'
    return this.data.collection.name
  }
}