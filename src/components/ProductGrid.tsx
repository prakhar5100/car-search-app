import { useData } from "@/hooks/DataContext";
import CarCard from './CarCard'
import { Card } from "./ui/card";
import { Loader2 } from "lucide-react";

const ProductGrid = () => {
    const {loading, filteredData} = useData()

    if (loading) {
      return (
        <Card className="flex items-center justify-center p-6 w-full h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="ml-4 text-lg">Loading car details...</p>
      </Card>

      )
    }
  return (
    <div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((product) => (
        <CarCard key={product.id} car={product}/>
      ))}
        </div>
      
    </div>
  )
}

export default ProductGrid
