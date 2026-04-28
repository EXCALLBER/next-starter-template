import { log } from "console"
import { cacheLife } from "next/cache"
import { connection } from "next/server"
import { Suspense } from "react"
import RefreshButton, { ViewImageButton } from "./RefreshButton"
import Image from "next/image"
import Script from "next/script"

// export const revalidate = 5

interface ShopPageProps {
    params: Promise<{ id?: string[] }>
}

const RandomImage = async () => {

    // 重新获取图片点击事件
    const randomImage = await fetch('https://www.loliapi.com/acg/pc?type=json', { next: { tags: ['random-image'] } })
    const data = await randomImage.json() as { url: string }
    log(data.url)


    return <div className="mt-4">
        <p>随机生成的图片:<a href={data.url} target="_blank" rel="noopener noreferrer">查看</a><RefreshButton>换一个</RefreshButton></p>
        <img
        
            src={data.url}
            alt="随机图片"
            className="mt-2 max-w-xs rounded-lg shadow-md"
            sizes="100vw" />
    </div>
}

const RandomName = async () => {
    // 'use cache'
    // await connection()
    // cacheLife({stale: 5, revalidate: 5, expire: 5})
    const data = await fetch('https://www.mocklib.com/mock/random/name', { next: { revalidate: 3600 } })
    const json = await data.json() as { name: string }
    log(json.name)
    return <p>随机生成的名称: {json.name}</p>
}

async function IdList({ params }: ShopPageProps) {
    const { id } = await params
    return (
        <ul>
            {(id ?? []).map((segment) => (
                <li key={segment}>id: {segment}</li>
            ))}
        </ul>
    )
}



export default function ShopPage({ params }: ShopPageProps) {

    const len = 20
    return (
        <div className="screen-full flex items-center justify-center text-2xl font-bold flex-col">
            <h1>Shop Page</h1>
            <Script src="https://unpkg.com/vue@3/dist/vue.global.js"
            />
            <Suspense fallback={<p>Loading...</p>}>
                <IdList params={params} />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <RandomName />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <RandomImage />
            </Suspense>
            <div className="mt-4 flex flex-wrap gap-4 justify-center items-start">
                {Array.from({ length: len }).map((_, index) => {
                    const randomImage = `https://eo-img.521799.xyz/i/pc/img${index + 1}.webp`
                    return <ViewImageButton key={index}>
                        <Image
                            className="max-w-xs rounded-lg shadow-md"
                            src={randomImage}
                            alt="1"
                            width={192}
                            height={108}
                            preload={index < 10}
                            loading="eager"
                            unoptimized
                        /></ViewImageButton>
                })}
            </div>
        </div>
    )
}