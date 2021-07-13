const state = {
  userInfo: {}
}

// commits
const commits = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  CLEAR_USER_INFO: 'CLEAR_USER_INFO'
}

// mutations
const mutations = {
  [commits.UPDATE_USER_INFO](state, updates) {
    state.userInfo = {
      ...state.userInfo,
      ...updates
    }
  },

  [commits.CLEAR_USER_INFO](state) {
    state.userInfo = {}
  }
}

// actions
const actions = {
  async updateUserInfo({ state, commit }, updates) {
    commit(commits.UPDATE_USER_INFO, updates)
  }
}

export default {
  state,
  actions,
  mutations
}
