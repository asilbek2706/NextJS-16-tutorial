import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getEventBySlug } from '@/lib/actions/event.actions';

type EventDetailsProps = {
    slug: string;
};

const EventDetails = async ({ slug }: EventDetailsProps) => {
    const event = await getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    return (
        <section id='event'>
            <div className='header'>
                <p className='pill'>{event.mode}</p>
                <h1>{event.title}</h1>
                <p>{event.overview}</p>
            </div>

            <div className='details'>
                <div className='content'>
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={1200}
                        height={675}
                        className='banner'
                        priority
                    />

                    <div className='flex-col-gap-2'>
                        <h2>About</h2>
                        <p>{event.description}</p>
                    </div>

                    <div className='agenda'>
                        <h2>Agenda</h2>
                        <ul>
                            {event.agenda.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <aside className='booking'>
                    <div className='signup-card'>
                        <h2>Event Info</h2>

                        <div className='flex-row-gap-2'>
                            <Image src='/icons/calendar.svg' alt='' width={18} height={18} />
                            <p>{event.date}</p>
                        </div>

                        <div className='flex-row-gap-2'>
                            <Image src='/icons/clock.svg' alt='' width={18} height={18} />
                            <p>{event.time}</p>
                        </div>

                        <div className='flex-row-gap-2'>
                            <Image src='/icons/pin.svg' alt='' width={18} height={18} />
                            <p>{event.venue || event.location}</p>
                        </div>

                        <div className='flex-col-gap-2'>
                            <h2>Audience</h2>
                            <p>{event.audience}</p>
                        </div>

                        <div className='flex-col-gap-2'>
                            <h2>Organizer</h2>
                            <p>{event.organizer}</p>
                        </div>

                        <div className='flex flex-wrap gap-2'>
                            {event.tags.map((tag) => (
                                <span key={tag} className='pill'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default EventDetails;
