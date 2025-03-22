"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Search, Send, User, Users } from "lucide-react"
import { getConversations, getMessages, sendMessage } from "@/lib/messages"
// import { getUserType } from "@/lib/auth"

export default function MessagesPage() {
  const [userType, setUserType] = useState(null)
  const [conversations, setConversations] = useState([])
  const [filteredConversations, setFilteredConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const fetchUserType = async () => {
    //   const type = await getUserType()
    //   setUserType(type)
    }

    fetchUserType()
  }, [])

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations()
        setConversations(data)
        setFilteredConversations(data)

        if (conversationId) {
          const selected = data.find((conv) => conv.id === conversationId)
          if (selected) {
            setActiveConversation(selected)
          }
        } else if (data.length > 0) {
          setActiveConversation(data[0])
        }
      } catch (error) {
        console.error("Error fetching conversations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConversations()
  }, [conversationId])

  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        try {
          const data = await getMessages(activeConversation.id)
          setMessages(data)
          scrollToBottom()
        } catch (error) {
          console.error("Error fetching messages:", error)
        }
      }

      fetchMessages()
    }
  }, [activeConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (searchQuery) {
      const filtered = conversations.filter((conv) =>
        conv.recipientName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredConversations(filtered)
    } else {
      setFilteredConversations(conversations)
    }
  }, [searchQuery, conversations])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!activeConversation || !newMessage.trim()) return

    try {
      const message = await sendMessage(activeConversation.id, newMessage)
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation)
  }

  const formatTime = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timeString) => {
    const date = new Date(timeString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="container py-6">
      <Card className="h-[calc(100vh-150px)] min-h-[600px]">
        <div className="grid h-full grid-cols-1 md:grid-cols-[300px_1fr]">
          <div className="border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="m-0">
                <div className="h-[calc(100vh-270px)] overflow-auto">
                  {filteredConversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <Users className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-medium">No conversations</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? "No results found. Try a different search."
                          : "Start a conversation from a job or application."}
                      </p>
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                          activeConversation?.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.recipientAvatar} alt={conversation.recipientName} />
                          <AvatarFallback>{conversation.recipientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate">{conversation.recipientName}</div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTime(conversation.lastMessageTime)}
                            </div>
                          </div>
                          {conversation.jobTitle && (
                            <div className="text-xs text-muted-foreground truncate mb-1">
                              Re: {conversation.jobTitle}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</div>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="rounded-full px-2 py-0.5 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="m-0">
                <div className="h-[calc(100vh-270px)] overflow-auto">
                  {filteredConversations.filter((c) => c.unreadCount > 0).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <Users className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-medium">No unread messages</h3>
                      <p className="text-sm text-muted-foreground">You're all caught up!</p>
                    </div>
                  ) : (
                    filteredConversations
                      .filter((c) => c.unreadCount > 0)
                      .map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                            activeConversation?.id === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => handleConversationSelect(conversation)}
                        >
                          <Avatar>
                            <AvatarImage src={conversation.recipientAvatar} alt={conversation.recipientName} />
                            <AvatarFallback>{conversation.recipientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="font-medium truncate">{conversation.recipientName}</div>
                              <div className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatTime(conversation.lastMessageTime)}
                              </div>
                            </div>
                            {conversation.jobTitle && (
                              <div className="text-xs text-muted-foreground truncate mb-1">
                                Re: {conversation.jobTitle}
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</div>
                          </div>
                          <Badge variant="default" className="rounded-full px-2 py-0.5 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col h-full">
            {activeConversation ? (
              <>
                <div className="flex items-center gap-2 p-4 border-b">
                  <Avatar>
                    <AvatarImage src={activeConversation.recipientAvatar} alt={activeConversation.recipientName} />
                    <AvatarFallback>{activeConversation.recipientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{activeConversation.recipientName}</div>
                    <div className="text-xs text-muted-foreground">
                      {userType === "freelancer" ? "Client" : "Freelancer"}
                      {activeConversation.jobTitle && ` • ${activeConversation.jobTitle}`}
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <User className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-medium">No messages yet</h3>
                      <p className="text-sm text-muted-foreground">Send a message to start the conversation</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        const showDate =
                          index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp)

                        return (
                          <div key={message.id}>
                            {showDate && (
                              <div className="flex justify-center my-4">
                                <Badge variant="outline" className="bg-background">
                                  {formatDate(message.timestamp)}
                                </Badge>
                              </div>
                            )}
                            <div className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
                              <div
                                className={`flex gap-2 max-w-[80%] ${message.isCurrentUser ? "flex-row-reverse" : ""}`}
                              >
                                {!message.isCurrentUser && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                                    <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div>
                                  <div
                                    className={`rounded-lg p-3 ${
                                      message.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                                    }`}
                                  >
                                    {message.content}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {formatTime(message.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">Select a conversation</h2>
                <p className="text-muted-foreground max-w-md">Choose a conversation from the list to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}