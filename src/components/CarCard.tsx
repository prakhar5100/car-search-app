import { Car, Fuel, Milestone, PaintBucket, Settings, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { useCart } from "@/hooks/CartContext"

export interface CarDetails {
  id: number
  make: string
  model: string
  year: number
  color: string
  mileage: number
  price: number
  fuelType: string
  transmission: string
  engine: string
  horsepower: number
  features: string[]
  owners: number
  image: string
}

export default function CarCard({ car }: { car: CarDetails }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(car.price)

  const formattedMileage = new Intl.NumberFormat("en-US").format(car.mileage)
  const {cart, addToCart, removeFromCart} = useCart()

  const handleCart = (car : CarDetails) => {

    if (cart.some(item => item.id === car.id)) {
      removeFromCart(car)
    }
    else {
      addToCart(car)
    }
    
  }


  return (
    <Card className="w-full max-w-md overflow-hidden flex flex-col justify-between">
      <div className="relative h-64 w-full">
        <img
          src={`/cars/${car.color}.jpg`}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {car.year} {car.make} {car.model}
            </h2>
            <span className="text-xl font-bold text-primary">{formattedPrice}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Milestone className="h-4 w-4 text-muted-foreground" />
            <span>{formattedMileage} miles</span>
          </div>
          <div className="flex items-center gap-2">
            <PaintBucket className="h-4 w-4 text-muted-foreground" />
            <span>{car.color}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 font-medium">Features</h3>
          <div className="flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
            <Button className="gap-2 cursor-pointer" onClick={() => handleCart(car)}>
              <ShoppingCart className="h-4 w-4" />
              {
                cart.some(item => item.id === car.id) ? 
                `Remove from Cart` : `Add to Cart`
              }
            </Button>
            <Link href={`/cars/${car.id}`} scroll={false} >
            <Button className="gap-2 cursor-pointer w-full">
              <Car className="h-4 w-4"></Car>
              Go to Car Page
            </Button>
            </Link>

          </CardFooter>

    </Card>
  )
}
