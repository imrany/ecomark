"use client"
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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Page() {
    const [error,setError]=useState("")
    const [isLoading,setIsLoading]=useState(true)
    const [value, setValue] = useState("")
    const router = useRouter()
    
    const verifyDetails: any=typeof window !== "undefined"?localStorage.getItem("verify-details"):null
    const parsedVerifyDetails=verifyDetails?JSON.parse(verifyDetails):{}
    function handleVerifyCode(e:string) {
        setValue(e)
        if(e.length===6){
            if(e===parsedVerifyDetails.code){
                localStorage.setItem("verified",`${true}`)
                router.push("/sign-up")
            }else{
                setError("The OTP you've enter is incorrect, go back and try again")
            }
        }
    }

    function checkAuth(){
        const stringifyData=typeof window !== "undefined"?localStorage.getItem("user-details"):null
        const verified=typeof window !== "undefined"?localStorage.getItem("verified"):null
        const verifyDetails: any=typeof window !== "undefined"?localStorage.getItem("verify-details"):null
        const parsedVerifyDetails=JSON.parse(verifyDetails)
        if(stringifyData){
            router.push("/home")
        }else if(!verifyDetails||!parsedVerifyDetails.email||!parsedVerifyDetails.code){
            router.push("/verify-email")
        }else if(verified){
            router.push("/sign-up")
        }else{
            setIsLoading(false)
        }
    }

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
        {isLoading?(
            <div className="w-full flex items-center justify-center h-full">
                <p className="text-gray-800 max-sm:text-sm">Loading...</p>
            </div>
        ):(
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}  
            className="md:w-[500px] w-[90vw] flex items-center rounded-none h-full shadow-none"
        >
            <Card className="w-full rounded-none shadow-none border-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">Enter one-time password</CardTitle>
                    {value === "" ? (
                        <CardDescription>Enter the one-time password sent to {maskEmail(`${parsedVerifyDetails.email}`)}.</CardDescription>
                    ):(
                        <>
                            {error.length>0?(
                                <CardDescription className="text-sm text-red-500">{error}</CardDescription>
                            ):(
                                <CardDescription>Enter the one-time password sent to imr***@gmail.com.</CardDescription>
                            )}
                        </>
                    )}
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
        </motion.div>
        )}
    </div>
  )
}