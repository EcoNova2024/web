"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import Image from "next/image"

type Product = {
  id: number
  name: string
  price: number
  isNew: boolean
  isDamaged: boolean
  image: string
}

const products = [
  {
    id: 1,
    name: "Ürün 1",
    price: 100,
    isNew: true,
    isDamaged: false,
    image: "/image.png",
  },
  {
    id: 2,
    name: "Ürün 2",
    price: 200,
    isNew: false,
    isDamaged: true,
    image: "/image.png",
  },
  {
    id: 3,
    name: "Ürün 3",
    price: 150,
    isNew: true,
    isDamaged: false,
    image: "/image.png",
  },
  {
    id: 4,
    name: "Ürün 4",
    price: 300,
    isNew: true,
    isDamaged: false,
    image: "/image.png",
  },
  {
    id: 5,
    name: "Ürün 5",
    price: 250,
    isNew: true,
    isDamaged: false,
    image: "/image.png",
  },
  {
    id: 6,
    name: "Ürün 6",
    price: 180,
    isNew: false,
    isDamaged: true,
    image: "/image.png",
  },
  {
    id: 7,
    name: "Ürün 7",
    price: 220,
    isNew: true,
    isDamaged: false,
    image: "/image.png",
  },
  {
    id: 8,
    name: "Ürün 8",
    price: 190,
    isNew: false,
    isDamaged: true,
    image: "/image.png",
  },
]

export default function ProductListing(): JSX.Element {
  const [showNewProducts, setShowNewProducts] = useState<boolean>(false)
  const [showDamagedProducts, setShowDamagedProducts] = useState<boolean>(false)

  const handleNewProductsToggle = (newValue: boolean): void => {
    if (newValue && showDamagedProducts) {
      setShowDamagedProducts(false)
    }
    setShowNewProducts(newValue)
  }

  const handleDamagedProductsToggle = (newValue: boolean): void => {
    if (newValue && showNewProducts) {
      setShowNewProducts(false)
    }
    setShowDamagedProducts(newValue)
  }

  const handleShowAll = (): void => {
    setShowNewProducts(false)
    setShowDamagedProducts(false)
  }

  const filteredProducts = products.filter((product: Product) => {
    if (showNewProducts && !product.isNew) return false
    if (showDamagedProducts && !product.isDamaged) return false
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-4 mb-8 pt-10">
        <Button onClick={handleShowAll}>Tümünü Göster</Button>
        <Toggle
          pressed={showNewProducts}
          onPressedChange={handleNewProductsToggle}
          aria-label="Yeni ürünleri göster"
        >
          Yenilenmiş Ürünler
        </Toggle>
        <Toggle
          pressed={showDamagedProducts}
          onPressedChange={handleDamagedProductsToggle}
          aria-label="Hasarlı ürünleri göster"
        >
          Hasarlı Ürünler
        </Toggle>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product: Product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
              <div className="flex justify-between">
                <p className="text-2xl font-bold">{product.price} TL</p>
                <div className="mt-2 space-x-2">
                  {product.isNew && <Badge>Yenilenmiş</Badge>}
                  {product.isDamaged && (
                    <Badge variant="destructive">Hasarlı</Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Sepete Ekle</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
