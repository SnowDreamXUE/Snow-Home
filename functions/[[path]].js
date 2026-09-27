// SPA 路由回退 - 兼容 Cloudflare Pages 与 EdgeOne Pages 两种运行时
//
// 判定逻辑（两个平台一致）：
//   1. 静态资源 / API / 首页 → 交给平台静态资源服务
//   2. /404.html、/404 → 返回 404 页面
//   3. 其余路径（/projects、/about 等）→ 返回 index.html，由 Vue Router 接管
//
// 平台差异：
//   - Cloudflare Pages：context.env.ASSETS 绑定可读取静态资源，context.next() 走默认静态流程
//   - EdgeOne Pages：context 只有 request/params/env/waitUntil，无 ASSETS 和 next()；
//     根级 catch-all 会拦截除 / 外的所有请求（含静态资源），需通过 fetch 子请求
//     命中边缘缓存或回源获取静态资源（官方文档：函数子请求访问节点缓存/回源）

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  const staticFileExtensions = /\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot|webp|mp4|webm|pdf|txt|xml)$/i;
  const isStaticFile = staticFileExtensions.test(pathname);
  const isApi = pathname.startsWith('/api/');
  const is404Page = pathname === '/404.html' || pathname === '/404';
  const isHome = pathname === '/' || pathname === '/index.html';

  // 1. Cloudflare Pages：存在 ASSETS 绑定，走 CF 的静态资源管道
  if (context.env && context.env.ASSETS && typeof context.env.ASSETS.fetch === 'function') {
    if (isStaticFile || isApi || isHome) {
      return context.next();
    }
    if (is404Page) {
      return context.env.ASSETS.fetch(new URL('/404.html', url.origin));
    }
    return context.env.ASSETS.fetch(new URL('/index.html', url.origin));
  }

  // 2. EdgeOne Pages：无 ASSETS 绑定，通过 fetch 子请求获取静态资源
  if (is404Page) {
    return fetch(new URL('/404.html', url.origin).href);
  }
  if (isApi || isStaticFile || isHome) {
    return fetch(new URL(pathname, url.origin).href);
  }

  // 3. 其余路径回退到 index.html，由前端路由接管
  return fetch(new URL('/index.html', url.origin).href);
}
