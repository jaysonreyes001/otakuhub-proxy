<template lang="">
  <div>
    <SlideCarousel/>
    <div class="px-0 lg:px-10">
      <topAiring/>
      <latest/>
      <img class="mt-[100px]" src="@/assets/images/banner.jpg"/>
    </div>
  </div>
</template>
<script setup>
import SlideCarousel from '@/Pages/Home/slide.vue';
import topAiring from './top-airing.vue';
import latest from './latest.vue';
</script>
<style lang="">
  
</style>