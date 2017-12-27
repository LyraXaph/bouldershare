<template>
  <v-container>  
    <v-layout row>
      <v-flex xs12>
        <h4>Create a new route</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs4>
            <panel title="Route Metadata">
                <v-text-field
                label="Name"
                required 
                :rules="[required]"
                v-model="route.name"
                ></v-text-field>
                <v-text-field
                label="Grade"
                required 
                :rules="[required]"
                v-model="route.grade"
                ></v-text-field>
                <v-select
                v-bind:items="gyms"
                v-model="route.gym"
                label="Gym"
                required
                autocomplete
                value="58c05fd08060197ca0b52d5a"
                ></v-select>
            </panel>
        </v-flex>
         <v-flex xs8>
            <panel title="Route description" class="ml-2">
                <v-text-field
                label="Description"
                multi-line
                v-model="route.description"
                ></v-text-field>
            </panel> 
            <div class="error-alert mt-2" v-if="error">{{error}}</div>   
              <v-btn class="cyan" dark
                @click="create"
                >Create</v-btn>  
         </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RoutesService from '@/services/RoutesService'
export default {
  data () {
    return {
      route: {
        name: null,
        description: null,
        grade: null,
        gym: null
      },
      error: null,
      gyms: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilled = Object
        .keys(this.route)
        .every(key => !!this.route[key])
      if (!areAllFieldsFilled) {
        this.error = 'Please fill in all the required fields'
        return
      }
      try {
        await RoutesService.post(this.route, this.$store.state.token)
        this.$router.push('/routes')
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      this.gyms = (await RoutesService.getGyms(null, this.$store.state.token)).data
      .map(gym => { return {'text': gym.name, 'value': gym._id} })
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
