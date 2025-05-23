"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { HereMap } from "@/components/here-map"
import { Mic, MicOff, Play, Pause, MapPin, RotateCcw, Check, Loader2 } from "lucide-react"

export default function VoiceComplaintPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcription, setTranscription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    coordinates: { lat: 19.076, lng: 72.8777 }, // Default to Mumbai coordinates
  })
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // In a real implementation, you would use the Web Speech API here
    // For demo purposes, we're simulating recording
  }

  const stopRecording = () => {
    setIsRecording(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Simulate processing the audio
    setIsProcessing(true)

    // Simulate a delay for speech-to-text processing
    setTimeout(() => {
      const demoTranscription =
        "There's a large pothole on Main Street near the central park entrance. It's been there for over a week and is causing traffic problems. Several cars have been damaged. Please fix it as soon as possible."
      setTranscription(demoTranscription)

      // Auto-fill form data based on transcription
      setFormData((prev) => ({
        ...prev,
        title: "Pothole on Main Street",
        description: demoTranscription,
        category: "roads",
        location: "Main Street, near Central Park entrance",
      }))

      setIsProcessing(false)
    }, 2000)
  }

  const resetRecording = () => {
    setTranscription("")
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      coordinates: { lat: 19.076, lng: 72.8777 },
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleMapClick = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: { lat, lng },
      location: `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting complaint:", formData)

    // Here you would typically send the data to your API
    alert("Voice complaint submitted successfully!")

    // Reset form
    resetRecording()
  }

  // Format recording time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Voice-Based Complaint</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Record Your Complaint</CardTitle>
            <CardDescription>Use your voice to describe the issue you want to report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
              {isRecording ? (
                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75"></div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="relative h-16 w-16 rounded-full"
                      onClick={stopRecording}
                    >
                      <MicOff className="h-6 w-6" />
                    </Button>
                  </div>
                  <p className="mt-4 text-sm font-medium">Recording... {formatTime(recordingTime)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Tap to stop recording</p>
                </div>
              ) : (
                <div className="text-center">
                  {isProcessing ? (
                    <div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-16 w-16 rounded-full cursor-not-allowed opacity-70"
                        disabled
                      >
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </Button>
                      <p className="mt-4 text-sm font-medium">Processing audio...</p>
                    </div>
                  ) : (
                    <div>
                      <Button
                        size="icon"
                        variant={transcription ? "outline" : "default"}
                        className="h-16 w-16 rounded-full"
                        onClick={startRecording}
                      >
                        <Mic className="h-6 w-6" />
                      </Button>
                      <p className="mt-4 text-sm font-medium">
                        {transcription ? "Record again" : "Tap to start recording"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {transcription && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="transcription">Transcription</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? <Check className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetRecording}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {isEditing ? (
                  <Textarea
                    id="transcription"
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                    className="min-h-[120px]"
                  />
                ) : (
                  <div className="p-3 rounded-md bg-muted min-h-[120px] text-sm">{transcription}</div>
                )}

                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="flex-1" disabled={isProcessing}>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" disabled={isProcessing}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complete Your Complaint</CardTitle>
            <CardDescription>Add location and details to your voice complaint</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Brief title of the issue"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roads">Roads & Potholes</SelectItem>
                    <SelectItem value="water">Water Supply</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="public">Public Spaces</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Detailed description of the issue"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    name="location"
                    placeholder="Address or click on map"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="flex-1"
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  You can also click directly on the map to set the location.
                </p>
              </div>

              <div className="h-[200px] w-full rounded-md overflow-hidden">
                <HereMap
                  center={formData.coordinates}
                  zoom={14}
                  onClick={handleMapClick}
                  markerPosition={formData.coordinates}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={!transcription || isProcessing}>
                Submit Voice Complaint
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
