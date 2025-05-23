"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Search, Filter, MapPin, Calendar, ArrowUpDown, MessageSquare } from "lucide-react"
import { HereMap } from "@/components/here-map"

// Dummy complaint data
const complaints = [
  {
    id: "C-2023-001",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic hazard",
    category: "Roads",
    status: "resolved",
    date: "2023-05-01",
    location: "Main Street, near City Park",
    coordinates: { lat: 19.078, lng: 72.88 },
    assignedTo: "Officer Johnson",
    updates: [
      { date: "2023-05-01", message: "Complaint registered", status: "pending" },
      { date: "2023-05-02", message: "Assigned to Officer Johnson", status: "in-progress" },
      { date: "2023-05-05", message: "Road repair team dispatched", status: "in-progress" },
      { date: "2023-05-08", message: "Pothole fixed and road resurfaced", status: "resolved" },
    ],
  },
  {
    id: "C-2023-002",
    title: "Streetlight not working",
    description: "Streetlight at the corner of Park Avenue has been out for 3 days",
    category: "Electricity",
    status: "in-progress",
    date: "2023-05-03",
    location: "Park Avenue, corner of 5th Street",
    coordinates: { lat: 19.075, lng: 72.877 },
    assignedTo: "Officer Wilson",
    updates: [
      { date: "2023-05-03", message: "Complaint registered", status: "pending" },
      { date: "2023-05-04", message: "Assigned to Officer Wilson", status: "in-progress" },
      { date: "2023-05-06", message: "Electrical team scheduled for inspection", status: "in-progress" },
    ],
  },
  {
    id: "C-2023-003",
    title: "Garbage not collected",
    description: "Garbage has not been collected for the past week",
    category: "Waste",
    status: "pending",
    date: "2023-05-08",
    location: "Garden Road, Residential Block C",
    coordinates: { lat: 19.082, lng: 72.875 },
    assignedTo: "Unassigned",
    updates: [{ date: "2023-05-08", message: "Complaint registered", status: "pending" }],
  },
  {
    id: "C-2023-004",
    title: "Water leakage from pipeline",
    description: "Water leaking from main pipeline causing wastage",
    category: "Water",
    status: "resolved",
    date: "2023-04-25",
    location: "Commerce Street, near the bank",
    coordinates: { lat: 19.074, lng: 72.882 },
    assignedTo: "Officer Martinez",
    updates: [
      { date: "2023-04-25", message: "Complaint registered", status: "pending" },
      { date: "2023-04-26", message: "Assigned to Officer Martinez", status: "in-progress" },
      { date: "2023-04-28", message: "Water department notified", status: "in-progress" },
      { date: "2023-05-02", message: "Pipeline repaired", status: "resolved" },
    ],
  },
  {
    id: "C-2023-005",
    title: "Public park maintenance needed",
    description: "Overgrown grass and broken benches in the community park",
    category: "Public Spaces",
    status: "in-progress",
    date: "2023-05-05",
    location: "City Center Park",
    coordinates: { lat: 19.077, lng: 72.879 },
    assignedTo: "Officer Thompson",
    updates: [
      { date: "2023-05-05", message: "Complaint registered", status: "pending" },
      { date: "2023-05-06", message: "Assigned to Officer Thompson", status: "in-progress" },
      { date: "2023-05-09", message: "Parks department scheduled maintenance", status: "in-progress" },
    ],
  },
]

export default function ComplaintStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof complaints)[0] | null>(null)

  // Filter complaints based on search and active tab
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && complaint.status === "pending") ||
      (activeTab === "in-progress" && complaint.status === "in-progress") ||
      (activeTab === "resolved" && complaint.status === "resolved")

    return matchesSearch && matchesTab
  })

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Track Complaint Status</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>My Complaints</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2 pt-2">
                <Input
                  placeholder="Search by ID, title, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                <div className="mt-4 space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {filteredComplaints.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No complaints found</div>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                          selectedComplaint?.id === complaint.id
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                            : ""
                        }`}
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{complaint.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {complaint.id} • {complaint.category}
                            </p>
                          </div>
                          <Badge
                            variant={
                              complaint.status === "resolved"
                                ? "default"
                                : complaint.status === "in-progress"
                                  ? "outline"
                                  : "secondary"
                            }
                            className={
                              complaint.status === "resolved"
                                ? "bg-green-500"
                                : complaint.status === "in-progress"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "bg-muted text-muted-foreground"
                            }
                          >
                            {complaint.status === "resolved"
                              ? "Resolved"
                              : complaint.status === "in-progress"
                                ? "In Progress"
                                : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{complaint.date}</span>
                          <MapPin className="h-3 w-3 ml-2 mr-1" />
                          <span className="truncate">{complaint.location}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selectedComplaint ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedComplaint.title}</CardTitle>
                      <CardDescription>
                        {selectedComplaint.id} • {selectedComplaint.category} • {selectedComplaint.date}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        selectedComplaint.status === "resolved"
                          ? "default"
                          : selectedComplaint.status === "in-progress"
                            ? "outline"
                            : "secondary"
                      }
                      className={
                        selectedComplaint.status === "resolved"
                          ? "bg-green-500"
                          : selectedComplaint.status === "in-progress"
                            ? "border-yellow-500 text-yellow-500"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {selectedComplaint.status === "resolved"
                        ? "Resolved"
                        : selectedComplaint.status === "in-progress"
                          ? "In Progress"
                          : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedComplaint.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">{selectedComplaint.location}</p>
                  </div>

                  <div className="h-[200px] w-full rounded-md overflow-hidden">
                    <HereMap
                      center={selectedComplaint.coordinates}
                      zoom={15}
                      markerPosition={selectedComplaint.coordinates}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Assigned To</h3>
                      <Badge variant="outline" className="text-xs">
                        {selectedComplaint.status === "pending" ? "Unassigned" : selectedComplaint.assignedTo}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Status Updates</h3>
                      <Button variant="ghost" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Sort
                      </Button>
                    </div>

                    <div className="space-y-3 mt-2">
                      {selectedComplaint.updates.map((update, index) => (
                        <div
                          key={index}
                          className={`relative pl-6 pb-6 ${
                            index === selectedComplaint.updates.length - 1 ? "pb-0" : ""
                          }`}
                        >
                          {index !== selectedComplaint.updates.length - 1 && (
                            <div className="absolute left-[11px] top-[20px] bottom-0 w-[1px] bg-border"></div>
                          )}
                          <div
                            className={`absolute left-0 top-1 w-[22px] h-[22px] rounded-full flex items-center justify-center ${
                              update.status === "resolved"
                                ? "bg-green-100 dark:bg-green-950"
                                : update.status === "in-progress"
                                  ? "bg-yellow-100 dark:bg-yellow-950"
                                  : "bg-muted"
                            }`}
                          >
                            {update.status === "resolved" ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : update.status === "in-progress" ? (
                              <Clock className="h-3 w-3 text-yellow-500" />
                            ) : (
                              <Clock className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{update.message}</p>
                            <p className="text-xs text-muted-foreground">{update.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Add a Comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input placeholder="Write a comment or question..." />
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-muted rounded-lg p-12 text-center">
              <div>
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a complaint</h3>
                <p className="text-muted-foreground">
                  Select a complaint from the list to view its details and status updates.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
