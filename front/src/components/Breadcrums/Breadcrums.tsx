"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
export default function Breadcrums() {
    const route = usePathname()
    const arry = route.split("/")
    const newArry = arry.map((i) => {
        if (!i) {
            return {
                name: "خانه", url: "/"
            }
        }
        if (i === "search") {
            return {
                name: "جستجو", url: "/search/"
            }
        }
        if (i === "blog") {
            return {
                name: "بلاگ", url: "/blog"
            }
        }
        if (i === "post") {
            return {
                name: "پست"
            }
        }
        if (i === "about-us") {
            return {
                name: "درباره ما", url: "/about-us"
            }
        }
        if (i === "contact-us") {
            return {
                name: "ارتباط با ما", url: "/contact-us"
            }
        }
        if (i === "faqs") {
            return {
                name: "سوالات متداول", url: "/faqs"
            }
        }
        if (i === "request-project") {
            return {
                name: "گرفتن قیمت آنلاین", url: "/request-project"
            }
        }
        if (i === "project") {
            return {
                name: "پروژه های ما", url: "/project"
            }
        }
        if (i === "comments") {
            return {
                name: "نظرات مشتریان", url: "/comments"
            }
        }
        if (i === "experts") {
            return {
                name: "مجریان تیم", url: "/experts"
            }
        }
        return {
            name: i,
        }
    })
    return (
        <div className='flex gap-3 items-center text-gray-900 dark:text-gray-200 dark:bg-slate-600/50 bg-blue-100/50 shadow-md p-3 rounded-md'>
            {newArry.map((i, index) => (
                <React.StrictMode key={index}>
                    {i.url ? <Link href={i.url} className='hover:text-blue-500'>
                        {i.name}
                    </Link> :
                        <span>
                            {i.name}
                        </span>
                    }
                    {newArry.length - 1 === index ? null :
                        "/"
                    }
                </React.StrictMode>
            ))}
        </div>
    )
}
