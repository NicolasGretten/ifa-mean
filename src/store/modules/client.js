import Vue from 'vue'

const namespaced = true

const state = {
    client: {},
    clients: [
    ],
    loading: false
}

const mutations = {
    UPDATE_CLIENT(state, payload){
        state.client = payload
    },
    UPDATE_CLIENTS(state, payload){
        state.clients = payload
    },
    UPDATE_LOADING(state, payload){
        state.loading = payload
    }
}

const actions = {
    getClients({commit}) {
        commit('UPDATE_LOADING', true)
        return Vue.axios.get('/clients').then((response) => {
            commit('UPDATE_CLIENTS', response.data)
            commit('UPDATE_LOADING', false)
        })
    },
    getClient({commit}, id) {
        commit('UPDATE_LOADING', true)
        return Vue.axios.get('/clients/'+ id).then((response) => {
            commit('UPDATE_CLIENT', response.data)
            commit('UPDATE_LOADING', false)
        })
    },

    saveClient({commit}, payload) {

        commit('UPDATE_LOADING', true)
        if (payload._id) {
            const id = payload._id

            return Vue.axios.patch(`/clients/${id}`, payload).then((response) => {
                commit('UPDATE_CLIENT', response.data)
                commit('UPDATE_LOADING', false)
            })

        } else {
            return Vue.axios.post(`/clients`, payload).then((response) => {
                commit('UPDATE_CLIENT', response.data)
                commit('UPDATE_LOADING', false)
            })
        }
    },

    deleteClient({commit}, id){
        commit('UPDATE_LOADING', true)

        return Vue.axios.delete('/clients/'+ id).then((response) => {

            console.log(response.data)
            commit('UPDATE_LOADING', false)
        })
    }
}

const getters = {
    getFiveLatestClients: (state) => {
        return state.clients.slice(0, 5)
    }
}


export {
    namespaced,
    state,
    mutations,
    actions,
    getters
}