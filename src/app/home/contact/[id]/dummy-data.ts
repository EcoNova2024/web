export const users = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  { id: 2, name: "Ayşe Demir", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Mehmet Kaya", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "Fatma Şahin", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 5, name: "Ali Öztürk", avatar: "/placeholder.svg?height=32&width=32" },
]

export const messages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 0,
    content: "Merhaba, ürünlerimizi incelediniz mi?",
    timestamp: "2023-05-01T10:00:00",
  },
  {
    id: 2,
    senderId: 0,
    receiverId: 1,
    content:
      "Evet, ürün yelpazeniz oldukça geniş. Fiyat teklifi alabilir miyim?",
    timestamp: "2023-05-01T10:05:00",
  },
  {
    id: 3,
    senderId: 1,
    receiverId: 0,
    content: "Tabii ki, hangi ürünlerle ilgileniyorsunuz?",
    timestamp: "2023-05-01T10:10:00",
  },
  {
    id: 4,
    senderId: 2,
    receiverId: 0,
    content: "Yeni ürün serimizle ilgili bilgi almak ister misiniz?",
    timestamp: "2023-05-02T09:00:00",
  },
  {
    id: 5,
    senderId: 0,
    receiverId: 2,
    content: "Evet, lütfen daha fazla bilgi verin. Hangi avantajları sunuyor?",
    timestamp: "2023-05-02T09:15:00",
  },
]
