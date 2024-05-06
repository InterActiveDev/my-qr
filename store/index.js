export const state = () => ({
    cartItems: []
  })
  
  export const mutations = {
    setCartItems(state, items) {
      state.cartItems = items
    }
  }
  
  export const actions = {
    loadCartItems({ commit }) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
      commit('setCartItems', cartItems)
    }
  }