"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, FormEvent } from "react"
import { motion } from "framer-motion"

export default function Page() {
    const { toast }=useToast()
    const [isDisabled,setIsDisabled]=useState(false)
    const [currentTab, setCurrentTab] = useState(1);
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleUpdatePassword(e:FormEvent<HTMLFormElement>) {
        try{
            setIsDisabled(true)
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const url="/api/auth/password_reset"
            const response=await fetch(url,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    new_password:formData.get('new_password'),
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
                localStorage.removeItem("verify-details")
                const data:any=parseRes.data
                console.log(data)
                const stringifyData=JSON.stringify(data)
                localStorage.setItem("user-details",stringifyData)
                router.push('/')
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
                handleContinue(2)
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

    const verifyDetails: any=typeof window !== "undefined"?localStorage.getItem("verify-details"):null
    const parsedVerifyDetails=verifyDetails?JSON.parse(verifyDetails):{}
    function handleVerifyCode(e:string) {
        setValue(e)
        if(e.length===6){
            if(e===parsedVerifyDetails.code){
                handleContinue(3)
            }else{
                setError("The OTP you've enter is incorrect, go back and try again")
            }
        }
    }

    function checkAuth(){
        const stringifyData=localStorage.getItem("user-details")
        if(stringifyData){
            router.push("/home")
        }
    }

    function handleContinue(NextTab:number) { setCurrentTab(NextTab) }

    function maskEmail(email:string) { 
        const [localPart, domain] = email.split('@'); 
        const maskedLocalPart = localPart.slice(0, 3) + '***'; 
        return `${maskedLocalPart}@${domain}`; 
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
            className="md:w-[500px] w-[90vw] flex items-center rounded-none h-screen shadow-none"
        >
            <Card className="w-full rounded-none shadow-none border-none">
                {currentTab === 1 &&(
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">Password reset</CardTitle>
                        <CardDescription>{"To reset your password, we have to confirm the email address belonging to your account."}</CardDescription>
                    </CardHeader>
                )}
                {currentTab === 2 &&(
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">Enter one-time password</CardTitle>
                        {error.length===0?(
                            <CardDescription>Enter the one-time password sent to {maskEmail(`${parsedVerifyDetails.email}`)}.</CardDescription>
                        ):(
                            <CardDescription className="text-red-500">{error}</CardDescription>
                        )}
                    </CardHeader>
                )}
                {currentTab === 3 &&(
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">Password reset</CardTitle>
                        <CardDescription>{"Reset your password"}</CardDescription>
                    </CardHeader>
                )}
                <CardContent>
                    <div>
                        <div className="grid w-full items-center gap-4">
                            {currentTab === 1 && (
                                <form onSubmit={handleVerifyEmail} className="grid gap-4 w-full">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email" className="text-[var(--primary-01)] font-semibold required">Email address</Label>
                                        <Input id="email" name="email" type="email" placeholder="johndoe@example.com" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] font-semibold hover:bg-[var(--primary-01)]":""}`}>
                                        {isDisabled===false?(<p>Submit</p>):(<p>Submitting...</p>)}
                                    </Button>
                                </form>
                            )}
                            {currentTab === 2 && (
                                <InputOTP 
                                    maxLength={6} 
                                    pattern={"^[0-9]*$"} value={value}
                                    onChange={(value) => handleVerifyCode(value)}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                            {currentTab === 3 && (
                                <form onSubmit={handleUpdatePassword} className="grid gap-4 w-full">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email" className="text-[var(--primary-01)] font-semibold required">Email address</Label>
                                        <Input id="email" disabled name="email" type="email" placeholder={parsedVerifyDetails.email} defaultValue={`${parsedVerifyDetails.email}`} className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="new_password" className="text-[var(--primary-01)]  font-semibold required">Password</Label>
                                        <Input id="new_password" name="new_password" minLength={8} maxLength={24} type="password" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" placeholder="Password" required/>
                                    </div>
                                    <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] font-semibold hover:bg-[var(--primary-01)]":""}`}>
                                        {isDisabled===false?(<p>Update</p>):(<p>Updating...</p>)}
                                    </Button>
                                </form>
                            )}
                            
                            {/* <p className="text-sm text-gray-500 text-center">Or sign in with</p> */}
                            
                            <div className="flex gap-1 text-gray-600 items-center md:text-sm text-xs">
                                <p>{`I'm not sure of resetting my password?`}</p>
                                <Button variant="link" className="text-[var(--primary-01)] md:text-sm text-xs" asChild>
                                    <Link href="/">Go back</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    </div>
  )
}
