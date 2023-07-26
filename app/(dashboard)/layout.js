'use client'

import AppNavbar from "@/common/Navbar";
import AppHeader from "@/common/Header";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-row w-screen">
        <AppNavbar />
        <div className="p-4 w-full">
          <AppHeader />
          <div className="py-6">
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}