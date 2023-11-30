import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const sessionDev = await req.cookies.get("next-auth.session-token");
    const sessionProd = await req.cookies.get("__Secure-next-auth.session-token");
    const session = sessionProd || sessionDev
    if((req.nextUrl.pathname.startsWith("/cart") || req.nextUrl.pathname.startsWith("/wishlist")) && !session){
        return NextResponse.redirect(new URL("/login", req.url))
    }
    return null
}

export const config = {
    matcher: ["/cart", "/wishlist"]
}