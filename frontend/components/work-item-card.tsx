"use client"

import { useState } from "react"
import { Trash2, Edit2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface WorkItem {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  createdAt: string
  updatedAt: string
}

interface WorkItemCardProps {
  item: WorkItem
  onDelete: (id: number) => void
  onUpdate: (id: number, updates: Partial<WorkItem>) => void
}

export function WorkItemCard({ item, onDelete, onUpdate }: WorkItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusColors = {
    todo: "bg-secondary/10 text-secondary border-secondary/20",
    "in-progress": "bg-accent/10 text-accent border-accent/20",
    done: "bg-green-500/10 text-green-600 border-green-500/20",
  }

  const priorityColors = {
    low: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    high: "bg-red-500/10 text-red-600 border-red-500/20",
  }

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  }

  const nextStatus = {
    todo: "in-progress" as const,
    "in-progress": "done" as const,
    done: "todo" as const,
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow animate-slide-in">
      <div className="p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-foreground truncate mb-1">{item.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={`${statusColors[item.status]} border text-xs sm:text-sm`}>
            {statusLabels[item.status]}
          </Badge>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border pt-3 md:pt-4 mb-4 space-y-3">
            <div className="text-xs sm:text-sm">
              <p className="text-muted-foreground font-medium">Last Updated</p>
              <p className="text-foreground">{new Date(item.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-3 md:pt-4 border-t border-border">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 w-full text-primary hover:text-white hover:bg-primary hover:border-primary bg-transparent border-primary/20 transition-colors text-xs sm:text-sm"
            onClick={() => onUpdate(item.id, { status: nextStatus[item.status] })}
          >
            <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Move to {statusLabels[nextStatus[item.status]]}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:text-white hover:bg-destructive hover:border-destructive bg-transparent border-destructive/20 transition-colors w-full sm:w-auto text-xs sm:text-sm"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
