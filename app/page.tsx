import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import { events } from '@/lib/constants';

const Page = () => {
    return (
        <section>
            <h1 className={'text-center'}>
                The Hub for Every Dev <br /> Event You Can&#39;t Miss
            </h1>
            <p className={'text-center mt-5'}>
                Hackathons, Meetups, and Conferences, All in One Place
            </p>

            <ExploreBtn />

            <div className={'mt-20 space-y-7'}>
                <h3>Featured Events</h3>

                <ul className={'events'} id={'events'}>
                    {events.map((event) => (
                        <li style={{listStyleType: 'none'}} key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Page;
