'use client'

import AppNavbar from "@/common/Navbar";
import AppHeader from "@/common/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const { status } = useSession();

  if (status === 'authenticated')
    return (
      <div className="flex flex-row w-screen">
        <AppNavbar />
        <div className="p-4 w-full">
          <AppHeader />
          <div className="py-6">
            {children}
          </div>
        </div>
      </div>
    );

  if (status === 'unauthenticated')
    redirect('/signin');
}