  'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react"
import { Car} from "@/types/types"

export type Filters = {
  make?: string[]
  model?: string[]
  fuelType?: string[]
  color?: string[]
  minPrice?: number
  maxPrice?: number
  sortBy?: "name" | "price"
  sortOrder?: "asc" | "desc"
  minhorsepower?: number
  maxhorsepower?: number
}
type DataContextType = {
  filteredData: Car[]
  updatedFilters: (newFilters: Partial<Filters>) => void
  clearFilters: () => void
  filters: Filters
  loading : boolean
}

const DataContext = createContext<DataContextType | null>(null)

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error("useData must be used inside DataProvider")
  return context
}

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [originalData, setOriginalData] = useState<Car[]>([])
  const [filteredData, setFilteredData] = useState<Car[]>([])
  const [filters, setFilters] = useState<Filters>({make : [], model : [], color : [], fuelType : [], minPrice : 20000, maxPrice : 55000})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/cars")
        if (!res.ok) throw new Error("Failed to fetch cars")
  
        const data: Car[] = await res.json()
        setOriginalData(data)
        setFilteredData(data)
      } catch (error) {
        console.error("Error fetching cars:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchData()
  }, [])
  useEffect(() => {
    let updated = [...originalData]

    if (filters.make && filters.make.length > 0) {
      updated = updated.filter((item) => filters.make?.includes(item.make))
    }
    if (filters.model && filters.model.length > 0) {
        updated = updated.filter((item) => filters.model?.includes(item.model))
      }

      if (filters.color && filters.color.length > 0) {
        updated = updated.filter((item) => filters.color?.includes(item.color))
      }
      if (filters.fuelType && filters.fuelType.length > 0) {
        updated = updated.filter((item) => filters.fuelType?.includes(item.fuelType))
      }
    
    if (filters.minPrice) {
      updated = updated.filter((item) => item.price > filters.minPrice!)
    }
    if (filters.maxPrice) {
      updated = updated.filter((item) => item.price < filters.maxPrice!)
    }
    if (filters.minhorsepower) {
      updated = updated.filter((item) => item.horsepower > filters.minhorsepower!)
    }
    if (filters.maxhorsepower) {
      updated = updated.filter((item) => item.horsepower < filters.maxhorsepower!)
    }
    if (filters.sortBy) {
      updated.sort((a, b) => {
        const field = filters.sortBy as keyof Car
        const order = filters.sortOrder === "desc" ? -1 : 1
        if (a[field] < b[field]) return -1 * order
        if (a[field] > b[field]) return 1 * order
        return 0
      })
    }

    setFilteredData(updated)
  }, [filters, originalData])


  const updatedFilters = useCallback((data: Partial<Filters>) => {
    setFilters((prev) => {
      const isSame = Object.entries(data).every(
        ([key, value]) => prev[key as keyof Filters] === value
      );
      if (isSame) return prev;
      return { ...prev, ...data };
    });
  }, []);

  const clearFilters = () => {
    setFilters({})
  }

  return (
    <DataContext.Provider
      value={{
        filteredData,
        updatedFilters,
        clearFilters,
        filters,
        loading
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
