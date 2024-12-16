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
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
                    description: parseRes.error,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
                setIsDisabled(false)
            }else{
                const data:any=parseRes
                const stringifyData=JSON.stringify(data)
                localStorage.setItem("verify-details",stringifyData)
                router.push('/otp')
            }
        }catch(error:any){
            setIsDisabled(false)
            console.log(error.message)
            toast({
                variant: "destructive",
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
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="md:w-[500px] w-[90vw] flex items-center rounded-none h-full shadow-none"
        >
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
                                <Input id="email" name="email" type="email" placeholder="Enter your email" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                            </div>
                            
                            <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] font-semibold hover:bg-[var(--primary-01)]":""}`}>
                                {isDisabled===false?(<p>Send Code</p>):(<p>Sending...</p>)}
                            </Button>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden>
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-600">Or continue with</span>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button type="button" className="h-[40px]" variant="outline">
                                    <Image alt="" src="/google-vector.svg" width={18} height={18} priority/>
                                    <span>Sign up with Google</span>
                                </Button>
                            </div>
                            <div className="flex gap-1 text-gray-600 items-center justify-center md:text-sm text-xs">
                                <p>{`Do you have an account?`}</p>
                                <Button variant="link" className="text-[var(--primary-01)] md:text-sm text-xs rounded-[50px]" asChild>
                                    <Link href="/sign-in">Sign in</Link>
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    </div>
  )
}