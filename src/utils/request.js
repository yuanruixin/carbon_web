import axios from "axios"
import nProgress from "nprogress"



export class Request {
  instance
  baseConfig = { baseURL: "", timeout: 5000 }

  constructor(config) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config) => {

        nProgress.start()
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem("token")
        if (token) {
          config.headers.Authorization = token;
        }

        return config;
      }, (err) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      })
    this.instance.interceptors.response.use(
      (res) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        nProgress.done()

        return res.data;
      },
      (err) => {
        console.log("err", err);

        // 这里用来处理http常见错误，进行全局提示
        let message = "";
        //  请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        if (err.response) {
          switch (err.response.status) {
            case 400:
              message = "请求错误(400)";
              break;
            case 401:
              message = "未授权，请重新登录(401)";
              // 这里可以做清空storage并跳转到登录页的操作
              break;
            case 403:
              message = "拒绝访问(403)";
              break;
            case 404:
              message = "请求出错(404)";
              break;
            case 408:
              message = "请求超时(408)";
              break;
            case 500:
              message = "服务器错误(500)";
              break;
            case 501:
              message = "服务未实现(501)";
              break;
            case 502:
              message = "网络错误(502)";
              break;
            case 503:
              message = "服务不可用(503)";
              break;
            case 504:
              message = "网络超时(504)";
              break;
            case 505:
              message = "HTTP版本不受支持(505)";
              break;
            default:
              message = `连接出错(${err.response.status})!`;
          }
        } else if (err.request) {
          // 请求已经成功发起，但没有收到响应
          // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
          // 而在node.js中是 http.ClientRequest 的实例
          console.log(err.request);
        } else {
          // 发送请求时出了点问题
          console.log('Error', err.message);
        }


        console.log(message);

        // 这里错误消息可以使用全局弹框展示出来
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
      }
    );
  }
  // 定义请求方法
  request(config) {
    return this.instance.request(config);
  }

  get(url,config ) {
    return this.instance.get(url, config);
  }

  post( url,data,config ) {
    return this.instance.post(url, data, config);
  }

  put(url,data, config) {
    return this.instance.put(url, data, config);
  }

  delete( url,  config ) {
    return this.instance.delete(url, config);
  }
}
// 默认导出Request实例
export default new Request({})