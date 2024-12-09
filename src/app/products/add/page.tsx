"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const { toast }=useToast()
    const [isDisabled,setIsDisabled]=useState(false)
    const router = useRouter()
    async function handleSignIn(e:any) {
        try{
            setIsDisabled(true)
            e.preventDefault()
            const url="/api/auth/sign_in"
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    password:e.target.password.value,
                    email:e.target.email.value
                })
            })
            const parseRes=await response.json()
            if(parseRes.error){
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: parseRes.error,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
                setIsDisabled(false)
            }else{
                const data:any=parseRes.data
                console.log(data)
                const stringifyData=JSON.stringify(data)
                localStorage.setItem("user-details",stringifyData)
                router.push('/home')
            }
        }catch(error:any){
            setIsDisabled(false)
            console.log(error.message)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    function checkAuth(){
        const stringifyData=localStorage.getItem("user-details")
        if(stringifyData){
            router.push("/home")
        }
    }

    useEffect(()=>{
        checkAuth()
    })
  return (
    <div className="flex font-[family-name:var(--font-geist-sans)] items-center flex-col h-screen">
        <Header/>
        <div className="md:w-[500px] w-[90vw] flex items-center rounded-none h-screen shadow-none">
            <Card className="w-full rounded-none shadow-none border-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">Add new product</CardTitle>
                    <CardDescription>Get started by sign in to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignIn}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email" className="text-[var(--primary-01)] font-semibold required">Email address</Label>
                                <Input id="email" name="email" type="email" placeholder="Enter your email" className="border-[var(--primary-03)] placeholder:font-semibold outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password" className="text-[var(--primary-01)]  font-semibold required">Password</Label>
                                <Input id="password" name="password" minLength={8} maxLength={24} type="password" className="border-[var(--primary-03)] placeholder:font-semibold outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" placeholder="Password" required/>
                            </div>
                            <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] font-semibold hover:bg-[var(--primary-01)]":""}`}>
                                {isDisabled===false?(<p>Sign in</p>):(<p>Sending...</p>)}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}