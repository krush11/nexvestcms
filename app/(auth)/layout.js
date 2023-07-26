"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const { status } = useSession();

  if (status === 'unauthenticated')
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-[600px] h-5/6">
          <div className="tracking-tighter uppercase font-bold text-2xl text-white">
            Nexvest
          </div>
          {children}
        </div>
      </div>
    )

  if (status === 'authenticated')
    redirect('/', 'push');
}