<template>
    <v-layout>
        <v-flex xs4>
            <panel title="Route Metadata">
                <v-text-field
                label="Name"
                required 
                :rules="[required]"
                v-model="name"
                ></v-text-field>
                <v-text-field
                label="Grade"
                required 
                :rules="[required]"
                v-model="grade"
                ></v-text-field>
                 <v-text-field
                label="Gym"
                v-model="gym"
                required 
                :rules="[required]"
                value="58c05fd08060197ca0b52d5a"
                ></v-text-field>
                
            </panel>
        </v-flex>
         <v-flex xs8>
            <panel title="Route description" class="ml-2">
                <v-text-field
                label="Description"
                multi-line
                v-model="description"
                ></v-text-field>
            </panel> 
            <div class="error-alert mt-2" v-if="error">{{error}}</div>   
              <v-btn class="cyan" dark
                @click="create"
                >Create</v-btn>  
         </v-flex>
    </v-layout>
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
        await RoutesService.post(this.route)
        this.$router.push()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
