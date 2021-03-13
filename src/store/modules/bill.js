import Vue from 'vue'

const namespaced = true

const state = {
  bill: {},
  bills: [
  ],
  loading: false
}

const mutations = {
  // met à jour l'état de bill
  UPDATE_BILL(state, payload){
    state.bill = payload
  },
  UPDATE_BILLS(state, payload){
    state.bills = payload
  },
  UPDATE_LOADING(state, payload){
    state.loading = payload
  }
}

const actions = {
  //permet de récupérer la liste des factures
  getBills({commit}) {
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise) 
    // on utilise return pour utiliser la promesse dans le composant
    return Vue.axios.get('/bills').then((response) => {
      // console.log(response.data)

      // on déclenche la mutation des données une fois le résultat récupéré
      commit('UPDATE_BILLS', response.data)
      commit('UPDATE_LOADING', false)
    })
    
  },
  //permet de récupérer les données d'une facture en fonction d'un id
  getBill({commit}, id) {
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise)
    return Vue.axios.get('/bills/'+ id).then((response) => {
      // console.log(response.data)
      // on déclenche la mutation des données une fois le résultat récupéré
      commit('UPDATE_BILL', response.data)
      commit('UPDATE_LOADING', false)
    })
  },

  //permet de récupérer les données d'une facture en fonction d'un id
  saveBill({commit}, payload) {

    commit('UPDATE_LOADING', true)
    //s'il y a un id, on modifie une facture existante
    if (payload._id) {
      //l'id de la bill qu'on veut enregistrer
      const id = payload._id
      
      return Vue.axios.patch(`/bills/${id}`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_BILL', response.data)
        commit('UPDATE_LOADING', false)
      })

    //sinon, création d'une nouvelle facture
    } else {
      return Vue.axios.post(`/bills`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_BILL', response.data)
        commit('UPDATE_LOADING', false)
      })
    }
  },

  deleteBill({commit}, id){
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise)
    
    return Vue.axios.delete('/bills/'+ id).then((response) => {
      
      console.log(response.data)
      commit('UPDATE_LOADING', false)
    })
  }
}

// les getters sont comme des computed values pour le store.state
const getters = {
  getFiveLatestBills: (state) => {
    return state.bills.slice(0, 5)
  },
  totalBills: (state) => {
    return state.bills.length
  },
  allBillsAmount: (state) => {
    let allBillsTotal = 0;

    state.bills.forEach((bill)=>{
      let total = 0
      if(bill.prestations.length > 0){
        for (const prestation of bill.prestations) {
          if(prestation.qty > 0) {
            let calc = prestation.qty * prestation.price
            total += calc
          }
        }
      }
      total -= bill.discount
      const totalTVA = bill.tva ? (total * bill.tvaRate) / 100 : 0

      allBillsTotal += totalTVA + total
    })
    return allBillsTotal
  },
  numberPaid: (state) => {
    let paid = 0
    state.bills.forEach((bill)=>{
      if(bill.allPaid === true){
         paid ++;
      }
    })
    let number =  (paid / state.bills.length)*100;
    return parseFloat( number.toFixed(1) )
  },
  numberWaiting: (state) => {
    let waiting = 0
    state.bills.forEach((bill)=>{
      if(bill.waiting === true){
        waiting ++;
      }
    })
    let number = (waiting / state.bills.length)*100;
    return parseFloat( number.toFixed(1) )
  },
  numberRevival: (state) => {
    let revival = 0
    state.bills.forEach((bill)=>{
      if(bill.revival === true){
        revival ++;
      }
    })

    let number = (revival / state.bills.length)*100
    return parseFloat( number.toFixed(1) )
  },
}


export {
  namespaced,
  state,
  mutations,
  actions,
  getters
}