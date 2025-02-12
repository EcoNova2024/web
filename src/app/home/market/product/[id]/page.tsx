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
import axios from "axios"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Circle,
  Loader,
  Loader2,
  MessageCircle,
  Send,
  Star,
  User,
} from "lucide-react"
import { getRecommendationsByProductId } from "@/lib/api/products"
import { useParams } from "next/navigation"
import ProductSlider from "@/components/home-slider"
import { DetailedProductResponse } from "@/lib/api/products/models"
import Link from "next/link"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function ProductDetail() {
  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState<DetailedProductResponse>()

  const [currentImage, setCurrentImage] = useState("/image.png")
  const id = useParams()?.id
  console.log(id)
  const [loading, setLoading] = useState(true)
  const [newImage, setNewImage] = useState("/image.png")

  const handleButtonClick = async () => {
    try {
      setTimeout(() => {
        setNewImage("/restored_image.jpg")
      }, 2000)
    } catch (error) {
      console.error("S3 fetch error:", error)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://13.49.145.211:3000/products/?id=${id}`
        )
        setProduct(response.data.product)
        setCurrentImage(response.data.product.transactions[0].image_url)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product details:", error)
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      if (!id) return
      try {
        const productResponse = await getRecommendationsByProductId(String(id))
        if (productResponse.error) {
          throw new Error(
            `Failed to fetch recommended products: ${productResponse.error.message}`
          )
        }

        const transformedProducts = productResponse.body?.products.map((p) => ({
          id: p.id,
          name: decodeURIComponent(p.name),
          price: p.price,
          image: p.transactions[0]?.image_url || "/image.png",
          description: p.description,
        }))
        setProducts(transformedProducts || [])
      } catch (error) {
        console.error("Error fetching recommended products:", error)
      }
    }

    fetchRecommendedProducts()
  }, [id])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "deleted":
        return <Badge variant="destructive">Deleted</Badge>
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
                  src={currentImage}
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
                          onClick={() =>
                            handleCarouselImageClick(transaction.image_url)
                          }
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
                  ({product.rating_count} reviews)
                </span>
              </div>
              <p className="text-3xl font-semibold mb-4">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex gap-4 mb-6">
                <Link href={`/home/contact/${product.user_id}`}>
                  <Button size="lg">
                    <Send size={16} className="mr-2" />
                    Contact Seller
                  </Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleButtonClick}
                    >
                      <Bot size={16} className="mr-2" />
                      Edit with AI
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {newImage !== "/image.png"
                          ? "Restored Image"
                          : "AI working...."}
                      </DialogTitle>
                      <DialogDescription className="flex justify-center items-center">
                        {newImage !== "/image.png" ? (
                          <Image
                            src={newImage}
                            alt="Restored Image"
                            className="object-cover rounded-lg p-2 overflow-hidden"
                            width={400}
                            height={400}
                          />
                        ) : (
                          <Loader2
                            size={50}
                            className="mx-auto animate-spin text-primary"
                          />
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  {getStatusBadge(product.status)}
                </div>
              </div>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Product Story</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <ul className="list-disc pl-5">
                    <li>
                      <span className="font-semibold">Category:</span>{" "}
                      {product.category}
                    </li>
                    <li>
                      <span className="font-semibold">Sub Category:</span>{" "}
                      {product.sub_category}
                    </li>
                    <li>
                      <span className="font-semibold">Creation Date:</span>
                      {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}
                    </li>
                    <li>
                      <span className="font-semibold">Seller ID:</span>{" "}
                      {product.user_id}
                    </li>
                    <li>
                      <span className="font-semibold">Description:</span>{" "}
                      {product.description}
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="text-gray-500">
                  <div className="flex items-center ">
                    <User size={16} className="mr-2" />
                    <span>
                      {
                        product.transactions.find(
                          (transaction) =>
                            transaction.image_url === currentImage
                        )?.user.name
                      }
                    </span>
                  </div>
                  <div className="flex items-center ">
                    <MessageCircle size={16} className="mr-2" />
                    <span>
                      {
                        product.transactions.find(
                          (transaction) =>
                            transaction.image_url === currentImage
                        )?.description
                      }
                    </span>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-left mb-8 pt-14">
              Recommended Products
            </h1>
            <ProductSlider products={products} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
