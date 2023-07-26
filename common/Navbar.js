'use client'

import Link from "next/link";
import { HomeOutlined, PendingActionsOutlined, InventoryOutlined, AddCircleOutlineOutlined } from '@mui/icons-material';
import { useState } from "react";
import { usePathname } from "next/navigation";

const navbarItems = [
  { link: '/', Icon: HomeOutlined, label: 'home' },
  { link: '/published', Icon: InventoryOutlined, label: 'published' },
  { link: '/drafts', Icon: PendingActionsOutlined, label: 'drafts' },
  { link: '/create-new-blog', Icon: AddCircleOutlineOutlined, label: 'create new blog' },
];

export default function Component() {
  let pathname = usePathname();
  const [active, setActive] = useState(() => {
    if (pathname.split('/')[1] === '') return 0;
    if (pathname.split('/')[1] === 'published') return 1;
    if (pathname.split('/')[1] === 'drafts') return 2;
    if (pathname.split('/')[1] === 'create-new-blog') return 3;
  });

  return (
    <aside className={`h-screen border-r dark:border-gray-700 min-w-[300px] w-[300px] max-[1300px]:min-w-fit`}>
      <div className="cursor-default tracking-tighter uppercase font-bold text-2xl text-blue-600 m-6">
        Nexvest
        </div>
      <div className="my-4 px-2">
        {navbarItems.map((item, index) => {
          return <Link href={item.link} aria-label={item.label} key={item.label} onClick={() => setActive(index)}
            className={`flex flex-row items-center font-light rounded-lg p-3  text-lg 
          ${index === active && "dark:bg-[#292e4e] font-semibold"}`}>
            <item.Icon className='mr-3' classes={{ root: "stroke-0" }} />
            <div className="capitalize" >{item.label}</div>
          </Link>
        })}
      </div>
    </aside>
  )
}