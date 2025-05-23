"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  Map,
  MapPin,
  AlertTriangle,
  Truck,
  Calendar,
  BarChart3,
  Shield,
  Users,
  Settings,
  LogOut,
  Home,
  Bell,
  User,
  Volume2,
  Briefcase,
  FileCheck,
  Route,
  Clock,
  Layers,
  PieChart,
  Building2,
  CheckSquare,
} from "lucide-react"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <SidebarProvider>
      <SidebarPrimitive className="border-r">
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <Map className="h-6 w-6 text-orange-500" />
            <span className="font-bold">CivicSphere</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          {/* Common Menu Items */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                    <Link href="/dashboard">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Citizen Features */}
          {user?.role === "citizen" && (
            <SidebarGroup>
              <SidebarGroupLabel>Citizen Features</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/grievance"}>
                      <Link href="/dashboard/grievance">
                        <MapPin className="mr-2 h-4 w-4" />
                        Raise Grievance
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/guardian-tracking"}>
                      <Link href="/dashboard/guardian-tracking">
                        <Shield className="mr-2 h-4 w-4" />
                        Guardian Tracking
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/emergency"}>
                      <Link href="/dashboard/emergency">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Emergency Access
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/waste-pickup"}>
                      <Link href="/dashboard/waste-pickup">
                        <Truck className="mr-2 h-4 w-4" />
                        Waste Pickup ETA
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/complaint-status"}>
                      <Link href="/dashboard/complaint-status">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Track Complaints
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/heatmap"}>
                      <Link href="/dashboard/heatmap">
                        <Layers className="mr-2 h-4 w-4" />
                        Issues Heatmap
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/voice-complaint"}>
                      <Link href="/dashboard/voice-complaint">
                        <Volume2 className="mr-2 h-4 w-4" />
                        Voice Complaint
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/projects"}>
                      <Link href="/dashboard/projects">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Area Projects
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Officer Tools */}
          {(user?.role === "officer" || user?.role === "admin") && (
            <SidebarGroup>
              <SidebarGroupLabel>Officer Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/task-assignment"}>
                      <Link href="/dashboard/task-assignment">
                        <Calendar className="mr-2 h-4 w-4" />
                        Task Assignment
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/route-planning"}>
                      <Link href="/dashboard/route-planning">
                        <Route className="mr-2 h-4 w-4" />
                        Route Planning
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/proof-upload"}>
                      <Link href="/dashboard/proof-upload">
                        <FileCheck className="mr-2 h-4 w-4" />
                        Proof of Completion
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/sla-timer"}>
                      <Link href="/dashboard/sla-timer">
                        <Clock className="mr-2 h-4 w-4" />
                        SLA Timer
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Admin Panel */}
          {user?.role === "admin" && (
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/performance"}>
                      <Link href="/dashboard/performance">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Ward Performance
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/users"}>
                      <Link href="/dashboard/users">
                        <Users className="mr-2 h-4 w-4" />
                        User Management
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/budget"}>
                      <Link href="/dashboard/budget">
                        <PieChart className="mr-2 h-4 w-4" />
                        Budget Dashboard
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/infrastructure"}>
                      <Link href="/dashboard/infrastructure">
                        <Building2 className="mr-2 h-4 w-4" />
                        Infrastructure
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"}>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/notifications"}>
                    <Link href="/dashboard/notifications">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>

        <SidebarRail />
      </SidebarPrimitive>
    </SidebarProvider>
  )
}
