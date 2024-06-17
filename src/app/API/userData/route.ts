import { NextResponse, NextRequest } from "next/server";


export async function GET(request: any){
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    let url = ""
    if (address) {
        url = `https://api.github.com/users/${address}`;
    } else {
        url = "https://api.github.com/users"
    }

    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json({data})

}