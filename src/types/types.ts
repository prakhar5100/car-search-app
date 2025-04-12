export interface Car {
    id : number,
    make : string,
    model : string,
    year : number,
    color : string,
    mileage : number,
    price : number,
    fuelType : string,
    transmission : string,
    engine : string,
    horsepower : number,
    features : string[]
    image : string,
    owners : number
}


export type Make = 
| 'Toyota'
| 'Honda'
| 'Ford'
| 'Chevrolet'
| 'Nissan'
| 'BMW'
| 'Tesla'
| 'Audi'
| 'Mercedes-Benz'
| 'Subaru'
| 'Lexus'
| 'Jeep'
| 'Kia'; 



export type Model = 
  | 'Corolla'
  | 'Civic'
  | 'Mustang'
  | 'Equinox'
  | 'Altima'
  | '3 Series'
  | 'Model 3'
  | 'Q5'
  | 'E-Class'
  | 'Tahoe'
  | 'Outback'
  | 'RX 350'
  | 'F-150'
  | 'CR-V'
  | 'RAV4'
  | 'Model Y'
  | 'Silverado'
  | 'Escape'
  | 'GLE 350'
  | 'X5'
  | '4 Series'
  | 'Accord'
  | 'Grand Cherokee'
  | 'Highlander'
  | 'Explorer'
  | 'Camaro'
  | 'A4'
  | 'Forester'
  | 'Fusion'
  | 'Telluride';

  export type Color = 
  | 'Silver'
  | 'White'
  | 'Red'
  | 'Blue'
  | 'Black'
  | 'Gray'
  | 'Green';