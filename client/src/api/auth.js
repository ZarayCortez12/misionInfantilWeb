import axios from "./axios"

export const registerRequest =  (user) => axios.post(`/registerDocente`, user)

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequet = () => axios.get('/verify');

export const getUsuariosRequest = () => axios.get("/usuarios");
