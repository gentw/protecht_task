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
    viewProduct(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/viewProduct/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }, 
    addProduct(ctx, productData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/addProduct', productData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    updateProduct(ctx, productData) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/api/updateProduct/${productData.id}`, productData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },


    deleteProduct(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/deleteProduct/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },       
  },
  
}