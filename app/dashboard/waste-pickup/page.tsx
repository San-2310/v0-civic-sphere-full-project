"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HereMap } from "@/components/here-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Truck, Clock, Calendar, MapPin, Trash2 } from "lucide-react"

export default function WastePickupPage() {
  const [activeTab, setActiveTab] = useState("today")
  const [userLocation] = useState({ lat: 19.076, lng: 72.8777 }) // Default Mumbai

  // Simulated data
  const truckLocation = { lat: 19.079, lng: 72.873 }
  const pickupEta = 35 // minutes
  const pickupProgress = 65 // percent

  const smartBins = [
    { id: 1, location: "Main Street", fillLevel: 85, status: "Almost Full", coordinates: { lat: 19.078, lng: 72.88 } },
    { id: 2, location: "Park Avenue", fillLevel: 45, status: "Half Full", coordinates: { lat: 19.074, lng: 72.876 } },
    { id: 3, location: "Market Square", fillLevel: 92, status: "Full", coordinates: { lat: 19.072, lng: 72.882 } },
    { id: 4, location: "Garden Road", fillLevel: 30, status: "Low", coordinates: { lat: 19.08, lng: 72.878 } },
  ]

  const scheduleData = {
    today: { time: "5:30 PM", status: "Scheduled" },
    tomorrow: { time: "5:30 PM", status: "Scheduled" },
    weekly: [
      { day: "Monday", time: "5:30 PM", status: "Completed" },
      { day: "Wednesday", time: "5:30 PM", status: "Scheduled" },
      { day: "Friday", time: "5:30 PM", status: "Scheduled" },
    ],
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Waste Pickup ETA</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Garbage Truck Tracker</CardTitle>
            <CardDescription>Real-time location and estimated time of arrival</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md overflow-hidden mb-4">
              <HereMap center={userLocation} zoom={14} markerPosition={truckLocation} />
            </div>

            <div className="bg-muted p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Truck #A-123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Updated 2 mins ago</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">ETA to your location</span>
                    <span className="text-sm font-medium">{pickupEta} mins</span>
                  </div>
                  <Progress value={pickupProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Current: Main Street</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Speed: 18 km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Capacity: 65% full</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Stops remaining: 8</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pickup Schedule</CardTitle>
              <CardDescription>View your waste collection schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                </TabsList>
                <TabsContent value="today" className="pt-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Today's Pickup</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString(undefined, { weekday: "long" })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{scheduleData.today.time}</p>
                      <p className="text-sm text-muted-foreground">{scheduleData.today.status}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tomorrow" className="pt-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Tomorrow's Pickup</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(Date.now() + 86400000).toLocaleDateString(undefined, { weekday: "long" })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{scheduleData.tomorrow.time}</p>
                      <p className="text-sm text-muted-foreground">{scheduleData.tomorrow.status}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="weekly" className="pt-4">
                  <div className="space-y-3">
                    {scheduleData.weekly.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-md">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="font-medium">{item.day}</p>
                            <p className="text-sm text-muted-foreground">Regular Pickup</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.time}</p>
                          <p className="text-sm text-muted-foreground">{item.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Bin Status</CardTitle>
              <CardDescription>Monitor fill levels of smart bins in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {smartBins.map((bin) => (
                  <div key={bin.id} className="flex items-center justify-between p-4 bg-muted rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Trash2 className="h-5 w-5 text-muted-foreground" />
                        <div
                          className={`absolute bottom-0 left-0 right-0 ${
                            bin.fillLevel > 80 ? "bg-red-500" : bin.fillLevel > 50 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ height: `${bin.fillLevel}%` }}
                        ></div>
                      </div>
                      <div>
                        <p className="font-medium">Bin #{bin.id}</p>
                        <p className="text-sm text-muted-foreground">{bin.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{bin.fillLevel}%</p>
                      <p
                        className={`text-sm ${
                          bin.fillLevel > 80
                            ? "text-red-500"
                            : bin.fillLevel > 50
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {bin.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
