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
import { Star, Truck, RefreshCw, ShieldCheck } from "lucide-react"
import { getProduct } from "@/lib/api/products"
import { useRouter } from "next/router"
import { DetailedProductResponse } from "@/lib/api/products/models"
import { Transaction } from "@/lib/api/transactions/models"

export default function ProductDetail() {
  const [product, setProduct] = useState<DetailedProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState("")

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await getProduct(id as string)
        if (response.error) {
          console.error("Failed to fetch product:", response.error.message)
          return
        }
        if (response.body) {
          setProduct({
            ...response.body,
            transactions: response.body.transactions.map(
              (transaction: Transaction) => ({
                ...transaction,
                photo_url: transaction.image_url,
              })
            ),
          })
          if (product) {
            const mainImage =
              product.transactions[product?.transactions.length - 1]
                ?.image_url ||
              "/placeholder.svg?height=600&width=600&text=No+Image"

            setCurrentImage(mainImage)
          }
        }
      } catch (error) {
        console.error("An error occurred while fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price)
  }

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

  if (loading || !product) {
    return <div>Loading...</div> // Consider replacing this with a proper loading component or spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {product.transactions.map((transaction, index) => (
                    <CarouselItem
                      key={transaction.id}
                      className="basis-1/4 md:basis-1/5"
                    >
                      <div
                        className="relative aspect-square cursor-pointer"
                        onClick={() => setCurrentImage(transaction.image_url)}
                      >
                        <Image
                          src={transaction.image_url}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </CarouselItem>
                  ))}
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
                  <Truck className="mr-2" />
                  <span className="text-sm">Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="mr-2" />
                  <span className="text-sm">30 Gün İade</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="mr-2" />
                  <span className="text-sm">2 Yıl Garanti</span>
                </div>
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
                      <span className="font-semibold">Kategori:</span>
                      {product.category}
                    </li>
                    <li>
                      <span className="font-semibold">Alt Kategori:</span>
                      {product.sub_category}
                    </li>
                    <li>
                      <span className="font-semibold">Oluşturulma Tarihi:</span>
                      {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}
                    </li>
                    <li>
                      <span className="font-semibold">Satıcı ID:</span>
                      {product.user_id}
                    </li>
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
