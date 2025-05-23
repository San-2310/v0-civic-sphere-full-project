"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { HereMap } from "@/components/here-map"
import {
  Layers,
  Download,
  Save,
  Share,
  Calendar,
  MapPin,
  Droplets,
  RouteIcon as Road,
  Lightbulb,
  Trash2,
  ParkingCircle,
  Trees,
} from "lucide-react"

export default function HeatmapPage() {
  const [center] = useState({ lat: 19.076, lng: 72.8777 }) // Default Mumbai
  const [timeRange, setTimeRange] = useState([30]) // Last 30 days
  const [layers, setLayers] = useState({
    roads: true,
    water: true,
    electricity: true,
    waste: true,
    parking: false,
    trees: false,
  })

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Local Issues Heatmap</h1>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Heatmap Controls</CardTitle>
              <CardDescription>Customize what you see on the map</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Time Range</h3>
                <div className="space-y-4">
                  <div>
                    <Slider value={timeRange} min={1} max={90} step={1} onValueChange={setTimeRange} />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>1 Day</span>
                      <span>90 Days</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Last {timeRange[0]} days
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Issue Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Road className="h-4 w-4 text-orange-500" />
                      <Label htmlFor="roads">Roads & Potholes</Label>
                    </div>
                    <Switch id="roads" checked={layers.roads} onCheckedChange={() => toggleLayer("roads")} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="water">Water Issues</Label>
                    </div>
                    <Switch id="water" checked={layers.water} onCheckedChange={() => toggleLayer("water")} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <Label htmlFor="electricity">Electricity</Label>
                    </div>
                    <Switch
                      id="electricity"
                      checked={layers.electricity}
                      onCheckedChange={() => toggleLayer("electricity")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trash2 className="h-4 w-4 text-green-500" />
                      <Label htmlFor="waste">Waste Management</Label>
                    </div>
                    <Switch id="waste" checked={layers.waste} onCheckedChange={() => toggleLayer("waste")} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ParkingCircle className="h-4 w-4 text-purple-500" />
                      <Label htmlFor="parking">Parking Issues</Label>
                    </div>
                    <Switch id="parking" checked={layers.parking} onCheckedChange={() => toggleLayer("parking")} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trees className="h-4 w-4 text-emerald-500" />
                      <Label htmlFor="trees">Tree Maintenance</Label>
                    </div>
                    <Switch id="trees" checked={layers.trees} onCheckedChange={() => toggleLayer("trees")} />
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Heatmap
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Issue Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">High Density</span>
                  </div>
                  <span className="text-sm font-medium">47 issues</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Medium Density</span>
                  </div>
                  <span className="text-sm font-medium">124 issues</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Low Density</span>
                  </div>
                  <span className="text-sm font-medium">219 issues</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Issues</span>
                    <span className="text-sm font-medium">390</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-9">
          <Card className="h-full">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Issue Density Heatmap</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Showing data for the last {timeRange[0]} days
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    My Location
                  </Button>
                  <Button variant="outline" size="icon" size-sm>
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              <Tabs defaultValue="heatmap">
                <div className="px-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                    <TabsTrigger value="clusters">Clusters</TabsTrigger>
                    <TabsTrigger value="points">Points</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="heatmap" className="mt-0">
                  <div className="h-[600px] w-full">
                    <HereMap center={center} zoom={13} />
                  </div>
                </TabsContent>

                <TabsContent value="clusters" className="mt-0">
                  <div className="h-[600px] w-full">
                    <HereMap center={center} zoom={13} />
                  </div>
                </TabsContent>

                <TabsContent value="points" className="mt-0">
                  <div className="h-[600px] w-full">
                    <HereMap center={center} zoom={13} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
