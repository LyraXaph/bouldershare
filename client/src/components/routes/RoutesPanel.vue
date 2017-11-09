<template>
        <panel title="Routes">
            <v-btn fab class="cyan accent-2" 
            absolute right middle
            slot="action" to="/routes/create">
            <v-icon>add</v-icon>
            </v-btn>
            <div v-for="problem in problems" :key="problem._id">
              <v-card>
                <v-card-media :src="'http://localhost:7777/uploads/' + problem.photo"  height="200px">
                 </v-card-media>
                 <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{problem.name}}</h3>
                        <div>{{problem.description}}</div>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat class="blue accent-2" >Share</v-btn>
                     <v-btn
                      dark
                      class="cyan"
                      :to="{
                        name: 'problem', 
                        params: {
                          slug: problem.slug
                        }
                      }">
                      View
                    </v-btn>
                    </v-card-actions>
              </v-card>
            </div>
        </panel>
</template>

<script>
import RoutesService from '@/services/RoutesService'
export default {
  data () {
    return {
      problems: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.problems = (await RoutesService.index(value)).data
      }
    }
  }
}
</script>