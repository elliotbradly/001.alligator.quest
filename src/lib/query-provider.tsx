'use client'

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import {  MantineProvider, createTheme, Button } from '@mantine/core';

const theme = createTheme({
    primaryColor: 'orange',
    primaryShade: 7,
    components: {
        Button: Button.extend({
          // The 'sizes' resolver allows you to define custom sizes
          sizes: {
            jumbo: (theme) => ({
              root: {
                height: '500px',
                width: '150px',       
                padding: '0 2.5rem',  // 40px
                fontSize: '1.5rem',   // 24px
              },
            }),
          },
        }),
      },
  });



  

export default function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            //       queries:{staleTime:6*1000, refetchInterval:6*1000}
        }
    }))

    return (

        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme} >{children}</MantineProvider>
        </QueryClientProvider>
    )


}