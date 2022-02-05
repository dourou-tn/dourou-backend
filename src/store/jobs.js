export default {
  namespaced: true,

  state: {
    jobs: [],
    types: [],
    states: [],
  },

  getters: {
    get: (state) => state.jobs,
    getTypes: (state) => state.types,
    getStates: (state) => state.states,
  },

  actions: {
    async getTypes ({ commit }) {
      const res = await window.Axios.get('/jobs/types');
      commit('SET_TYPES', res.data);
    },
    async getStates({ commit }) {
      const res = await window.Axios.get('/jobs/states');
      commit('SET_STATES', res.data);
    },

    async get({ commit }) {
      const res = await window.Axios.get('/jobs')
      commit('SET_JOBS', res.data)
    },

    async create({ commit }, pack) {
      const res = await window.Axios.post('/jobs', pack);
      if (res.status === 200) {
        commit('ADD_JOB', res.data)
      }
      return res.status;
    },

    async edit(_, job) {
      if (job.id) {
        const res = await window.Axios.put(`/jobs/${job.id}`, job);
        return res.status;
      }
    },

    async delete({ commit }, jobId) {
      const res = await window.Axios.delete(`/jobs/${jobId}`);
      if (res.status === 200) {
        commit('DELETE_JOB', jobId)
      }
      return res.status;
    }
  },

  mutations: {
    SET_TYPES (state, types) {
      state.types = types;
    },
    SET_STATES (state, states) {
      state.states = states;
    },
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
    ADD_JOB(state, pack) {
      state.jobs.push(pack);
    },
    DELETE_JOB(state, packId) {
      state.jobs = state.jobs.filter((u) => u.id !== packId)
    }
  }
}
