"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  CheckCircle,
  Clock,
  MapPin,
  AlertTriangle,
  Users,
  TrendingUp,
  Truck,
  Shield,
  Map,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Welcome back, {user?.name}</span>
        </div>
      </div>

      {/* Citizen Dashboard */}
      {user?.role === "citizen" && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Complaints</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">5 resolved, 2 pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Waste Pickup</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Today, 5:30 PM</div>
                <p className="text-xs text-muted-foreground">Est. arrival in 4 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Guardian Tracking</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">School bus arriving in 15 mins</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard/grievance">
                    <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      <span>Raise Grievance</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/emergency">
                    <Button
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center gap-2 border-red-200 hover:border-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-500 dark:hover:bg-red-950"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span>Emergency</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/waste-pickup">
                    <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                      <Truck className="h-5 w-5 text-orange-500" />
                      <span>Waste Pickup</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/guardian-tracking">
                    <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                      <Shield className="h-5 w-5 text-orange-500" />
                      <span>Track Guardian</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nearby Issues</CardTitle>
                <CardDescription>Recent complaints in your area</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted rounded-md">
                <div className="text-center">
                  <Map className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Map visualization of nearby issues</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Officer Dashboard */}
      {user?.role === "officer" && (
        <>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">8 due today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">17 remaining</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">SLA Breaches</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Escalated from citizens</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Route for Today</CardTitle>
                    <CardDescription>Optimized for your assigned tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                    <div className="text-center">
                      <Map className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Map with your optimized route</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tasks Due Today</CardTitle>
                    <CardDescription>Prioritized by urgency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-l-4 border-red-500 pl-4 py-1">
                        <p className="font-medium">Pothole repair - Main Street</p>
                        <p className="text-sm text-muted-foreground">Due in 2 hours</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4 py-1">
                        <p className="font-medium">Streetlight outage - Park Avenue</p>
                        <p className="text-sm text-muted-foreground">Due in 4 hours</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4 py-1">
                        <p className="font-medium">Garbage overflow - Market Square</p>
                        <p className="text-sm text-muted-foreground">Due in 6 hours</p>
                      </div>
                      <Link href="/dashboard/task-assignment">
                        <Button variant="outline" className="w-full mt-2">
                          View All Tasks
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="h-[400px] flex items-center justify-center bg-muted rounded-md">
              <div className="text-center">
                <CheckCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Task Management</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed task management interface will be displayed here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="h-[400px] flex items-center justify-center bg-muted rounded-md">
              <div className="text-center">
                <BarChart className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Performance Reports</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed performance reports will be displayed here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Admin Dashboard */}
      {user?.role === "admin" && (
        <>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">842</div>
                    <p className="text-xs text-muted-foreground">67.5% resolution rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Officers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">8 in high-priority areas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Citizen Satisfaction</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground">+5% from previous month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Ward Performance</CardTitle>
                    <CardDescription>Performance metrics by ward</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                    <div className="text-center">
                      <BarChart className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Performance chart visualization</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Complaint Heatmap</CardTitle>
                    <CardDescription>Geographic distribution of issues</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                    <div className="text-center">
                      <Map className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Heatmap visualization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="h-[500px] flex items-center justify-center bg-muted rounded-md">
              <div className="text-center">
                <BarChart className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Advanced Analytics</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed analytics dashboard will be displayed here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="h-[500px] flex items-center justify-center bg-muted rounded-md">
              <div className="text-center">
                <TrendingUp className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Performance Metrics</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed performance metrics will be displayed here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
