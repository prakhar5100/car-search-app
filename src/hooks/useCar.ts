'use client'
import { useEffect, useState } from 'react';
import { Car } from '@/types/types';

export const useCar = (id: string) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        console.log(`/api/cars/${id}`)
        const res = await fetch(`/api/cars/${id}`);
        
        const data: Car = await res.json();
        setCar(data);
      } catch (error) {
        console.error('Failed to fetch car', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  return { car, loading };
};
