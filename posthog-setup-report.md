<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your DevEvent Next.js App Router project. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new) — Initializes PostHog client-side using the `instrumentation-client.ts` pattern for Next.js 15.3+. Enables automatic exception capture and debug mode in development.
- **`next.config.ts`** (updated) — Added reverse proxy rewrites so all PostHog requests route through `/ingest/*` on your own domain, avoiding ad-blockers. Also set `skipTrailingSlashRedirect: true` for PostHog API compatibility.
- **`components/ExploreBtn.tsx`** (updated) — Added `posthog.capture('explore_events_clicked')` when the user clicks the "Explore Events" CTA button.
- **`components/EventCard.tsx`** (updated) — Added `'use client'` directive and `posthog.capture('event_card_clicked', { title, slug, location, date })` when a user clicks any event card, with event-level properties for downstream analysis.
- **`.env.local`** (new) — Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables (covered by `.gitignore`).

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" CTA button to scroll to the events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view the event detail page (includes title, slug, location, date properties) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/407754/dashboard/1538638
- **Explore Events clicks over time** (line chart): https://us.posthog.com/project/407754/insights/Ta9n2n8L
- **Event card clicks over time** (line chart): https://us.posthog.com/project/407754/insights/AX5RMc8z
- **Most clicked events by title** (bar chart): https://us.posthog.com/project/407754/insights/7jVfupnl
- **Explore → event detail funnel** (funnel): https://us.posthog.com/project/407754/insights/Rd21wr1K
- **Unique users clicking events** (bold number): https://us.posthog.com/project/407754/insights/Y60YSyyg

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
