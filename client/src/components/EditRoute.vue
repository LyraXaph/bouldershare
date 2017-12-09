<template>
    <v-layout>
        <v-flex xs4>
            <panel title="Route Metadata">
                <div class="form-group" :class="{'has-error': errors.has('route.name') }">
                  <v-text-field label="Name" v-model="route.name" data-rules="required|route.name"
                  v-validate="route.name"></v-text-field>
                  <p class="text-danger" v-if="errors.has('route.name')">{{ errors.first('route.name') }}</p>
                </div>
                <v-text-field
                label="Grade"
                required 
                :rules="[required]"
                v-model="route.grade"
                ></v-text-field>
                 <v-text-field
                label="Gym"
                v-model="route.gym"
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
                v-model="route.description"
                ></v-text-field>
            </panel> 
            <div class="error-alert mt-2" v-if="error">{{error}}</div>   
              <v-btn class="cyan" dark
                @click="save"
                >Save</v-btn>  
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
    async save () {
      this.error = null
      const areAllFieldsFilled = Object
      .keys(this.route)
      .every(key => !!this.route[key])
      if (!areAllFieldsFilled) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await RoutesService.put(this.route)
        this.$router.go(-1)
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const problemSlug = this.$store.state.route.params.slug
      this.route = (await RoutesService.show(problemSlug)).data
      // TODO get gym name this.route.gym = (await )
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
