import axios from "axios";

const BASE_URL = "https://api.kuvera.in/api/v3";

class Service {
  //method to make api request
  async makeRequest(method, endpoint, data = null) {
    try {
      let result = await axios({
        method: method,
        url: `${BASE_URL}/${endpoint}`,
        data: data,
      });
      return result.data;
    } catch (error) {
      console.log("service makeRequest error", error);
      return Promise.reject(error);
    }
  }

  // add methods to makeRequest
  async getFunds() {
    return this.makeRequest("get", "funds.json");
  }

  async getFundDetail(code) {
    return this.makeRequest("get", `funds/${code}.json`);
  }
}

export default {
  install(Vue) {
    const apiService = new Service();
    Vue.prototype.$service = apiService;
    Vue.service = apiService;
  },
};
