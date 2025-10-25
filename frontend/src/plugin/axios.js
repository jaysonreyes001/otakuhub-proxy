import axios from "axios";
const axios_instance = axios.create({
    baseURL: 'https://animuwatchapi.vercel.app/anime/zoro',
});


export default axios_instance;