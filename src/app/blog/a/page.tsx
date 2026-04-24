import Link from "next/link"
export default async function APage() {
   //遇到异常会自动跳转到error组件
    return (
        <div className="screen-full flex items-center justify-center text-2xl font-bold flex-col">
            <h1>A Page</h1>
            <Link href="/about" className="">跳转About页面</Link>
            <Link href={{pathname: "/about", query: {name: "张三"}}}>跳转About并且传入参数</Link>
            <Link href="/page" prefetch={true}>预获取page页面</Link>
            <Link href="/xm" scroll={true}>保持滚动位置</Link>
            <Link href="/daman" replace={true}>替换当前页面</Link>

        </div>
    )
}
