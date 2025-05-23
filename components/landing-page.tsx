import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { MapPin, Shield, AlertTriangle, Truck, Calendar, BarChart3, Map, Users, Building2, Layers } from "lucide-react"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">CivicSphere</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#roles" className="text-sm font-medium hover:underline underline-offset-4">
              User Roles
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">CivicSphere</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Empowering citizens, digitizing governance, optimizing public infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] bg-gradient-to-br from-orange-100 to-orange-300 dark:from-orange-950 dark:to-orange-800 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Map className="h-32 w-32 text-orange-500 opacity-20" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                      Interactive Map Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the powerful tools that make CivicSphere the ultimate urban governance platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<MapPin />}
                title="Raise Grievance"
                description="Report issues with photo and map pin for quick resolution."
              />
              <FeatureCard
                icon={<Shield />}
                title="Guardian Tracking"
                description="Track your child's school bus or personal commute in real-time."
              />
              <FeatureCard
                icon={<AlertTriangle />}
                title="Emergency Access"
                description="One-tap SOS sends location and emergency information."
              />
              <FeatureCard
                icon={<Truck />}
                title="Waste Pickup ETA"
                description="Know when garbage truck will reach your street."
              />
              <FeatureCard
                icon={<Calendar />}
                title="Event-aware Travel"
                description="Reroute journeys considering temporary live events."
              />
              <FeatureCard
                icon={<BarChart3 />}
                title="Ward Performance"
                description="Interactive dashboard with ward-wise performance metrics."
              />
            </div>
          </div>
        </section>

        <section id="roles" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">User Roles</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CivicSphere adapts to different user needs with role-specific interfaces.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <RoleCard
                icon={<Users />}
                title="Citizen"
                description="Report issues, track complaints, and access civic services."
                theme="light"
              />
              <RoleCard
                icon={<Shield />}
                title="Officer"
                description="Manage tasks, plan routes, and update complaint status."
                theme="dark"
              />
              <RoleCard
                icon={<Building2 />}
                title="Admin"
                description="Monitor performance, manage resources, and analyze data."
                theme="dark"
              />
              <RoleCard
                icon={<Layers />}
                title="MLA"
                description="Track ward performance, budget allocation, and project status."
                theme="light"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} CivicSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="bg-orange-100 dark:bg-orange-950 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <div className="text-orange-500">{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function RoleCard({
  icon,
  title,
  description,
  theme,
}: {
  icon: React.ReactNode
  title: string
  description: string
  theme: "light" | "dark"
}) {
  return (
    <Card className={`border-2 ${theme === "light" ? "border-orange-200" : "border-orange-800"}`}>
      <CardHeader className="pb-2">
        <div
          className={`${theme === "light" ? "bg-orange-100" : "bg-orange-950"} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
        >
          <div className="text-orange-500">{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
