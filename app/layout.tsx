"use client"

import "./globals.css";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'



// Create a client
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
       <QueryClientProvider client={queryClient}>
           <main className="flex flex-col justify-center items-center w-full">
               {children}
           </main>
       </QueryClientProvider>
      </body>
    </html>
  );
}
