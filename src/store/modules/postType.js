const state = {
  postType: {}
}

// commits
const commits = {
  POST_TYPE: 'POST_TYPE'
}

// mutations
const mutations = {
  [commits.POST_TYPE](state, postType) {
    state.postType = postType
  }
}

// actions
const actions = {
  async POST_TYPE({ state, commit }, postType) {
    commit(commits.POST_TYPE, postType)
  }
}

export default {
  state,
  actions,
  mutations
}
