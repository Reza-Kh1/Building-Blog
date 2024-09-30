"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
type NavlinkHeaderType = {
    className?: string;
    url: string;
    title: string;
}
export default function NavlinkHeader({ className, url, title }: NavlinkHeaderType) {
    const router = usePathname()
    return (
        <Link className={className + ` ${url === router ? "text-blue-400" : ""}`} href={url}>{title}</Link>
    )
}
