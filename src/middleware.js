import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Access-Control-Allow-Origin", "*");
  requestHeaders.set("Access-Control-Allow-Methods", process.env.CORS_ALLOWED_METHODS);
  requestHeaders.set("Referrer-Policy", process.env.CORS_REFERRER_POLICY);
 
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/api/:path*',
}
