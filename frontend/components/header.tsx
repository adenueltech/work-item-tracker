"use client"

import { Bell, Settings, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-xs md:text-sm">WI</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground hidden sm:block">Work Tracker</h1>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground w-9 h-9 md:w-10 md:h-10"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground w-9 h-9 md:w-10 md:h-10"
          >
            <Settings className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground w-9 h-9 md:w-10 md:h-10"
          >
            <User className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
