/**
 * 配置编译环境和线上环境之间的切换
 *
 *
 * : 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let http_url = '';
let routerMode = 'history';
let imgBaseUrl = 'http://images.cangdu.org/';
let BaseUrl = 'http://10.20.1.1/';


if (process.env.NODE_ENV == 'development') {

  baseUrl = 'http://cangdu.org:8001';

} else if (process.env.NODE_ENV == 'production') {

  baseUrl = 'http://cangdu.org:8001';

}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}
