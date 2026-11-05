# SceneSlot – Creative Studio Booking Platform

SceneSlot is a peer-to-peer marketplace where photographers, filmmakers, podcasters and musicians discover, compare and book creative studios by the hour, and where studio owners list and manage their spaces.

**Live Website:** [Add Live Website URL]
**Server Repository:** [Add Server GitHub URL]

## Key Features

- Hero slider, featured studios (latest 6 from MongoDB) and browse-by-category cards that open `/studios` with the category pre-selected.
- Explore page with search, category filter and an empty state when nothing matches.
- Studio details page with a photo gallery carousel, amenities, host details, reviews and a "Book Workspace Now" booking modal.
- Private routes for adding, editing and deleting your own studio listings, with a confirmation modal before deleting.
- Image upload (up to 3 photos per studio) through the ImgBB API, or paste an image URL.
- Booking system with "Pending" status, a My Bookings page with status badges, and cancellation for pending bookings.
- Double-booking prevention: overlapping time slots on the same date are rejected with a clear error message.
- Email/password and Google authentication with protected routes that return the user to the page they wanted after login.
- Light / dark theme toggle, branded loading skeletons, a custom 404 page, and Sonner toast notifications for every auth, CRUD and booking action.
- Fully responsive on mobile, tablet and desktop.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| Authentication | Better Auth (MongoDB adapter), HTTPOnly session cookies |
| Backend | Node.js, Express.js, MongoDB, Multer |
| Image hosting | ImgBB API |
| Other | Swiper.js, Motion, Sonner, next-themes, Lucide React |

## Security Note

Protected server routes (`POST /studios`, `PUT /studios/:id`, `DELETE /studios/:id`, `POST /bookings`, and others) verify the Better Auth signed session token stored in an HTTPOnly cookie and respond with `401 Unauthorized` when the user is not logged in. Studio edits and deletes are also restricted to the listing owner.

## Local Setup

**1. Clone both repositories**

```bash
git clone YOUR_CLIENT_REPOSITORY_URL sceneslot-client
git clone YOUR_SERVER_REPOSITORY_URL sceneslot-server
```

**2. Set up the server**

```bash
cd sceneslot-server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=a_long_random_secret
BETTER_AUTH_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMGBB_API_KEY=your_imgbb_api_key
```

Start the server:

```bash
npm run dev
```

**3. Set up the client**

Open another terminal:

```bash
cd sceneslot-client
npm install
```

Create a `.env` file (the secret and database must match the server):

```env
BETTER_AUTH_SECRET=the_same_secret_as_the_server
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI_BETTER_AUTH=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
API_BASE_URL=http://localhost:5000
```

Start the client:

```bash
npm run dev
```

The client runs on `http://localhost:3000` and the server on `http://localhost:5000`.

For Google login, add `http://localhost:5000/api/auth/callback/google` as an authorized redirect URI in the Google Cloud Console.

## Examiner Test Credentials

- **Email:** [Add Test Email]
- **Password:** [Add Test Password]