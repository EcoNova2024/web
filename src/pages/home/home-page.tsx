// app/page.tsx
import ProductSlider from "@/components/home-slider"
import React from "react"

// Ürün verilerini tanımlama
const products = [
  {
    id: "1",
    name: "Ürün 1",
    description: "Bu, harika bir ürün açıklamasıdır.",
    price: 29.99,
    image: "/image.png",
  },
  {
    id: "2",
    name: "Ürün 2",
    description: "Bu, başka bir harika ürün açıklamasıdır.",
    price: 49.99,
    image: "/image.png",
  },
  {
    id: "1",
    name: "Ürün 1",
    description: "Bu, harika bir ürün açıklamasıdır.",
    price: 29.99,
    image: "/image.png",
  },
  {
    id: "2",
    name: "Ürün 2",
    description: "Bu, başka bir harika ürün açıklamasıdır.",
    price: 49.99,
    image: "/image.png",
  },
  {
    id: "1",
    name: "Ürün 1",
    description: "Bu, harika bir ürün açıklamasıdır.",
    price: 29.99,
    image: "/image.png",
  },
  {
    id: "2",
    name: "Ürün 2",
    description: "Bu, başka bir harika ürün açıklamasıdır.",
    price: 49.99,
    image: "/image.png",
  },
  {
    id: "1",
    name: "Ürün 1",
    description: "Bu, harika bir ürün açıklamasıdır.",
    price: 29.99,
    image: "/image.png",
  },
  {
    id: "2",
    name: "Ürün 2",
    description: "Bu, başka bir harika ürün açıklamasıdır.",
    price: 49.99,
    image: "/image.png",
  },
  // Diğer ürünleri burada ekleyebilirsin
]

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-xl font-bold text-left mb-8 pt-14">
          Önerilen Ürünler
        </h1>
        <ProductSlider products={products} />
      </div>
      <div>
        <h1 className="text-xl font-bold text-left mb-8 pt-14">
          Sergilenen Ürünler
        </h1>
        <ProductSlider products={products} />
      </div>
    </div>
  )
}
