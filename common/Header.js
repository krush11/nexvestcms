'use client'

import { PowerSettingsNewOutlined } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Component() {
  const [title, setTitle] = useState(null);

  useEffect(() => {
    setTitle(window.document.title)
  })

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="uppercase">{title}</div>
      <button onClick={() => signOut()}
        className="dark:bg-slate-800 cursor-pointer p-2.5 rounded-full">
        <PowerSettingsNewOutlined color="error" />
      </button>
    </div>
  )
}