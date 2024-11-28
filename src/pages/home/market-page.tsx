"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { getRandomProducts } from "@/lib/api/products"

type Product = {
  id: string
  name: string
  price: number
  isNew: boolean
  isDamaged: boolean
  image: string
}

export default function ProductListing(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([])
  const [showNewProducts, setShowNewProducts] = useState<boolean>(false)
  const [showDamagedProducts, setShowDamagedProducts] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await getRandomProducts()
        console.log("API Response:", response)

        if (response.error) {
          console.error("Failed to fetch products:", response.error.message)
          return
        }

        const transformedProducts = response.body?.products.map((product) => ({
          id: product.id,
          name: decodeURIComponent(product.name), // Decode if necessary
          price: product.price,
          isNew: product.transactions.length > 1,
          isDamaged: product.transactions.length < 2,
          image: product.transactions[0].image_url,
        }))

        if (transformedProducts) setProducts(transformedProducts)
      } catch (error) {
        console.error("An error occurred while fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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

  const handleViewDetails = (productId: string): void => {
    router.push(`/home/market/product/${productId}`)
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
      {loading ? (
        <p>Loading products...</p>
      ) : (
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
                <Button
                  className="w-full"
                  onClick={() => handleViewDetails(product.id)}
                >
                  Detaylar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
