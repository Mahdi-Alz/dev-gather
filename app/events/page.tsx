import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getAllEvents } from "@/lib/actions/event.actions";
import { cacheLife, cacheTag } from "next/cache";

const EventsPage = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  const events = await getAllEvents();

  return (
    <section>
      <h1 className="text-center">All Events</h1>

      <div className="mt-20 space-y-7">
        <ul className="events list-none">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title} className="decoration-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default EventsPage;
