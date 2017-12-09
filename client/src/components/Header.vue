<template>
    <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4">
            <v-btn flat dark 
            @click="navigateTo({name: 'root'})">
            BoulderShare
            </v-btn>
        </v-toolbar-title>
        <v-toolbar-items>
            <v-btn flat dark to="/routes">
                Browse
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat dark v-if="$store.state.isUserLoggedIn" @click="logout"> Log out
            </v-btn>
            <v-btn flat dark v-if="!$store.state.isUserLoggedIn" to="/register"
            > Sign up
            </v-btn>
            <v-btn flat dark v-if="!$store.state.isUserLoggedIn" to="/login"
            > Log in
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
