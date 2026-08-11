# Dev Gather

A hub for developer events — hackathons, meetups, and conferences — all in one place. Browse what's coming up, check out the details, and post your own event for others to find.

Built with Next.js (App Router), MongoDB/Mongoose, and Cloudinary for image hosting.

## What you can do

- **Browse events** on the home page or the full `/events` list
- **View an event's details** — agenda, venue, organizer, tags — at `/event/[slug]`
- **Create a new event** at `/event/create`, image upload included
- **Book a spot** on an event's page with just your email

## Getting started

You'll need Node.js, a MongoDB database (Atlas works fine), and a Cloudinary account for image uploads.

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with:

   ```bash
   MONGODB_URI=your-mongodb-connection-string
   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   > If you're setting up a Cloudinary API key from scratch, make sure the key's role includes upload permissions — a read-only role will make event creation fail with a 403.

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the codebase
```

## Project layout

```
app/                  routes (App Router)
  event/[slug]/        single event page
  event/create/        create-event form page
  events/               all-events list page
  api/events/           REST endpoints (list, create, fetch by slug)
components/            UI components (Navbar, EventCard, forms, etc.)
database/              Mongoose models (Event, Booking)
lib/actions/           server actions (bookings, related events)
```
