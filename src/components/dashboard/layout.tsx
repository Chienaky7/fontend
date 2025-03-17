"use client"

import type { ReactNode } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import TopNav from "@/components/dashboard/top-nav"

interface LayoutProps {
    readonly children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={`flex h-screen`}>
            <Sidebar />
            <div className="w-full flex flex-1 flex-col">

                <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
                    <TopNav />
                </header>
                <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
            </div>
        </div>
    )
}
