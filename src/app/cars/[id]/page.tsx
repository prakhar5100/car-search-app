"use client"

import { Car, Check, Fuel, Loader2, Milestone, PaintBucket, Settings, ShoppingCart, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCar } from "@/hooks/useCar"
import { useCart } from "@/hooks/CartContext"
import { CarDetails } from "@/components/CarCard"


type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { id } = params
  const {cart, addToCart, removeFromCart} = useCart()

  const {car, loading} = useCar(id)


  if (loading) return 
  <Card className="flex items-center justify-center p-6">
  <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
  <p className="ml-4 text-lg">Loading car details...</p>
  </Card>
;
  if (!car) return <div>Car not found.</div>;

  
    const handleCart = (car : CarDetails) => {
  
      if (cart.some(item => item.id === car.id)) {
        removeFromCart(car)
      }
      else {
        addToCart(car)
      }
      
    }

    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(car.price)
  
    const formattedMileage = new Intl.NumberFormat("en-US").format(car.mileage)
  
  


  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <img
              src={`/cars/${car.color}.jpg`}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="h-full w-full object-cover"
              style={{ aspectRatio: "16/9" }}
            />
          </div>

          <Card className="p-4">
            <h3 className="mb-2 text-lg font-medium">Key Specifications</h3>
            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-muted-foreground" />
                <span>{car.engine}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-muted-foreground" />
                <span>{car.horsepower} hp</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-muted-foreground" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span>{car.transmission}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              {car.year} {car.make} {car.model}
            </h1>
            <p className="mt-2 text-muted-foreground">
              ID: {car.id} • {car.owners} {car.owners === 1 ? "Owner" : "Owners"}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-background p-4">
            <div className="text-3xl font-bold text-primary">{formattedPrice}</div>
            <Button className="gap-2 cursor-pointer" onClick={() => handleCart(car)}>
              <ShoppingCart className="h-4 w-4" />
              {
                cart.some(item => item.id === car.id) ? 
                `Remove from Cart` : `Add to Cart`
              }
            </Button>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold">Vehicle Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Milestone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p>{formattedMileage} miles</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PaintBucket className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p>{car.color}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Previous Owners</p>
                  <p>{car.owners}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="mb-3 text-xl font-semibold">Features</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="mb-3 text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">
              This {car.year} {car.make} {car.model} comes in a beautiful {car.color.toLowerCase()} color with only{" "}
              {formattedMileage} miles. It features a powerful {car.engine} engine producing {car.horsepower}{" "}
              horsepower, paired with a smooth {car.transmission.toLowerCase()} transmission. With just {car.owners}{" "}
              previous {car.owners === 1 ? "owner" : "owners"}, this vehicle has been well-maintained and is ready for
              its next home.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
