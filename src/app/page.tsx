'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"

//  登录页面
export default function Page() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    const data = await response.json();
    if (data.message === "登录成功!") {
      // 消息提示登录成功后跳转到home页面
      alert(data.message);
      router.push("/home");
    } else {
      alert(data.message);
    }
  }
 
  return (
    <div className='mt-10 flex flex-col items-center justify-center gap-4'>
            <Input value={userName} onChange={(e) => setUserName(e.target.value)} className='w-[250px]' placeholder="请输入用户名" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} className='w-[250px]' placeholder="请输入密码" />
            <Button onClick={handleLogin}>登录</Button>
        </div>
  )
}