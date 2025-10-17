"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (token: string, user: any) => void
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const endpoint = activeTab === "login" ? "/auth/login" : "/auth/register"
      const body = activeTab === "login"
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed")
      }

      if (activeTab === "register") {
        // After successful registration, switch to login tab
        setActiveTab("login")
        setError("")
        setLoading(false)
        // Pre-fill login form with registration data
        setFormData(prev => ({
          ...prev,
          password: "", // Clear password for security
        }))
        return
      }

      onAuthSuccess(data.access_token, data.user)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      if (activeTab !== "register") {
        setLoading(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Welcome</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <TabsContent value="register" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
                {activeTab === "register" && (
                  <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                    After registration, you'll be switched to the login form to sign in with your new account.
                  </div>
                )}
              </TabsContent>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading ? "Please wait..." : activeTab === "login" ? "Login" : "Sign Up"}
              </Button>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  )
}