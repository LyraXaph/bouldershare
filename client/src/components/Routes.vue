<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
        <panel title="Routes">
                    <v-btn fab class="cyan accent-2" 
                    absolute right middle
                    slot="action" to="/routes/create">
                    <v-icon>add</v-icon>
                    </v-btn>
            <div v-for="route in routes" :key="route._id">
              <v-card>
                <v-card-media :src="'http://localhost:7777/uploads/' + route.photo"  height="200px">
                 </v-card-media>
                 <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{route.name}}</h3>
                        <div>{{route.description}}</div>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions>
              </v-card>
            </div>
        </panel>
     </v-flex>
   </v-layout>
</template>

<script>
import RoutesService from '@/services/RoutesService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      routes: null
    }
  },
  async mounted () {
    this.routes = (await RoutesService.index()).data
  }
}
</script>