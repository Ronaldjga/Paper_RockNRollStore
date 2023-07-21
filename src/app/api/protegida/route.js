import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    // console.log(session,'CONSOLE NA API PROTEGIDA')
    // const req = await fetch('http://localhost:3000/api/auth/callback/google')
    // const data = await req.json()
    // console.log(data,'CONSOLE NA API PROTEGIDA')
    if(!session) {
        return NextResponse.json({
            menssage: "Rota logada"
        })
    } else {
        return NextResponse.json({
            name: session.user.name
        })
    }
}