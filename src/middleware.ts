import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("next-auth.session-token")
    if((req.nextUrl.pathname.startsWith("/cart") || req.nextUrl.pathname.startsWith("/wishlist")) && !session){
        console.log('não tem sessãoooooooooooooooooooooooooo')
        return NextResponse.redirect(new URL("/login", req.url))
    }
    console.log('temmmmmmmmmmmmmmm sessãoooooooooooooooooooooooooooo')
    return null
}

export const config = {
    matcher: ["/cart", "/wishlist"]
}