import axios from 'axios'
 
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API
 
export const addErrorInfo = (data: any) => axios.post('/error-info', data).then(res => res.data);
 
export const getList = (data: any) => axios.get('/error-info', { params: data }).then(res => res.data);
 
export const delErrorInfo = (data: any) => axios.delete(`/error-info/${data.id}`).then(res => res.data);
 
export const updateErrorInfo = (data: any) => axios.patch(`/error-info/${data.id}`, data).then(res => res.data);