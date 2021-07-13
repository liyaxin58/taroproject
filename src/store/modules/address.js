const state = {
  addressList: [],
  selectedAddressId: null
}

// mutations
const mutations = {
  SET_ADDRESS_LIST(state, list) {
    state.addressList = list
  },

  SELECT_ADDRESS(state, addressId) {
    state.selectedAddressId = addressId
  }
}

// actions
const actions = {
  setAddressList({ commit }, list) {
    commit('SET_ADDRESS_LIST', list)
  },

  selectAddress({ commit }, addressId) {
    commit('SELECT_ADDRESS', addressId)
  }
}

export default {
  state,
  actions,
  mutations
}
