import axios from 'axios';
// const BASE_URL = 'http://localhost:8081/api/';
const BASE_URL = 'http://157.90.19.32:8081/api/';
const getFetcher = (url) =>
    axios.get(BASE_URL + 'admin/' + url).then((res) => res.data);
const adminPostReqHandler = (url, data) =>
    axios({
        method: 'POST',
        url: BASE_URL + 'admin/' + url,
        data: {...data},

        headers: {
            Authorization: 'Bearer xxx',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.data);

export {getFetcher, adminPostReqHandler};
