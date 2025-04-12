"use client"

import { Car, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/CartContext"
import Link from "next/link"

interface CarDetails {
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


const CartItem = ({
  car,
  onDelete,
}: {
  car: CarDetails | null
  onDelete: () => void
}) => {

  if (!car) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Failed to load car details</p>
      </Card>
    )
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(car.price)

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="h-48 w-full sm:h-auto sm:w-48">
          <img
            src={`/cars/${car.color}.jpg`}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">
              {car.year} {car.make} {car.model}
            </h3>
            <Button variant="ghost" size="icon" onClick={onDelete} className="text-destructive">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Color:</span>
              <span>{car.color}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Engine:</span>
              <span>{car.engine}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Transmission:</span>
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Mileage:</span>
              <span>{new Intl.NumberFormat("en-US").format(car.mileage)} miles</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">ID: {car.id}</span>
            </div>
            <div className="text-xl font-bold text-primary">{formattedPrice}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function CartPage() {
  const {cart, removeFromCart} = useCart()

  return (
    <div className="container mx-auto px-8 py-8 min-h-screen w-full flex flex-col">
      <h1 className="mb-6 text-3xl font-bold">Your Cart ({cart.length} items)</h1>

      {cart.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-xl font-medium">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add some cars to your cart to see them here.</p>
          <Button className="mt-4">Browse Cars</Button>
        </div>
      ) : (
            <div className="space-y-4 h-screen overflow-scroll w-full">
              {cart.map((car, index) => (
                <Link href={`/cars/${car.id}`} key={index}>
                <CartItem
                  
                  car={car}
                  onDelete={() => removeFromCart(car)}
                />
                </Link>
              ))}
            </div>

      )}
    </div>
  )
}
