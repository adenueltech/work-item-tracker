"use client"

import { CheckCircle2, Circle, Clock, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  filter: "all" | "todo" | "in-progress" | "done"
  setFilter: (filter: "all" | "todo" | "in-progress" | "done") => void
  stats: {
    total: number
    todo: number
    inProgress: number
    done: number
  }
  onClose?: () => void
}

export function Sidebar({ filter, setFilter, stats, onClose }: SidebarProps) {
  const menuItems = [
    { id: "all", label: "All Items", icon: ListTodo, count: stats.total },
    { id: "todo", label: "To Do", icon: Circle, count: stats.todo },
    { id: "in-progress", label: "In Progress", icon: Clock, count: stats.inProgress },
    { id: "done", label: "Done", icon: CheckCircle2, count: stats.done },
  ]

  const handleFilterClick = (id: string) => {
    setFilter(id as any)
    onClose?.()
  }

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen md:h-auto">
      <div className="p-4 md:p-6 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Filters</h2>
      </div>

      <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = filter === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base ${
                isActive
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              onClick={() => handleFilterClick(item.id)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              <span className="text-xs font-semibold bg-muted px-2 py-1 rounded flex-shrink-0">{item.count}</span>
            </Button>
          )
        })}
      </nav>

      <div className="p-3 md:p-4 border-t border-border">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-3 md:p-4 border border-primary/20">
          <h3 className="font-semibold text-foreground mb-1 text-sm">Pro Tip</h3>
          <p className="text-xs text-muted-foreground">Use keyboard shortcuts to quickly navigate between filters.</p>
        </div>
      </div>
    </aside>
  )
}
