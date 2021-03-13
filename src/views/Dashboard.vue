<template>
  <b-container>
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2 mt-3"></i>Dashboard</h3>
      </b-col>
      <b-col class="d-flex justify-content-end align-items-end">
        <b-button variant="light" class="mr-2" to="/editclient/0"><i class="fas fa-plus circle mr-2" />Ajout d'un client</b-button>
        <b-button variant="light" to="/editbill/0"><i class="fas fa-plus circle mr-2" />Ajout d'une facture</b-button>
      </b-col>
    </b-row>
    <hr>

    <b-row class="mb-4">
      <b-col lg="5">
        <b-card class="shadow p-3 h-100">
          <h2><strong>{{ totalBills }}</strong> factures en 2021</h2>
          <doughnut
              ref="skills_chart"
              :chart-data="chartData"
              :options="options">
            </doughnut>
          <b-row class="d-flex mt-3">
            <b-col lg="8">
              <p><i class="far fa-circle" style="color:#4e81d5"></i> Encaissée - {{ numberPaid() }}%</p>
              <p><i class="far fa-circle" style="color:#f9c784"></i> En attente - {{ numberWaiting() }}%</p>
              <p><i class="far fa-circle" style="color:#ff6f6f"></i> Relance - {{ numberRevival() }}%</p>



            </b-col>
            <b-col  lg="4">
              <h5><strong>{{  allBillsAmount  }}€</strong></h5>
            </b-col>


          </b-row>

        </b-card>
      </b-col>

      <b-col lg="7">
        <b-card class="shadow p-3 h-100" title="Dernières Factures">
          <b-table
              id="bills-table"
              stacked="lg"
              :fields="billFields"
              :items="fiveLatestBills">

            <template #cell(name)="">
            </template>

            <template #cell(actions)="row">
              <b-button variant="light" size="md" :to="{ name: 'edition-facture', params: { id: row.item._id } }">
                <i class="fa-fw fas fa-pen mr-2" /> Modifier
              </b-button>
            </template>

          </b-table>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="d-flex justify-content-end">

      <b-col lg="7">
        <b-card class="shadow p-3 mb-4" title="Derniers clients">
          <b-table
              id="clients-table"
              stacked="lg"
              :fields="clientFields"
              :items="fiveLatestClients">

            <template #cell(name)="">
            </template>

            <template #cell(actions)="row">
              <b-button variant="light" size="md" :to="{ name: 'edition-client', params: { id: row.item._id } }">
                <i class="fa-fw fas fa-pen mr-2" /> Modifier
              </b-button>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'
import moment from "moment";
import Doughnut from '../components/Doughnut'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: false
  }
}

export default {
  name: 'Dashboard',
  components: { Doughnut },
  data() {
    return {
      options,
      chartData:
        {
          labels: ['Encaissée', 'En attente', 'Relance'],
          datasets: [
            {
              backgroundColor: ['#4e81d5','#f9c784','#ff6f6f'],
              data: [this.numberPaid(),this.numberWaiting(),this.numberRevival()]
            }
          ],
        },
      clientFields:[
        {
          key: 'firstname',
          label: 'Nom',
          class: 'cell-name',
          sortable: true,
          formatter: (value, key, item)=>{
            return (item.firstname + ' ' + item.lastname)
          }
        },
        {
          key: 'company',
          label: 'Entreprise',
          class: 'cell-company',
          sortable: true
        },
        {
          key: 'addedAt',
          label: 'Date d\'ajout',
          class: 'cell-added-at',
          sortable: false,
          formatter: (value, key, item) => {
            return moment(String(item.addedAt)).format('DD/MM/YYYY')
          }
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'cell-actions',
          sortable: false
        }
      ],
      billFields:[
        {
          key: 'billNumber',
          label: 'N°',
          class: 'cell-idbill',
          sortable: true,
          formatter: (value, key, item)=>{
            return ('Facture ' + moment(String(item.date)).format('YYYY-MM'))
          }
        },
        {
          key: 'client',
          label: 'Client',
          class: 'cell-client',
          sortable: true,
          formatter: (value, key, item)=>{
            return (item.client.firstname + ' ' + item.client.lastname)
          }
        },
        {
          key: 'montantHT',
          label: 'Montant HT',
          class: 'cell-montant-ht',
          sortable: false,
          formatter: (value, key, item) => {
            return (this.getTotalHTForBill(item)).toFixed(2) + ' HT'
          }
        },
        {
          key: 'montantTTC',
          label: 'Montant TTC',
          class: 'cell-montant-ttc',
          sortable: false,
          formatter: (value, key, item) => {
            return (this.getTotalTTCForBill(item)).toFixed(2) + ' TTC'
          }
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'cell-actions',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapState({
      bills: state => state.bill.bills,
      clients: state=>state.client.clients
    }),

    ...mapActions('client', ['getClients']),
    ...mapActions('bill', ['getBills']),

    ...mapGetters({
      fiveLatestBills: 'bill/getFiveLatestBills',
      fiveLatestClients: 'client/getFiveLatestClients',
      totalBills: 'bill/totalBills',
      allBillsAmount: 'bill/allBillsAmount',
    }),
  },
  methods: {
    ...mapGetters({
      numberPaid: 'bill/numberPaid',
      numberRevival: 'bill/numberRevival',
      numberWaiting: 'bill/numberWaiting'
    }),
    getTotalHTForBill(item){
      let total = 0
      if(item.prestations.length > 0){
        for (const prestation of item.prestations) {
          if(prestation.qty > 0) {
            let calc = prestation.qty * prestation.price
            total += calc
          }
        }
      }
      total -= item.discount

      return total
    },
    getTotalTTCForBill(item){
      const totalHT = this.getTotalHTForBill(item)
      const totalTVA = item.tva ? (totalHT * item.tvaRate) / 100 : 0

      return totalTVA + totalHT
    }
  },
  created() {
    this.getBills
    this.getClients
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>