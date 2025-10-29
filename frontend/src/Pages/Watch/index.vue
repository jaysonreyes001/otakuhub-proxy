<template lang="">
  <div class="w-full mt-[50px]">

    <Video v-if="!video_loading" :episode_details="episode_details" />
    <div class="relative w-full h-[400px] md:h-[800px]" v-else>
      <span class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
        <span class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-20 h-20  inline-block  "></span>
      </span>
    </div>
    <div class="flex justify-center">
    <div class="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 px-2 lg:px-10 mt-[50px]">
      <div>
        <div>
          <p v-if="!loading" class="mt-5 text-lg font-semibold text-primary">{{anime_details.title}}</p>
          <div v-else role="status" class="max-w-sm animate-pulse">
              <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5 mt-5"></div>
              <span class="sr-only">Loading...</span>
          </div>
        </div>

          <div>
            <p v-if="single_episode && !video_loading" class="mt-4 text-3xl font-semibold">EP{{single_episode?.number}} - {{single_episode?.title}}</p>
            <div v-else role="status" class="max-w-sm animate-pulse">
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5 mt-5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span class="sr-only">Loading...</span>
          </div>
        </div>
        
        <div class="mt-4 flex gap-x-2">
          <div v-if="loading" role="status" class="max-w-sm animate-pulse">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[50px] mt-2 mb-4"></div>
              <span class="sr-only">Loading...</span>
          </div>
          <div v-else class="flex items-center text-gray-400 ">
            <Icon icon="mdi:play" class="text-xl"/>
            {{ anime_details.type }}
          </div>

          <span class="text-gray-400">•</span>

          <div v-if="loading" role="status" class="max-w-sm animate-pulse">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[50px] mt-2 mb-4"></div>
              <span class="sr-only">Loading...</span>
          </div>

          <div v-else class="flex items-center text-gray-400 ">
            {{ anime_details.subOrDub }}
          </div>

          <span class="text-gray-400">•</span>

          <div v-if="loading" role="status" class="max-w-sm animate-pulse">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[50px] mt-2 mb-4"></div>
              <span class="sr-only">Loading...</span>
          </div>
          <div v-else class="flex items-center text-gray-400 ">
            {{ anime_details.status }}
          </div>


          <span class="text-gray-400">•</span>

          <div v-if="loading" role="status" class="max-w-sm animate-pulse">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[50px] mt-2 mb-4"></div>
              <span class="sr-only">Loading...</span>
          </div>
          <div v-else class="flex items-center text-gray-400 ">
            {{ anime_details.season }}
          </div>
        </div>

        <div>
          <div v-if="loading" role="status" class="w-full  animate-pulse">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <span class="sr-only">Loading...</span>
          </div>
          <p v-else class="mt-3 text-sm text-gray-400 " :class="!show_more ? 'line-clamp-3' : '' ">{{anime_details.description}}</p>
        </div>

        <div v-if="!loading && show_more" class="mt-10 space-y-5 mb-5">
          <div class="grid grid-cols-2 gap-5">
              <div>
                <p class="text-xs md:text-sm font-medium text-gray-900  dark:text-white">
                    Japanse Title
                </p>
              </div>
              <div>
                <p class="text-right font-semibold text-gray-900 dark:text-white text-xs md:text-sm">{{anime_details.japaneseTitle}}</p>
              </div>
          </div>
          <hr/>
          <div class="grid grid-cols-2 gap-5">
              <div>
                <p class="text-xs md:text-sm font-medium text-gray-900  dark:text-white">
                    Total Episodes
                </p>
              </div>
              <div>
                <p class="text-right font-semibold text-gray-900 dark:text-white text-xs md:text-sm">{{anime_details.totalEpisodes}} Episode/s</p>
              </div>
          </div>
          <hr class="bg-slate-200 !h-[1px]"/>
          <div class="grid grid-cols-2 gap-5" v-if="anime_details.genres">
              <div>
                <p class="text-xs md:text-sm font-medium text-gray-900  dark:text-white">
                    Genres
                </p>
              </div>
              <div>
                <p class="text-right font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                  {{anime_details.genres.join(" • ")}}
                </p>
              </div>
          </div>
        </div>
          <button v-if="!loading" @click="show_more = !show_more" class="text-xs text-primary mt-5 mr-4">Show {{show_more ? 'less' : 'more'}}</button>
      </div>
      <div>
        <p class="text-xl font-semibold mb-2">Episode List</p>
        <ul v-if="!loading" class="lg:max-w-md divide-y divide-gray-200 dark:divide-slate-800 overflow-y-auto max-h-[700px]">
          <li @click="change_episode(episode)" 
          :class="episode.number == episode_details.number ? 'bg-slate-100 dark:bg-primary ' : '' " 
          class=" p-2 cursor-pointer transition dark:hover:bg-primary hover:bg-slate-100" v-for="(episode,index) in episode_list">
            <div class="flex  space-x-4 rtl:space-x-reverse">
                <div class="shrink-0">
                    <img class=" w-[60px] md:w-[180px] h-full md:h-[80px] object-cover" :src="anime_details.image"  alt="Neil image">
                </div>
                <div class="flex-1 min-w-0 mt-2">
                    <p :class="episode.number == episode_details.number ? 'text-black' : 'dark:text-white  text-gray-900'" class="text-xs md:text-base font-medium line-clamp-2">
                      EP{{episode.number}} - {{episode.title}}
                    </p>
                    <p :class="episode.number == episode_details.number ? ' text-gray-500 dark:text-gray-200' : 'dark:text-gray-400  text-gray-500'" class="text-xs md:text-sm truncate">
                        {{episode.isSubbed ? 'Sub' : ''}} {{episode.isSubbed && episode.isDubbed ? '|' : ''}} {{episode.isDubbed ? 'Dub' : ''}}
                    </p>
                </div>
              </div>
          </li>
        </ul>

        <div class="space-y-5" v-else>
            <div v-for="index in 3" role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div class="flex items-center justify-center w-full h-28 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                  <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                  </svg>
              </div>
              <div class="w-full">
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>
<script setup>

import Video from "@/Pages/Watch/video.vue";

import axios_instance from "@/plugin/axios.js";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute,useRouter } from 'vue-router';
const video_loading = ref(true);
const loading = ref(false);
const route = useRoute();
const router = useRouter();
const anime_details = ref({});
const episode_list = ref([]);
const single_episode = ref({});
const show_more = ref(false);
const episode_details = reactive({
  id:'',
  number: !route.params.episode_id  ? 1 : route.params.episode_id,
  intro:{},
  outro:{},
  source:[],
  subtitles:[],
});

const get_anime_info = async () => {
  loading.value = true;
  const anime_id = route.params.id;
  await axios_instance.get("/info",{params:{
    id:anime_id
  }})
  .then(function(response){
    anime_details.value = response.data;
    episode_list.value = response.data.episodes;
    episode_details.id = episode_details.number == '' ? episode_list.value[0].id : episode_list.value.find(item => item.number == episode_details.number)?.id;
    get_episode_info();
  })
  .catch(function(error){
    console.log(error)
  })
  loading.value = false;
}
const get_episode_info = async () => {
    video_loading.value = true;
    await axios_instance.get("/watch/"+ episode_details.id)
    .then(response => {
      const data = response.data;
      episode_details.intro = data.intro;
      episode_details.outro = data.outro;
      episode_details.source = data.sources;
      episode_details.subtitles = data.subtitles;
      single_episode.value = episode_list.value.find(item => item.number == episode_details.number);
    })
    .catch(error=>{
      console.log(error)
    })

    video_loading.value = false;
    
}

const change_episode =  (episode) => {
  episode_details.id = episode.id
  episode_details.number = episode.number;
  router.replace({name:'watch',params:{id:route.params.id,episode_id:''}})
  get_episode_info();
}

onMounted(()=>{
  get_anime_info();
})

</script>
<style lang="">
  
</style>