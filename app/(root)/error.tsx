'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                     () => unstable_retry()
                }
            >
                Try again
            </button>
        </div>
    );
}
