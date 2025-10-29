<script setup>
import axios_instance from '@/plugin/axios.js';
import { onMounted, ref } from 'vue';
import Image from "@/Pages/Components/Image.vue";

const data_list = ref([]);
const loading = ref(false);
const get_data = async () => {
  loading.value = true;
  await axios_instance.get("/recent-episodes")
  .then(function(response){
    data_list.value = response.data.results.slice(0,18);
  })
  .catch(function(error){
    console.log(error)
  })
  loading.value = false;
}

onMounted(()=>{
  get_data()
})
</script>

<template>
  <div>
    <div class="relative mt-10" v-if="!loading">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-x-2">
          <span class="inline-block h-[30px] w-[5px] bg-primary "></span>
           <h1 class="text-lg font-bold"> LATEST EPISODE</h1>
        </div>
        <router-link :to="{name:'list',params:{type:'recent-episodes'}}">
          <button class="transition hover:text-gray-200 flex items-center text-xs text-gray-500 font-semibold">VIEW ALL 
            <Icon class="ml-1" icon="material-symbols:arrow-forward-ios-rounded"/>
          </button>
        </router-link>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6  gap-y-10 gap-x-5">
        <div class="relative" v-for="(data,index) in data_list" :key="index">
            <router-link class="h-full" :to="{name:'watch',params:{id:data.id,episode_id:data.sub}}">
              <Image :url="data.image">
                <template #footer>
                  <p class="break-words text-sm lg:text-xl font-semibold mt-2">{{ data.title }}</p>
                    <div class="flex justify-between ">
                      <p class="text-gray-400 text-xs mt-1">Episode {{ data.sub }}</p>
                      <p class="text-gray-400 text-xs mt-1 ">{{ data.sub > 1 ? 'Sub' : '' }} 
                        {{ data.sub > 1 && data.dub > 1 ? '|' :'' }} 
                        {{ data.dub > 1 ? 'Dub' : '' }}  
                      </p>
                    </div>
                </template>
              </Image>
            </router-link>
          </div>
        </div>
    </div>
    <div class="relative h-[500px] lg:h-[200px]" v-else>
        <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <span class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
        </span>
    </div>
  </div>
</template>