<template>
  <v-app>
    <v-main>
      <GeneralView/>
    </v-main>
  </v-app>
</template>

<script>
import GeneralView from './pages/GeneralView.vue'

export default {
  name: 'App',

  components: {
    GeneralView,
  },

  data: () => ({
    //
  }),
}
</script>
