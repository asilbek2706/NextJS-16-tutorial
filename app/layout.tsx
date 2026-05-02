import type { Metadata } from 'next';
import { Geist, Martian_Mono, Schibsted_Grotesk } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import LightRays from '@/components/LightRays';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const schibstedGrotesk = Schibsted_Grotesk({
    variable: '--font-schibsted-grotesk',
    subsets: ['latin'],
});

const martianMono = Martian_Mono({
    variable: '--font-martian-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'DevEvent',
    description: "The Hub for Every Dev Event You Must'nt Miss",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            lang='en'
            className={cn(
                'h-full',
                'antialiased',
                schibstedGrotesk.variable,
                martianMono.variable,
                'font-sans',
                geist.variable
            )}
        >
            <body className='min-h-screen flex flex-col'>
                <div className={'absolute inset-0 top-0 z-[-1] min-h-screen'}>
                    <LightRays
                        raysOrigin='top-center-offset'
                        raysColor='#5dfeca'
                        raysSpeed={0.5}
                        lightSpread={0.9}
                        rayLength={1.4}
                        followMouse={true}
                        mouseInfluence={0.02}
                        noiseAmount={0.0}
                        distortion={0.01}
                    />
                </div>

                <main>{children}</main>
            </body>
        </html>
    );
}
