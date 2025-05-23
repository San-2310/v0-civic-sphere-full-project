"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { HereMap } from "@/components/here-map"
import { Bus, User, Clock, MapPin, Bell, BellOff, Phone, MessageSquare, Share2 } from "lucide-react"

export default function GuardianTrackingPage() {
  const [activeTab, setActiveTab] = useState("school-bus")
  const [userLocation] = useState({ lat: 19.076, lng: 72.8777 }) // Default Mumbai

  // Simulated data
  const busLocation = { lat: 19.079, lng: 72.873 }
  const childLocation = { lat: 19.074, lng: 72.876 }

  const busRouteData = {
    routeNumber: "SB-42",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 98765 43210",
    nextStop: "Central Park",
    eta: "8 mins",
    totalStops: 12,
    currentStop: 5,
    status: "On Time",
  }

  const childData = {
    name: "Aanya Sharma",
    school: "Delhi Public School",
    grade: "8th Grade",
    lastUpdated: "2 mins ago",
    status: "At School",
    batteryLevel: 68,
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Guardian Tracking</h1>

      <Tabs defaultValue="school-bus" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="school-bus">School Bus</TabsTrigger>
          <TabsTrigger value="child">Child Location</TabsTrigger>
        </TabsList>

        <TabsContent value="school-bus" className="pt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>School Bus Tracker</CardTitle>
                <CardDescription>Track your child's school bus in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full rounded-md overflow-hidden mb-4">
                  <HereMap center={userLocation} zoom={14} markerPosition={busLocation} />
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Bus className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Route {busRouteData.routeNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Updated {busRouteData.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Route Progress</span>
                        <span className="text-sm font-medium">
                          Stop {busRouteData.currentStop}/{busRouteData.totalStops}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(busRouteData.currentStop / busRouteData.totalStops) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next: {busRouteData.nextStop}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">ETA: {busRouteData.eta}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Driver: {busRouteData.driverName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{busRouteData.driverPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Customize your alert preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="arrival-alert">Bus arrival alert</Label>
                      </div>
                      <Switch id="arrival-alert" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="delay-alert">Delay notifications</Label>
                      </div>
                      <Switch id="delay-alert" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="route-change">Route change alerts</Label>
                      </div>
                      <Switch id="route-change" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BellOff className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="quiet-hours">Quiet hours</Label>
                      </div>
                      <Switch id="quiet-hours" />
                    </div>

                    <div className="pt-2">
                      <Label htmlFor="notification-distance">Notification distance</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input id="notification-distance" type="number" defaultValue={500} className="w-24" />
                        <span className="text-sm text-muted-foreground">meters</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        You'll be notified when the bus is within this distance from your home.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Latest updates about the school bus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-4 py-1">
                      <p className="font-medium">Bus departed from school</p>
                      <p className="text-sm text-muted-foreground">Today, 3:15 PM</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-1">
                      <p className="font-medium">Bus arrived at Greenwood Stop</p>
                      <p className="text-sm text-muted-foreground">Today, 3:28 PM</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-1">
                      <p className="font-medium">Slight delay due to traffic</p>
                      <p className="text-sm text-muted-foreground">Today, 3:35 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="child" className="pt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Child Location Tracker</CardTitle>
                <CardDescription>Track your child's location in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full rounded-md overflow-hidden mb-4">
                  <HereMap center={userLocation} zoom={14} markerPosition={childLocation} />
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">{childData.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Updated {childData.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Status: {childData.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">School: {childData.school}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Grade: {childData.grade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 text-muted-foreground flex items-center">
                          <div className="w-full bg-muted-foreground/30 h-2 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                childData.batteryLevel > 50
                                  ? "bg-green-500"
                                  : childData.batteryLevel > 20
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${childData.batteryLevel}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-muted-foreground">Battery: {childData.batteryLevel}%</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Safe Zones</CardTitle>
                  <CardDescription>Set up areas where your child is expected to be</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Home</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">200m radius</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>School</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">300m radius</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Grandparents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">150m radius</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Sports Club</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">250m radius</span>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      Add New Safe Zone
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location History</CardTitle>
                  <CardDescription>Recent locations visited by your child</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-1">
                      <p className="font-medium">School</p>
                      <p className="text-sm text-muted-foreground">Arrived at 8:15 AM</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                      <p className="font-medium">School Bus</p>
                      <p className="text-sm text-muted-foreground">7:45 AM - 8:15 AM</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-1">
                      <p className="font-medium">Home</p>
                      <p className="text-sm text-muted-foreground">Until 7:45 AM</p>
                    </div>

                    <Button variant="outline" className="w-full mt-2">
                      <Clock className="h-4 w-4 mr-2" />
                      View Full History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
