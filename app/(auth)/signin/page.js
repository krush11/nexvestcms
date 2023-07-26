"use client"

import { Button, Card, TextInput } from "@mantine/core";
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
    <Card w='400px'>
      <h2>Signin to Nexvest CMS</h2>
      <form onSubmit={checkSecret}>
        <TextInput required w='100%' radius='sm' type='password' id='password' placeholder='Enter secret code' />
        <Button type='submit' radius='sm' variant='filled' w='100%' my='md'>Signin</Button>
      </form>
    </Card>
  )
}