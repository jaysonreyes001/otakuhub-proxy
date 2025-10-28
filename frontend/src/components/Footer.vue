<script setup>
import { onMounted, ref } from "vue";
import Separator from "./ui/separator/Separator.vue";
import { useColorMode } from "@vueuse/core";
import axios_instance from '@/plugin/axios.js';
const mode = useColorMode();


const genres = ref([]);
const genres_cache = localStorage.getItem('genres');
console.log(genres_cache);
const load_generes = async() => {
  await axios_instance.get('/genre/list')
  .then(function(response){
    genres.value = response.data;
    localStorage.setItem('genres',JSON.stringify(genres.value));
  })
  .catch(error=>{
    console.log(error)
  })
}

onMounted(()=>{
  if(!genres_cache){
      load_generes();
  }
  else{
    genres.value = JSON.parse(genres_cache);
  }
})

</script>

<template>
  <footer
    id="footer"
    class="container lg:max-w-screen-2xl !px-[0px] py-20 pb-16 sm:py-32 sm:pb-24"
  >
    <div class="p-10 bg-muted/50 dark:bg-card border rounded-2xl">
      <div
        class="grid grid-cols-1 lg:grid-cols-3"
      >
        <div class="hidden lg:block">
          <a
            href="#"
            class="flex font-bold items-center"
          >
            <img class="w-[180px] h-[100px] rounded-lg"  v-if="mode == 'dark'" src='@/assets/images/logo-dark.png' />
          <img class="w-[180px] h-[100px] rounded-lg" v-else src='@/assets/images/logo-light.png' />
          </a>
        </div>
        <div class="cols-span-1 lg:col-span-2">
          <h3 class="font-bold text-base lg:text-lg mb-2">Genres</h3>
          <div class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-1 lg:gap-5">
            <div v-for="(genre,index) in genres" :key="index">
              <router-link
                :to="{name:'list',params:{type:genre}}"
                class="opacity-60 hover:text-primary capitalize text-xs lg:text-base"
              >
                {{ genre }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <Separator class="my-6" />
      <section class="text-center">
        <h3 class="">
          &copy; 2025
          <a
            target="_blank"
            href="#"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            otakuhub
          </a>
        </h3>
      </section>
    </div>
  </footer>
</template>
