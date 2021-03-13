<template>
  <!-- template du composant (HTML) -->
  <b-container id="app">
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2" />{{ form._id ? 'Editer':'Créer' }} un client</h3>

      </b-col>
      <b-col class="d-flex justify-content-end align-items-end">
        <b-button variant="light" class="mr-2" to="/editclient/0"><i class="fas fa-plus circle mr-2" />Nouveau client</b-button>
        <b-button variant="light" to="/editbill/0"><i class="fas fa-plus circle mr-2" />Nouvelle facture</b-button>
      </b-col>

    </b-row>
    <hr />
    <b-card class="shadow p-3">
      <h4 class="mb-3">Contact:</h4>
      <b-row>
        <b-col lg="4">
          <b-form-group
              id="fieldset-clientfirstname"
              label="Prénom:"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientfirstname"
          >
            <b-form-input id="clientfirstname"  v-model="form.firstname"/>
          </b-form-group>
          <b-form-group
              id="fieldset-clientfunction"
              label="Fonction:"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientfunction"
          >
            <b-form-input id="clientfunction" v-model="form.function"/>
<!--            <b-form-select-->
<!--                id="client"-->
<!--                :options="clients" />-->
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group
              id="fieldset-clientlastname"
              label-cols-md="4"
              content-cols-md="8"
              label="Nom:"
              label-for="clientlastname"
          >
            <b-form-input id="clientlastname" v-model="form.lastname"></b-form-input>
          </b-form-group>

          <b-form-group
              id="fieldset-phone"
              label-cols-md="4"
              content-cols-md="8"
              label="Téléphone:"
              label-for="phone"
          >
            <b-form-input id="phone" v-model="form.phone"></b-form-input>
          </b-form-group>

          <b-form-group
              v-if="form.tva"
              id="fieldset-tvarate"
              label-cols-md="3"
              content-cols-md="3"
              label="Taux de TVA:"
              label-for="tvarate"
          >
            <b-form-select id="tvarate" v-model="form.tvaRate" :options="rates"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group
              id="fieldset-clientadded"
              label="Date d'ajout:"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientadded"
          >
            <b-form-datepicker
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                id="formdate"
                v-model="form.addedAt" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="8">
          <b-form-group
              id="fieldset-email"
              label="Email:"
              label-cols-lg="2"
              content-cols-lg="10"
              label-for="email"
          >
            <b-form-input id="email"  v-model="form.email"/>
          </b-form-group>
          <b-form-group
              id="fieldset-company"
              label="Entreprise:"
              label-cols-lg="2"
              content-cols-lg="10"
              label-for="company"
          >
            <b-form-input id="company" v-model="form.company"/>
            <!--            <b-form-select-->
            <!--                id="client"-->
            <!--                :options="clients" />-->
          </b-form-group>
        </b-col>
      </b-row>

      <div class="mx-n2 mt-4">
        <h4 class="mb-3">Coordonnées:</h4>
        <b-row>
          <b-col lg="8">
            <b-form-group
                id="fieldset-address1"
                label="Adresse 1:"
                label-cols-lg="2"
                content-cols-lg="10"
                label-for="address1"
            >
              <b-form-input id="address1"  v-model="form.address.address_line_1"/>
            </b-form-group>
            <b-form-group
                id="fieldset-address2"
                label="Adresse 2:"
                label-cols-lg="2"
                content-cols-lg="10"
                label-for="address2"
            >
              <b-form-input id="address2" v-model="form.address.address_line_2"/>
              <!--            <b-form-select-->
              <!--                id="client"-->
              <!--                :options="clients" />-->
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group
                id="fieldset-zipcode"
                label="Code Postal:"
                label-cols-lg="4"
                content-cols-lg="8"
                label-for="zipcode"
            >
              <b-form-input id="zipcode"  v-model="form.address.zip_code"/>
            </b-form-group>
            <b-form-group
                id="fieldset-country"
                label="Pays:"
                label-cols-lg="4"
                content-cols-lg="8"
                label-for="country"
            >
<!--              <b-form-input id="clientfunction" v-model="form.function"/>-->
              <b-form-select
                  id="country"
                  v-model="form.address.country"
                  :options="country"
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
                id="fieldset-city"
                label-cols-md="4"
                content-cols-md="8"
                label="Ville:"
                label-for="city"
            >
              <b-form-input id="city" v-model="form.address.city"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <hr>
      <b-row>
        <b-col>
          <b-button variant="danger" @click="onDeleteClient()">Supprimer</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button variant="primary" @click="onSaveClient()">Enregister</b-button>
        </b-col>
      </b-row>

    </b-card>

    <b-form-checkbox class="my-4" v-model="debug" name="debug" switch>Debug</b-form-checkbox>

    <pre v-if="debug" class="debug card border-primary bg-dark text-light p-4">
      Form: {{ form }}
      Client (du store): {{ client }}
      </pre>

  </b-container>

</template>


<script>

import { mapState, mapActions } from 'vuex'
import moment from 'moment'

const newClient = {
  firstname: '',
  lastname: '',
  phone: '',
  function: '',
  email: '',
  company: '',
  addedAt: moment().format(),
  address: {
    address_line_1: '',
    address_line_2: '',
    zip_code: '',
    city: '',
    country: ''
  }
}


// controleur du composant
export default {
  name: 'EditClient',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  //data dans un composant Vue doit être une fonction qui retourne un objet
  data() {
    return {
      debug: false,
      country: [
        { text: 'FRANCE', value: 'FRANCE' },
        { text: 'LUXEMBOURG', value: 'LUXEMBOURG' },
        { text: 'BELGIQUE', value: 'BELGIQUE' }
      ],
      form: {}
    }
  },
  computed: {
    ...mapState({
      client: state => state.client.client
    }),
  },
  methods: {
    ...mapActions('client', ['getClient', 'saveClient', 'deleteClient']),

    onDeleteClient() {

      console.log(this.form)
      // on appelle la méthode du store (grâce à mapActions)
      //on pourrait également appeler this.$store.dispatch('client/deleteClient', this.form.id)
      this.deleteClient(this.form._id)

      //une fois la donnée enregistrée dans le store
      //je redirige l'utilisateur vers la liste avec le router
      this.$router.push({name: 'clients'})
    },

    onSaveClient() {
      // on appelle la méthode du store (grâce à mapActions)
      //on pourrait également appeler this.$store.dispatch('client/saveClient', this.form)
      this.saveClient(this.form).then(() => {
        //une fois la donnée enregistrée dans le store
        //je redirige l'utilisateur vers la liste avec le router
        this.$router.push({name: 'clients'})
      })

    },
  },
  created() {
    //se déclenche à l'instantiation du composant
    //en fait dès qu'on arrive sur la route editclient
    if(!this.id || this.id == 0 || this.id == -1) {
      this.form = { ...newClient }
    } else {
      this.getClient(this.id).then(()=>{
        this.form = this.client
      })
    }
  }
}
</script>
