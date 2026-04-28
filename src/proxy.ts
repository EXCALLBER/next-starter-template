import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function proxy(request: NextRequest) {
    const cookie = request.cookies.get('token');
    if (!cookie?.value) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    return response;
}

export const config = {
    matcher: "/api/((?!login).*)",
}
