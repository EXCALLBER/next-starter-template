"use client"
import { useTransition } from "react"
import { refreshRandomImage } from "./actions"
import React from "react"

export default function RefreshButton({ children }: { children: React.ReactNode }) {
//     const router = useRouter()
//   6 -    return <button onClick={() => router.refresh()}>{children}</button>
    const [isPending, startTransition] = useTransition()
    return (
        <button
            onClick={() => startTransition(() => refreshRandomImage())}
            disabled={isPending}
        >
            {isPending ? '加载中...' : children}
        </button>
    )
}

// 查看大图
export function ViewImageButton({ children }: { children: React.ReactNode }) {
    // 获取children中的图片地址而非路由地址
    const imageUrl = (React.Children.toArray(children)[0] as React.ReactElement<{ src: string }>).props.src

    return (
        <button 
        className="text-blue-500 block hover:cursor-pointer"
        onClick={()=>{
            window.open(imageUrl, '_blank', 'noopener,noreferrer')
        }}>
            {children}
        </button>
    )
}
