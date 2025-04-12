import { Car } from "@/types/types";

export async function GET() {
    const res = await fetch("https://www.freetestapi.com/api/v1/cars");
    const data : Car[] = await res.json()
    return Response.json(data)
}

    



