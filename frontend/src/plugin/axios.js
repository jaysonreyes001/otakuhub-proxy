import axios from "axios";
const axios_instance = axios.create({
    baseURL: 'https://otakuhub-api-rose.vercel.app/anime/zoro',
});


export default axios_instance;