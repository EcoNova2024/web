// app/components/ProductSlider.tsx
"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"

// Shadcn stil ve bileşenlerini içe aktar
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Ürün türünü tanımlama
type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

// Bileşen için props türü
interface ProductSliderProps {
  products: Product[]
}

// Slider bileşeni
const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  return (
    <Swiper
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      spaceBetween={10}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="product-slider"
    >
      {products.map((product, idx) => (
        <SwiperSlide key={idx}>
          <Card className="flex flex-col items-center mb-12">
            <CardHeader>
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="w-full h-48 object-cover rounded"
              />
            </CardHeader>
            <CardContent className="text-center">
              <h2 className="text-lg font-bold">{product.name}</h2>
            </CardContent>
            <CardFooter className="flex justify-between items-center w-full">
              <p className="text-lg font-semibold mt-2">${product.price}</p>
              <Button>Satın Al</Button>
            </CardFooter>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductSlider
