const state = {
  targetInfo: {}
}

const commits = {
  TARGET_INFO: 'TARGET_INFO'
}

const mutations = {
  [commits.TARGET_INFO](state, targetInfo) {
    state.targetInfo = targetInfo
  }
}

const actions = {
  async TARGET_INFO({ state, commit }, updates) {
    commit(commits.TARGET_INFO, updates)
  }
}

export default {
  state,
  actions,
  mutations
}
