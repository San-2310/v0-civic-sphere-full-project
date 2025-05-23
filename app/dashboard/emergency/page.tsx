"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HereMap } from "@/components/here-map"
import { AlertTriangle, Phone, Ambulance, Shield, Flame } from "lucide-react"

export default function EmergencyPage() {
  const [emergencyType, setEmergencyType] = useState<string | null>(null)
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [userLocation, setUserLocation] = useState({ lat: 19.076, lng: 72.8777 }) // Default Mumbai
  const [nearbyServices, setNearbyServices] = useState([
    {
      id: 1,
      name: "City Hospital",
      type: "hospital",
      distance: "1.2 km",
      eta: "4 mins",
      coordinates: { lat: 19.079, lng: 72.881 },
    },
    {
      id: 2,
      name: "Central Police Station",
      type: "police",
      distance: "0.8 km",
      eta: "3 mins",
      coordinates: { lat: 19.074, lng: 72.875 },
    },
    {
      id: 3,
      name: "Fire Station 3",
      type: "fire",
      distance: "2.1 km",
      eta: "7 mins",
      coordinates: { lat: 19.082, lng: 72.873 },
    },
  ])

  const triggerEmergency = (type: string) => {
    setEmergencyType(type)
    setIsEmergencyActive(true)

    // In a real app, you would:
    // 1. Get the user's precise location
    // 2. Send an emergency alert to relevant authorities
    // 3. Find nearby emergency services using HERE Places API

    // Simulate getting user location
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.error("Error getting location:", error)
        // Fall back to default location
      },
    )
  }

  const cancelEmergency = () => {
    setIsEmergencyActive(false)
    setEmergencyType(null)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Emergency Access</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {!isEmergencyActive ? (
            <>
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Emergency SOS
                  </CardTitle>
                  <CardDescription>
                    Tap the emergency button to send your location and details to the nearest emergency services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <EmergencyButton
                      icon={<Ambulance className="h-6 w-6" />}
                      label="Medical"
                      onClick={() => triggerEmergency("medical")}
                    />
                    <EmergencyButton
                      icon={<Shield className="h-6 w-6" />}
                      label="Police"
                      onClick={() => triggerEmergency("police")}
                    />
                    <EmergencyButton
                      icon={<Flame className="h-6 w-6" />}
                      label="Fire"
                      onClick={() => triggerEmergency("fire")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                  <CardDescription>Quick access to important emergency numbers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Ambulance className="h-5 w-5 text-red-500" />
                        <span>Ambulance</span>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Phone className="h-4 w-4" />
                        108
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <span>Police</span>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Phone className="h-4 w-4" />
                        100
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-orange-500" />
                        <span>Fire</span>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Phone className="h-4 w-4" />
                        101
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-red-500">
              <CardHeader className="bg-red-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Active: {emergencyType?.toUpperCase()}
                </CardTitle>
                <CardDescription className="text-white/90">
                  Your location has been sent to emergency services.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Emergency Details</h3>
                    <p className="text-sm text-muted-foreground">
                      Location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                    </p>
                    <p className="text-sm text-muted-foreground">Time: {new Date().toLocaleTimeString()}</p>
                    <p className="text-sm text-muted-foreground">Status: Help is on the way</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Nearby Services</h3>
                    <div className="space-y-2">
                      {nearbyServices.map((service) => (
                        <div
                          key={service.id}
                          className={`p-3 rounded-md border ${
                            service.type === emergencyType ? "border-red-500 bg-red-50 dark:bg-red-950" : "border-muted"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-xs text-muted-foreground">Distance: {service.distance}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">ETA: {service.eta}</p>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={cancelEmergency}
                  >
                    Cancel Emergency
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Location</CardTitle>
            <CardDescription>Emergency services will be dispatched to this location.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full rounded-md overflow-hidden">
              <HereMap center={userLocation} zoom={15} markerPosition={userLocation} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EmergencyButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-24 border-red-200 hover:border-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-500 dark:hover:bg-red-950"
      onClick={onClick}
    >
      <div className="text-red-500 mb-2">{icon}</div>
      <span>{label}</span>
    </Button>
  )
}
