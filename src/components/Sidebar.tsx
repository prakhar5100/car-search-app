import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filters, useData } from "@/hooks/DataContext";
import { cn } from "@/lib/utils";
import MultiRangeSlider from "./multirangeslider";
import { SortAscIcon, SortDescIcon } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const makes: string[] = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "BMW",
    "Tesla",
    "Audi",
    "Mercedes-Benz",
    "Subaru",
    "Lexus",
    "Jeep",
    "Kia",
  ];

  const models: string[] = [
    'Corolla',
    'Civic',
    'Mustang',
    'Equinox',
    'Altima',
    '3 Series',
    'Model 3',
    'Q5',
    'E-Class',
    'Tahoe',
    'Outback',
    'RX 350',
    'F-150',
    'CR-V',
    'RAV4',
    'Model Y',
    'Silverado',
    'Escape',
    'GLE 350',
    'X5',
    '4 Series',
    'Accord',
    'Grand Cherokee',
    'Highlander',
    'Explorer',
    'Camaro',
    'A4',
    'Forester',
    'Fusion',
    'Telluride',
  ];

  const colors: string[] = [
    'Silver',
    'White',
    'Red',
    'Blue',
    'Black',
    'Gray',
    'Green',
  ]
  
  const fuelType: string[] = [
    "Gasoline" , "Diesel" , "Electric"
  ]
  

  const {filters, updatedFilters, clearFilters} = useData()

   type FilterKey = keyof Pick<Filters, "make" | "model" | "color" | "fuelType">

  const handleCheckboxChange = (value: FilterKey, item: string) => {
    const currentValues = filters[value] ?? []
  
    if (currentValues.includes(item)) {
      updatedFilters({
        [value]: currentValues.filter((i) => i !== item),
      })
    } else {
      updatedFilters({
        [value]: [...currentValues, item],
      })
    }
  }
  

  return (
    <aside className={cn("p-4 md:p-6 border-r", className)}>
      <div className="space-y-6">
        <div>

          <div className="w-full flex justify-between">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="flex gap-2">
            <SortAscIcon className="cursor-pointer" onClick={() => updatedFilters({sortBy : "price", sortOrder : "asc"})}/>
            <SortDescIcon className="cursor-pointer" onClick={() => updatedFilters({sortBy : "price", sortOrder : "desc"})}/>
            </div>
          

          </div>
          <Accordion type="multiple">
            <AccordionItem value="Make">
              <AccordionTrigger>Make</AccordionTrigger>
              <AccordionContent>
              <div className="space-y-2" >  

                {makes.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox 
                      id={`${item}`}
                      onCheckedChange={() => handleCheckboxChange("make", item)}
                      />
                      <Label htmlFor={`${item}`}>{item}</Label>
                    </div>
                ))}

             </div>

              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Model">
              <AccordionTrigger>Model</AccordionTrigger>
              <AccordionContent>
              <div className="space-y-2" >

                {models.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox 
                      id={`${item}`}
                      onCheckedChange={() => handleCheckboxChange("model", item)}
                      />
                      <Label htmlFor={`${item}`}>{item}</Label>
                    </div>
                ))}

             </div>

              </AccordionContent>
            </AccordionItem>


            <AccordionItem value="Colors">
              <AccordionTrigger>Colors</AccordionTrigger>
              <AccordionContent>
              <div className="space-y-2" >

                {colors.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox 
                      id={`${item}`}
                      onCheckedChange={() => handleCheckboxChange("color", item)}
                      />
                      <Label htmlFor={`${item}`}>{item}</Label>
                    </div>
                ))}

             </div>

              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="FuelType">
              <AccordionTrigger>FuelType</AccordionTrigger>
              <AccordionContent>
              <div className="space-y-2" >

                {fuelType.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox 
                      id={`${item}`}
                      onCheckedChange={() => handleCheckboxChange("fuelType", item)}
                      />
                      <Label htmlFor={`${item}`}>{item}</Label>
                    </div>
                ))}

             </div>

              </AccordionContent>
            </AccordionItem>


            <AccordionItem value="Price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>

                  <MultiRangeSlider 

                    min={20000}
                    max={55000}
                    onChange={({ min, max }) => {
                      updatedFilters({minPrice : min, maxPrice : max})
                    }}

                  />

              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Horsepower">
              <AccordionTrigger>Horsepower</AccordionTrigger>
              <AccordionContent>

                  <MultiRangeSlider 

                    min={158}
                    max={455}
                    onChange={({ min, max }) => {
                      updatedFilters({minhorsepower : min, maxhorsepower : max})
                    }}

                  />

              </AccordionContent>
            </AccordionItem>


          </Accordion>

          <Button onClick={clearFilters} className="my-6 w-full">
            Clear All Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}
