import React from 'react'
import IconSocialMedia from '../IconSocialMedia/IconSocialMedia'
import Link from 'next/link'
import Image from 'next/image';
const menuTitle = [
  "خانه",
  "ارتباط با ما",
  "تماس با ما",
  "سوالات متداول",
  "وبلاگ",
  "گالری",
];
export default function Header() {
  return (
    <div className='max-w-7xl w-full py-5 mx-auto'>
      <div className='w-full flex justify-between'>
        <div className='w-4/12 text-right'>
          <IconSocialMedia />
        </div>
        <div className='w-8/12 text-center'>
          <ul className='flex gap-7 justify-center text-sm'>
            <li className='hover:text-blue-400'>
              <Link href={"#"}>
                ارتباط با ما
              </Link>
            </li>
            <li className='hover:text-blue-400'>
              <Link href={"#"}>
                سوالات متداول
              </Link>
            </li>
            <li className='hover:text-blue-400'>
              <Link href={"#"}>
                خانه
              </Link>
            </li>
          </ul>
        </div>
        <div className='w-4/12 text-left'>test</div>
      </div>
      <div className='w-full flex justify-between border-t mt-7'>
        <div className='w-4/12 text-right'>test</div>
        <div className='w-8/12 flex justify-evenly items-end '>
          <ul className='flex justify-evenly text-slate-600 w-full'>
            {menuTitle.map((i, index) => (
              <li key={index} className="flex">
                <Link
                  href="#"
                  className="hover:text-blue-400 hover:scale-105 transition-all scale-1 flex items-center"
                >
                  {i}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-4/12'>
          <figure className='flex justify-end items-start'>
            <Image src={"/logo.png"} width={70} height={20} alt='logo' />
          </figure>
        </div>
      </div>
    </div>
  )
}
