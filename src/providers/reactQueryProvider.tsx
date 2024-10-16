// app/ReactQueryProvider.tsx

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface ReactQueryProviderProps {
    children: React.ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
    // Create a QueryClient instance
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Optionally include React Query Devtools for easier debugging */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
