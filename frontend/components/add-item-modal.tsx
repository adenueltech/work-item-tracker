"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: {
    title: string
    description: string
  }) => void
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title,
      description,
    })

    setTitle("")
    setDescription("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Add Work Item</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter work item title"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter work item description"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none text-sm"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent text-sm">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
