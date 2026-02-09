'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that returns true after the component has mounted on the client.
 * Useful for avoiding hydration mismatches when rendering client-only UI.
 */
export function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}
