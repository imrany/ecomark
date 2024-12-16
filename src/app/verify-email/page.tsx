"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, FormEvent } from "react"

export default function Page() {
    const { toast }=useToast()
    const [isDisabled,setIsDisabled]=useState(false)
    const router = useRouter()

    async function handleVerifyEmail(e:FormEvent<HTMLFormElement>) {
        try{
            setIsDisabled(true)
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const url="/api/auth/verify_email"
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    email:formData.get('email')
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
                localStorage.setItem("verify-details",stringifyData)
                router.push('/otp')
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
        <div className="md:w-[500px] w-[90vw] flex items-center rounded-none h-full shadow-none">
            <Card className="w-full rounded-none shadow-none border-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">Get Verified!</CardTitle>
                    <CardDescription>Get started by verifying your email.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerifyEmail}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email" className="text-[var(--primary-01)] font-semibold required">Email address</Label>
                                <Input id="email" name="email" type="email" placeholder="Enter your email" className="border-[var(--primary-03)] placeholder:font-semibold outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                            </div>
                            
                            <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] font-semibold hover:bg-[var(--primary-01)]":""}`}>
                                {isDisabled===false?(<p>Send Code</p>):(<p>Sending...</p>)}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}