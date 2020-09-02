
export default class RESTBaseAPI {

  constructor(options) {
    this.options = options
    this.resource = options.resource || options.name
  }

  getHost() {
    return '/'
  }

  fetch(id, options) {
    throw 'App API not implement!!!'
  }

  count(where = {}) {
    return this.fetch().then(ds => ds.length)
  }

  query(filter = {}, wheres = {}) {
    return this.fetch().then(ds => ({
      total: ds.length, items: ds.slice(filter.skip || 0, (filter.skip || 0) + parseInt(filter.limit || 15))
    }))
  }

  get(id = '') {
    return this.fetch(id)
  }

  delete(id) {
    return this.fetch(id, { method: 'DELETE' })
  }

  put(id, data) {
    return this.fetch(id, { method: 'PUT', body: JSON.stringify(data) }).then((item) => {
      return { ...data, ...item }
    })
  }

  patch(id, data) {
    return this.fetch(id, { method: 'PATCH', body: JSON.stringify(data) }).then((item) => {
      return { ...data, ...item }
    })
  }

  post(data) {
    return this.fetch(null, { method: 'POST', body: JSON.stringify(data) }).then((item) => {
      return { ...data, ...item }
    })
  }

  save(data, partial) {
    if (data.id) {
      let id = data.id
      if(partial) {
        return this.patch(id, data)
      }
      return this.put(id, data)
    } else {
      return this.post(data)
    }
  }
}
