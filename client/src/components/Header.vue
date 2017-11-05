<template>
    <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4">
            <v-btn flat dark 
            @click="navigateTo({name: 'root'})">
            BoulderShare
            </v-btn>
        </v-toolbar-title>
        <v-toolbar-items>
            <v-btn flat datk>
                Browse
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <router-link to="register" class="btn cyan">
            <v-btn flat dark v-if="!$store.state.isUserLoggedIn"
            > Sign up
            </v-btn>
             </router-link>
            <router-link to="login" class="btn cyan">
            <v-btn flat dark v-if="!$store.state.isUserLoggedIn"
            > Log in
            </v-btn>
             </router-link>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
