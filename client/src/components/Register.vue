<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
       <panel title="Register">
          <div class="pl-4 pr-4 pt-2 pb-2">
             <v-text-field
             label="Name"
             v-model="name"
             ></v-text-field>
             <v-text-field
             label="E-mail"
             v-model="email"
             ></v-text-field>
             <v-text-field
              label="Password"
              v-model="password"
              type="password"
             ></v-text-field>
             <v-text-field
              label="Confirm password"
              type="password"
              v-model="confirmPassword"
             ></v-text-field>
             <br>
             <div v-html="error" class="error">
             </div>
             <div v-html="message"></div>
             <br>
             <v-btn class="cyan" dark
              @click="register"
              >Register</v-btn>  
            </div>
       </panel>                 
    </v-flex>
   </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      message: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.message = response.data.message
      } catch (error) {
        console.log(error.response.data)
        this.error = error.response.data.map(elem => elem.msg).join('<br>')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
