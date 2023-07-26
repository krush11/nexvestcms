"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();

  async function checkSecret(e) {
    e.preventDefault()
    const res = await signIn('credentials', {
      password: e.target.password.value,
      redirect: false
    });
    res.ok && push('/');
  }

  return (
    <>
      <div className="flex flex-col items-center mt-[15%]">
        <div className="capitalize text-3xl">
          Welcome Back!
        </div>
        <form className="mt-8 w-2/3" onSubmit={checkSecret}>
          <div className="text-sm text-[#93a2b7]">
            Enter the secret key to get access to Nexvest CMS Portal
          </div>
          <input className="mt-2 w-full block py-3 px-4 border border-gray-200 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 focus:outline-none"
            placeholder="Secret key" required type="password" name='password' id='password' />
          <button type="submit" className="w-full uppercase mt-3 py-2.5 px-4 rounded-md border-2 font-bold tracking-wide text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none transition-all text-sm dark:border-blue-500">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}