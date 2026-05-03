import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import { getEvents } from '@/lib/actions/event.actions';

export const dynamic = 'force-dynamic';

const Page = async () => {
    const events = await getEvents();

    return (
        <section>
            <h1 className='text-center'>
                The Hub for Every Dev <br /> Event You Cannot Miss
            </h1>
            <p className='text-center mt-5'>
                Hackathons, Meetups, and Conferences, All in One Place
            </p>

            <ExploreBtn />

            <div className='mt-20 space-y-7'>
                <h3>Featured Events</h3>

                <ul className='events' id='events'>
                    {events.map((event) => (
                        <li key={event.slug} className='list-none'>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Page;
