# SceneSlot – Creative Studio Booking Platform

SceneSlot is a creative studio booking platform designed to connect studio owners with individuals looking for suitable spaces for photography, filmmaking, podcasting, music production, and other creative activities.

Users can explore available studios, view studio information, and manage their bookings. Studio owners can also list and manage their creative spaces through the platform.

## Live Website

[SceneSlot – Live Website](https://sceneslot-client.vercel.app)

## GitHub Repositories

- **Client Repository:** [SceneSlot Client](https://github.com/NadiaDipa/sceneslot-client-side)
- **Server Repository:** [SceneSlot Server](https://github.com/NadiaDipa/sceneslot-server-side)

## Key Features

- Responsive homepage with a hero slider and featured studios.
- Browse studios by category.
- Explore studios with search and category filtering options.
- View detailed studio information, images, amenities, and host details.
- User authentication with email/password and Google sign-in.
- Add, update, and manage personal studio listings.
- Upload studio images or provide image URLs.
- Book studios and manage personal bookings.
- View booking information and booking status.
- Cancel eligible bookings.
- Light and dark theme support.
- Loading states, notifications, and custom error pages.
- Responsive interface for mobile, tablet, and desktop devices.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Authentication | Better Auth |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Image Hosting | ImgBB |
| UI & Animation | Swiper.js, Motion |
| Notifications | Sonner |
| Theme | next-themes |
| Icons | Lucide React |

## Local Setup

### 1. Clone the Repositories

```bash
git clone https://github.com/NadiaDipa/sceneslot-client-side.git sceneslot-client

git clone https://github.com/NadiaDipa/sceneslot-server-side.git sceneslot-server
```

### 2. Set Up the Server

```bash
cd sceneslot-server
npm install
```

Create a `.env` file in the server directory and configure the required environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMGBB_API_KEY=your_imgbb_api_key
```

Start the server:

```bash
npm run dev
```

### 3. Set Up the Client

Open another terminal:

```bash
cd sceneslot-client
npm install
```

Create a `.env` file in the client directory and configure the required environment variables:

```env
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI_BETTER_AUTH=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Start the client:

```bash
npm run dev
```

The application will be available at:

- **Client:** http://localhost:3000
- **Server:** http://localhost:5000

For Google sign-in, configure the appropriate OAuth credentials and callback URL in the Google Cloud Console.

## Project Purpose

SceneSlot aims to make creative workspace discovery and booking more convenient by providing a platform where users can explore different studios and studio owners can showcase their spaces.