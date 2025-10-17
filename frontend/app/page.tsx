"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WorkItemList } from "@/components/work-item-list"
import { AddItemModal } from "@/components/add-item-modal"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Plus, LogOut } from "lucide-react"

interface WorkItem {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  createdAt: string
  updatedAt: string
}

interface User {
  id: number
  email: string
  name?: string
}

export default function Dashboard() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "done">("all")
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser && savedUser !== 'undefined') {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
        fetchWorkItems(savedToken)
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        setIsAuthModalOpen(true)
        setLoading(false)
      }
    } else {
      setIsAuthModalOpen(true)
      setLoading(false)
    }
  }, [])

  const fetchWorkItems = async (authToken: string) => {
    try {
      const response = await fetch('http://localhost:3001/work-items', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
      const data = await response.json()
      setWorkItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch work items:', error)
      setWorkItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleAuthSuccess = async (authToken: string, userData: User) => {
    setToken(authToken)
    setUser(userData)
    localStorage.setItem('authToken', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setLoading(true)
    await fetchWorkItems(authToken)
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    setWorkItems([])
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setIsAuthModalOpen(true)
  }

  const handleAddItem = async (newItem: Omit<WorkItem, "id" | "createdAt" | "updatedAt">) => {
    if (!token) return

    try {
      const response = await fetch('http://localhost:3001/work-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newItem.title,
          description: newItem.description,
        }),
      })
      const createdItem = await response.json()
      setWorkItems([createdItem, ...workItems])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to create work item:', error)
    }
  }

  const handleDeleteItem = async (id: number) => {
    if (!token) return

    try {
      await fetch(`http://localhost:3001/work-items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      setWorkItems(workItems.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Failed to delete work item:', error)
    }
  }

  const handleUpdateItem = async (id: number, updates: Partial<WorkItem>) => {
    if (!token) return

    try {
      if (updates.status) {
        await fetch(`http://localhost:3001/work-items/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status: updates.status }),
        })
      }
      setWorkItems(workItems.map((item) => (item.id === id ? { ...item, ...updates } : item)))
    } catch (error) {
      console.error('Failed to update work item:', error)
    }
  }

  const filteredItems = filter === "all" ? workItems : workItems.filter((item) => item.status === filter)

  const stats = {
    total: workItems.length,
    todo: workItems.filter((i) => i.status === "todo").length,
    inProgress: workItems.filter((i) => i.status === "in-progress").length,
    done: workItems.filter((i) => i.status === "done").length,
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background flex-col md:flex-row">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div
        className={`fixed md:relative z-50 md:z-auto transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar filter={filter} setFilter={setFilter} stats={stats} onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
                  Welcome, {user.name || user.email}!
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">Manage your work items</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
              <StatCard label="Total" value={stats.total} color="primary" />
              <StatCard label="To Do" value={stats.todo} color="secondary" />
              <StatCard label="In Progress" value={stats.inProgress} color="accent" />
              <StatCard label="Done" value={stats.done} color="green" />
            </div>

            <WorkItemList
              items={filteredItems}
              loading={loading}
              onDelete={handleDeleteItem}
              onUpdate={handleUpdateItem}
            />
          </div>
        </main>
      </div>

      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddItem} />
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    green: "bg-green-500/10 text-green-600 border-green-500/20",
  }

  return (
    <div
      className={`${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-3 sm:p-4 animate-slide-in`}
    >
      <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{label}</p>
      <p className="text-xl sm:text-2xl md:text-3xl font-bold">{value}</p>
    </div>
  )
}
