import axios from "axios";

const API_URL = 'http://localhost:3333'

const $api = axios.create({
    baseURL: API_URL,
})


$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})



export const s3Config = {
    region: 'ru-1',
    accessKeyId: 'cg16553',
    secretAccessKey: '_qxibxfrhvti38urusxu_pbbuprmqwc_',
    endpoint: 'https://s3.timeweb.com',
    s3ForcePathStyle: true,
    apiVersion: 'latest'
}



export default $api