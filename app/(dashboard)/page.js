"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import PageClient from './PageClient';

export default function Page() {
  const { data, status } = useSession();

  if (status === 'unauthenticated')
    redirect('/signin');
  if (status === 'authenticated')
    return <PageClient />;
}
