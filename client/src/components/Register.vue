<template>
 <div>
   <h1>
    Register
   </h1>
   <input type="name" name="name" placeholder="name" v-model="name"/>
   <br>
   <input type="email" name="email" placeholder="email" v-model="email"/>
   <br>
   <input type="password" name="password" placeholder="password" v-model="password"/>
   <br>
   <input type="password" name="confirmPassword" placeholder=" confirm password" v-model="confirmPassword"/>
   <br>
    <button 
      @click="register"
      >Register</button>
  </div>

 
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
