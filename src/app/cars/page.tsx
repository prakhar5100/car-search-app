'use client'

import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Page = () => {

  const {cart} = useCart()
  return (
    <div className="h-max flex flex-col">

      <div className="flex flex-col md:flex-row flex-1">
            <Sidebar className="w-full md:w-64 shrink-0" />

            <main className="flex-1 p-4 md:p-6">

                <div className="mb-6 flex justify-between">

                  <div className="">
                  <h1 className="text-2xl font-bold tracking-tight">All Cars</h1>
                  <p className="text-muted-foreground">Browse our collection of luxury cars</p>

                  </div>

                <Link href={`/cars/cart`} scroll={false}>
            
                <div className="relative">
                        <Badge className="absolute">{cart.length}</Badge>
                        <ShoppingCart size={50} />
                  </div>

                </Link>

                </div>

                <ProductGrid />

            </main>

      </div>
    </div>
  )
}

export default Page
