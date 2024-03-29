import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchProducts(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/fetchProducts', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProduct(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/fetchUser/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addProduct(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/addProduct', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    updateProduct(ctx, userData) {
        return new Promise((resolve, reject) => {
          axios
            .post('/api/addUser', { user: userData })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },

    deleteProduct(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/delete/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },       
  },
  
}