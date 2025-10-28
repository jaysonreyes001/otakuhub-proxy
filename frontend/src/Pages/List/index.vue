<template lang="">
     <div>
          <Search v-if="route.params.type == 'search'"/>
          <List v-else-if="route.params.type == 'recent-episodes'" />
          <Genre v-else/>
     </div>
</template>
<script setup>
import Genre from './genre.vue';
import Search from './search.vue';
import List from "./list.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<style lang="">
     
</style>