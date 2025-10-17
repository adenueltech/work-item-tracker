"use client"

import { WorkItemCard } from "./work-item-card"
import { Skeleton } from "@/components/ui/skeleton"

interface WorkItem {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  createdAt: string
  updatedAt: string
}

interface WorkItemListProps {
  items: WorkItem[]
  loading: boolean
  onDelete: (id: number) => void
  onUpdate: (id: number, updates: Partial<WorkItem>) => void
}

export function WorkItemList({ items, loading, onDelete, onUpdate }: WorkItemListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
        <p className="text-muted-foreground">Create your first work item to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <WorkItemCard key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  )
}
