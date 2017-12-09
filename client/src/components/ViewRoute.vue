<template>
   <v-layout> 
       <v-flex xs6>
            <panel :title="problem.name">
                <v-card>
                    <v-card-media :src="'http://localhost:7777/uploads/' + problem.photo" height="600px">
                        </v-card-media>
                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{problem.name}}</h3>
                            <div>{{problem.description}}</div>
                        </div>
                        </v-card-title>
                        <v-card-actions>
                        <v-btn flat class="blue accent-2" >Share</v-btn>
                        <v-btn dark class="cyan"
                            :to="{
                            name: 'problem-edit', 
                            params: {
                                slug: problem.slug
                            }
                        }">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </panel>
            
       </v-flex>
   </v-layout>
</template>

<script>
import RoutesService from '@/services/RoutesService'

export default {
  data () {
    return {
      problem: {}
    }
  },
  async mounted () {
    const problemSlug = this.$store.state.route.params.slug
    this.problem = (await RoutesService.show(problemSlug)).data
  }
}
</script>

<style>

</style>
