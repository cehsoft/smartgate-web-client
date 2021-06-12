import axios, { AxiosInstance } from "axios";

class HTTP {
  static instance: HTTP;
  client: AxiosInstance;

  constructor() {
    if (!HTTP.instance) {
      this.client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_HOST,
      });

      HTTP.instance = this;
    }
    // console.log("created HTTP instance:", process.env.NEXT_PUBLIC_API_HOST);

    return HTTP.instance;
  }

  setToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
HTTP.instance = undefined;

const http = new HTTP();
Object.freeze(http);

export { http };
