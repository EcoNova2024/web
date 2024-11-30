"use client"

import { useState } from "react"
import { users, messages as initialMessages } from "./dummy-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, PlusCircle } from "lucide-react"

export default function Messaging() {
  const [selectedUser, setSelectedUser] = useState(users[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false)

  const suggestedMessages = [
    "İndirimli fiyatlarımızı gördünüz mü?",
    "Bu ürün için özel bir teklifimiz var, ilginizi çeker mi?",
    "Yeni ürünlerimizi keşfetmek ister misiniz?",
  ]

  const selectSuggestedMessage = (message) => {
    setNewMessage(message)
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.senderId === selectedUser.id ||
      message.receiverId === selectedUser.id
  )

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        senderId: 0, // 0 represents the current user
        receiverId: selectedUser.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-[600px] md:h-[750px] max-w-5xl mx-auto border rounded-lg overflow-hidden dark:border-gray-700 my-20">
      <div
        className={`w-full md:w-1/3 border-r dark:border-gray-700 ${
          isMobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <ScrollArea className="h-full">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-4 cursor-pointer ${
                selectedUser.id === user.id
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                setSelectedUser(user)
                setIsMobileMenuOpen(false)
              }}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="ml-4 font-medium dark:text-white">
                {user.name}
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex-shrink-0 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="md:hidden mr-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu />
              </Button>
              <h2 className="text-2xl font-bold dark:text-white">
                {selectedUser.name}
              </h2>
            </div>
            {/* <Button
              variant="outline"
              onClick={() => setIsNewMessageModalOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni Mesaj
            </Button> */}
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.senderId === 0 ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.senderId === 0
                        ? "bg-blue-500 text-white dark:bg-blue-600"
                        : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter></CardFooter>

          <CardFooter>
            <div>
              <div className="flex justify-between pb-4">
                {suggestedMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestedMessage(message)}
                    className="text-sm text-primary"
                  >
                    {message}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
                className="flex w-full gap-2"
              >
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <Button type="submit">Gönder</Button>
              </form>
            </div>
          </CardFooter>
        </Card>
      </div>
      {isNewMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Yeni Mesaj
            </h3>
            <div className="space-y-4">
              <select
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => {
                  const selectedUserId = parseInt(e.target.value)
                  const user = users.find((u) => u.id === selectedUserId)
                  if (user) {
                    setSelectedUser(user)
                    setIsNewMessageModalOpen(false)
                  }
                }}
              >
                <option value="">Kullanıcı seçin</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsNewMessageModalOpen(false)}
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
