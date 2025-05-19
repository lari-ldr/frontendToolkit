import axios from 'axios';

export default class MockService {
  getTree(search: string) {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search);
    }
    const uri = `${this.host()}/api/v1/tree`;
    return axios.get(uri, { params });
  }
  host() {
    return import.meta.env.VITE_BASE_URL;
  }
}
