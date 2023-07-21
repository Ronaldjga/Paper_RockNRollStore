import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { notificationsList } from '@/providers/data';


export async function POST(res:NextRequest) {
    const body = await res.json();
    const notification = body 
    const newNotification = {
        id: Date.now(),
        notification: notification,
    }
    console.log(notification)
    return new Response(JSON.stringify(newNotification), {status: 200, headers: {'content-type': 'application/json'}})
    // notificationsList.push(newNotification)
    // return NextResponse.json(newNotification)
    // res.status(201).json(newNotification)
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(notificationsList)
    //   const myreq = req.body
    //   console.log(myreq, 'CONSOLE LOG DA APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
    //   return NextResponse.json(req)
  }