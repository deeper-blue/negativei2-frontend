import axios from 'axios';

export const serverURL = 'https://negativei2-server.herokuapp.com/';

const server = axios.create({baseURL: serverURL});
export default server;