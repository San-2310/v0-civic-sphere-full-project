# CivicSphere - Smart Urban Governance Platform

CivicSphere is a comprehensive urban governance and civic intelligence platform that empowers citizens, digitizes governance, and optimizes public infrastructure.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- HERE API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/civicsphere.git
cd civicsphere
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables by creating a `.env.local` file:
\`\`\`
NEXT_PUBLIC_HERE_API_KEY=your_here_api_key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Implementing Real HERE Maps API

The current implementation uses a simulated HERE Maps interface. To implement the real HERE Maps API:

1. Sign up for a HERE Developer account at [developer.here.com](https://developer.here.com)
2. Create a project and generate an API key
3. Add your API key to `.env.local` as `NEXT_PUBLIC_HERE_API_KEY`
4. Update the `components/here-map.tsx` component using the implementation guide in `lib/constants.ts`
5. Add the required HERE Maps JavaScript libraries to your project

## Features

### Citizen App Features
- Raise Grievance with Photo + Map Pin
- Track Complaint Status on Map
- Local Issues Heatmap Viewer
- Emergency Button
- Guardian Real-Time Tracking
- Waste Pickup ETA
- Voice-Based Complaint Input
- Location-Based Civic Tips

### Officer + Contractor Web Modules
- Task Assignment Dashboard
- Multi-Stop Optimized Route Planning
- Map-Based Proof-of-Completion Upload
- Attendance Marking via Geofence
- SLA Timer with Auto-Escalation Rules

### MLA/Admin Interface
- Ward Performance Index
- Budget Disbursal Dashboard with Maps
- Top 5 Complaint Types by Area
- Transparency Map (Active Projects + Status)

## HERE Technologies Integration

CivicSphere leverages the following HERE APIs:

- Maps API for JavaScript - For interactive maps
- Geocoding & Search API - For address search and reverse geocoding
- Routing API - For route planning and navigation
- Matrix Routing API - For multi-stop optimization
- Geofencing API - For attendance marking and location-based alerts
- Places API - For nearby services and amenities
- Traffic API - For real-time traffic information
- Isoline Routing API - For reachable areas visualization

See `lib/constants.ts` for detailed implementation guides for each API.

## Authentication

The current implementation uses a simulated authentication system with three user roles:

- Citizen: `citizen@example.com` / `password`
- Officer: `officer@example.com` / `password`
- Admin: `admin@example.com` / `password`

In a production environment, replace this with a proper authentication system.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
