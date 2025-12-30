// Cloudflare Pages Function - 处理 SPA 路由回退
// 此文件会拦截所有请求，对于 SPA 路由返回 index.html

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // 1. 如果是静态资源文件，直接放行
  const staticFileExtensions = /\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot|webp|mp4|webm|pdf|txt|xml)$/i;
  if (staticFileExtensions.test(pathname)) {
    return context.next();
  }

  // 2. 如果是 API 路由，直接放行
  if (pathname.startsWith('/api/')) {
    return context.next();
  }

  // 3. 如果请求 404.html，直接返回（保持独立的 404 页面）
  if (pathname === '/404.html') {
    return context.next();
  }

  // 4. 如果请求根路径或 index.html，直接返回
  if (pathname === '/' || pathname === '/index.html') {
    return context.next();
  }

  // 5. 对于所有其他路径（/projects, /about 等），返回 index.html
  // 这样 Vue Router 就能接管路由
  try {
    return context.env.ASSETS.fetch(new URL('/index.html', url.origin));
  } catch (error) {
    // 如果出错，返回 404
    return new Response('Not Found', { status: 404 });
  }
}

