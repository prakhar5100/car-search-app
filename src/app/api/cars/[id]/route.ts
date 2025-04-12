import { Car } from "@/types/types"

export async function GET(  request: Request, { params }: { params: { id: string } }) {
    const {id} = params
    console.log("id", id)
    const res = await fetch(`https://www.freetestapi.com/api/v1/cars/${id}`)
    const data: Car = await res.json()
    return Response.json(data)
}
