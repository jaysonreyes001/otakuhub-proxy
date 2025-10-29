<template lang="">
     <div>
           <!-- Pagination -->
          <nav class="flex items-center justify-center lg:justify-end gap-x-1 mt-10 lg:mt-0" aria-label="Pagination">
               <button :disabled="props.current_page <= 1 ? true : false" @click="page_change(current_page-=1)" type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                         <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <span class="hidden lg:block">Previous</span>
               </button>

               <div class="flex items-center gap-x-1">
                    <button v-if="props.current_page  > 3" @click="page_change(1)" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                         py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                         dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                         1
                    </button>
                    
                    <div v-for="page in page_numbers">
                         <button  v-if="page == props.current_page" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm 
                         rounded-lg focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white 
                         dark:focus:bg-neutral-500" aria-current="page">{{page}}</button>
                         <button @click="page_change(page)" v-else type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                              py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                              dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">{{page}}
                         </button>
                    </div>

                    <button v-if="props.current_page != props.total_pages" @click="page_change(props.total_pages)" type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 
                         py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none 
                         dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                         {{props.total_pages}}
                    </button>
               </div>

               <button :disabled="props.current_page >= props.total_pages ? true : false" @click="page_change(current_page+=1)"  type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Next">
                    <span class="hidden lg:block">Next</span>
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                         <path d="m9 18 6-6-6-6"></path>
                    </svg>
               </button>

          </nav>
     <!-- End Pagination -->
     </div>
</template>
<script setup>
import { onMounted, ref,watch } from 'vue';
const emit = defineEmits(['page_change']);
const props = defineProps({
     current_page:{
          type:Number,
          default:1
     },
     total_pages:{
          type:Number,
          default:0
     }
});
const current_page = ref(props.current_page);
const page_numbers = ref(0);

const pages = () => {
     page_numbers.value = [...prev_page(),props.current_page,...next_page()];
}
const prev_page = () => {
     let page_arr = [];
     for (let index = props.current_page -1 ; props.current_page - 2 <= index; index--) {
          if(index < 1){
               break;
          }
          page_arr.push(index)
     }
     return page_arr.reverse();
}
const next_page = () => {
     let page_arr = [];
     for (let index = props.current_page + 1 ; props.current_page + 2 >= index; index++) {
          if(index >= props.total_pages){
               break;
          }
          page_arr.push(index)
     }
     return page_arr;
}

const page_change = (page) => {
     emit('page_change',page);
}

watch(()=>props.current_page,(newV,oldV) => {
     current_page.value = newV;
     pages();
})

onMounted(()=>{
     pages();
})

</script>
<style lang="">
     
</style>