<template lang="">
     <div>
          <Search v-if="route.params.type == 'search'"/>
          <List v-else />
     </div>
</template>
<script setup>
import Search from './search.vue';
import List from "./list.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<style lang="">
     
</style>