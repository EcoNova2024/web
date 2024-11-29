"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getRecommendationsByProductId } from "@/lib/api/products"
import { DetailedProductResponse } from "@/lib/api/products/models"
import { Transaction } from "@/lib/api/transactions/models"
import { useParams } from "next/navigation"
import ProductSlider from "@/components/home-slider"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function ProductDetail() {
  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState<DetailedProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState("/image.png")
  const id = useParams()?.id
  console.log(id)

  useEffect(() => {
    const fetchProductDetails = async (id: string) => {
      setLoading(true)
      try {
        // Fetch product list for suggestions
        const productResponse = await getRecommendationsByProductId(id)
        if (productResponse.error) {
          throw new Error(`Failed to fetch products: ${productResponse.error.message}`)
        }

        const transformedProducts = productResponse.body?.products.map((p) => ({
          id: p.id,
          name: decodeURIComponent(p.name),
          price: p.price,
          image: p.transactions[0]?.image_url || "/image.png",
          description: p.description,
        }))
        setProducts(transformedProducts || [])

        // Fetch single product details
        const foundProduct = productResponse.body?.products.find((p) => p.id === id)
        if (!foundProduct) {
          throw new Error("Product not found")
        }

        setProduct({
          ...foundProduct,
          transactions: foundProduct.transactions.map((transaction: Transaction) => ({
            ...transaction,
            photo_url: transaction.image_url,
          })),
          user_id: foundProduct.user.name,
        })

        setCurrentImage(
          foundProduct.transactions.length > 0
            ? foundProduct.transactions[foundProduct.transactions.length - 1].image_url
            : "/image.png"
        )
      } catch (error) {
        console.error("Error fetching product data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProductDetails(id)
    }
  }, [id])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Aktif</Badge>
      case "inactive":
        return <Badge variant="outline">Pasif</Badge>
      case "deleted":
        return <Badge variant="destructive">Silinmiş</Badge>
      default:
        return null
    }
  }

  const handleCarouselImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }

  if (loading || !product) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={currentImage ? currentImage : "/image.png"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {product.transactions.length > 0 ? (
                    product.transactions.map((transaction, index) => (
                      <CarouselItem
                        key={transaction.id}
                        className="basis-1/4 md:basis-1/5"
                      >
                        <div
                          className="relative aspect-square cursor-pointer"
                          onClick={() => handleCarouselImageClick(transaction.image_url)}
                        >
                          <Image
                            src={transaction.image_url}
                            alt={`${product.name} - Image ${index + 1}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="text-center">No images available</div>
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.round(product.rating_average)
                          ? "fill-yellow-400"
                          : "fill-gray-200"
                      }
                      size={20}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.rating_count} değerlendirme)
                </span>
              </div>
              <p className="text-3xl font-semibold mb-4">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex gap-4 mb-6">
                <Button size="lg">Sepete Ekle</Button>
                <Button variant="outline" size="lg">
                  Favorilere Ekle
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  {getStatusBadge(product.status)}
                </div>
              </div>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Detaylar</TabsTrigger>
                  <TabsTrigger value="shipping">Kargo Bilgisi</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <ul className="list-disc pl-5">
                    <li>
                      <span className="font-semibold">Kategori:</span>{" "}
                      {product.category}
                    </li>
                    <li>
                      <span className="font-semibold">Alt Kategori:</span>{" "}
                      {product.sub_category}
                    </li>
                    <li>
                      <span className="font-semibold">Oluşturulma Tarihi:</span>
                      {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}
                    </li>
                    <li>
                      <span className="font-semibold">Satıcı ID:</span>{" "}
                      {product.user_id}
                    </li>
                    <li>
                      <span className="font-semibold">Decrsiption:</span>{" "}
                      {product.description}
                    </li>
                    <div>
                      <h1 className="text-xl font-bold text-left mb-8 pt-14">
                        Önerilen Ürünler
                      </h1>
                      <ProductSlider products={products} />
                    </div>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping">
                  <p>
                    Siparişiniz 2-4 iş günü içerisinde kargoya verilecektir.
                    Kargo takip numarası e-posta ile tarafınıza iletilecektir.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
