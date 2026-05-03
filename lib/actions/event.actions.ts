'use server';

import Event from '@/database/event.model';
import { events as fallbackEvents } from '@/lib/constants';
import connectDB from '@/lib/mongodb';

export type EventListItem = {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
};

export type EventDetailsItem = EventListItem & {
    description: string;
    overview: string;
    venue: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
};

const toFallbackEventDetails = (event: EventListItem): EventDetailsItem => ({
    ...event,
    description: `${event.title} brings developers together for practical sessions, networking, and hands-on learning.`,
    overview:
        'Join builders, engineers, and technical leaders for a focused event designed around real-world software development.',
    venue: event.location,
    mode: 'offline',
    audience: 'Developers, founders, and technical teams',
    agenda: ['Registration and networking', 'Expert talks and demos', 'Community discussions'],
    organizer: 'DevEvent',
    tags: ['development', 'community'],
});

export const getEvents = async (): Promise<EventListItem[]> => {
    try {
        await connectDB();

        const events = await Event.find({})
            .select('title image slug location date time')
            .sort({ date: 1 })
            .lean<EventListItem[]>();

        return events.length > 0 ? events : fallbackEvents;
    } catch (error) {
        console.error('get events failed', error);
        return fallbackEvents;
    }
};

export const getEventBySlug = async (slug: string): Promise<EventDetailsItem | null> => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug })
            .select(
                'title image slug location date time description overview venue mode audience agenda organizer tags'
            )
            .lean<EventDetailsItem | null>();

        if (event) {
            return event;
        }
    } catch (error) {
        console.error('get event by slug failed', error);
    }

    const fallbackEvent = fallbackEvents.find((event) => event.slug === slug);
    return fallbackEvent ? toFallbackEventDetails(fallbackEvent) : null;
};

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });

        if (!event) {
            return [];
        }

        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
    } catch {
        return [];
    }
};
