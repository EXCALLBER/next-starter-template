'use client'
import { useParams } from "next/navigation"

export default function ShopPage() {
    const params = useParams()
    console.log(params)
    return (
        <div className="screen-full flex items-center justify-center text-2xl font-bold flex-col">
            <h1>Shop Page</h1>
            <ul>
                {params.id?.map((id: string) => (
                    <li key={id}>id: {id}</li>
                ))}
            </ul>
        </div>
    )
}