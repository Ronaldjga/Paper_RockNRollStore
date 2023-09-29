import { ICart, IShirts } from "@/providers/data";

export  async function updateDb(data: IShirts[] | ICart[], update: 'cart' | 'wishlist') {
    const propertie = {[update]: data}
    console.log(propertie)
    const req = await fetch("/api/update", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(propertie)
    });
    const res = await req.json()
    console.log(res, 'REQUISIÇÃOoooooooooooooooooo POST')
}