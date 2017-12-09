<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
     <panel title="Login">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
          label="Email"
          v-model="email"
          ></v-text-field>
          <v-text-field
          label="Password"
          type="password"
          v-model="password"
          ></v-text-field>
          <div v-html="error" class="error"></div>
          <div v-html="message"></div>
          <v-btn class="cyan" dark
          @click="login"
          >Log in </v-btn>                    
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
      email: '',
      password: '',
      error: null,
      message: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.message = response.data.message
        // console.log(response.data.user)
        // console.log(response.data.token)
      } catch (error) {
        this.error = error.response.data.message
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
