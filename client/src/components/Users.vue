<template>
  <div>
    <div v-for="(user, index) in users"> 
      {{ user.name }} 
       <v-btn flat class="blue accent-2" @click="deleteUser(user._id, index)" >Delete</v-btn> 
    </div>
  </div>
</template>

<script>
import AuthenticationService from './../services/AuthenticationService'
export default {
  data () {
    return {
      users: ''
    }
  },
  async mounted () {
    try {
      this.users = (await AuthenticationService.getUsers(this.$store.state.token)).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    deleteUser (userId, index) {
      try {
        AuthenticationService.deleteUser(this.$store.state.token, userId)
        this.users.splice(index, 1)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
    
</style>
