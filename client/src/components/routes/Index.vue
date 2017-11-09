<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
        <routes-search-panel class="mt-2" />
        <routes-panel class="mt-2"/>
     </v-flex>
   </v-layout>
</template>

<script>
import RoutesPanel from './RoutesPanel'
import RoutesSearchPanel from './RoutesSearchPanel'
import RoutesService from '@/services/RoutesService'
export default {
  components: {
    RoutesPanel,
    RoutesSearchPanel
  },
  data () {
    return {
      problems: null
    }
  },
  async mounted () {
    this.problems = (await RoutesService.index()).data
  }
}
</script>