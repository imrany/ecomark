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
import { useRouter } from "next/navigation"
import { useEffect, useState, FormEvent } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { motion, AnimatePresence } from "framer-motion"

export default function SignUp() {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading,setIsLoading]=useState(true)
    const [isDisabled,setIsDisabled]=useState(false)
    const [currentTab, setCurrentTab] = useState(1);
    const [locationCoordinates, setLocationCoordinates]=useState("")
    const [getLocationError,setGetLocationError]=useState("")

    async function handleSignUp(e:FormEvent<HTMLFormElement>) {
        try{
            e.preventDefault()
            const formData=new FormData(e.currentTarget)
            const verifyDetails:any= localStorage.getItem('verify-details')
            const parsedVerifyDetails = JSON.parse(verifyDetails)
            if(formData.get('confirm')!==formData.get('password')){
                toast({
                    variant: "destructive",
                    description: "Password doesn't match!",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }else{
                setIsDisabled(true)    
                const url="/api/auth/sign_up"
                const response=await fetch(url,{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        username:formData.get('username'),
                        full_name:`${formData.get('first_name')} ${formData.get('last_name')}`,
                        photo:null,
                        email:parsedVerifyDetails.email,
                        phone_number:formData.get("phone_number"),
                        location_name:formData.get("location_name"),
                        location_lat_long:locationCoordinates,
                        acccount_balance:0,
                        password:formData.get('confirm'),
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
                    localStorage.removeItem('verify-details')
                    const data:any=parseRes.data
                    console.log(data)
                    const stringifyData=JSON.stringify(data)
                    localStorage.setItem("user-details",stringifyData)
                    router.push('/home')
                }
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
        const verified:any=localStorage.getItem("verified")
        const isEmailVerified=JSON.parse(verified)

        if(stringifyData){
            router.push("/home")
        }else if(!verified||isEmailVerified===false){
            setIsLoading(false)
            router.push("/verify-email")
        }
    }

    function handleContinue(NextTab:number) { setCurrentTab(NextTab) }

    function turnOnLocation(e:any){
        if(locationCoordinates.length===0){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocationCoordinates(`${latitude}, ${longitude}`)
                  },
                  function(error) {
                    e.target.checked=false
                    setGetLocationError(`Error: ${error.message}`);
                    setLocationCoordinates("0,0")
                  }
                );
            } else {
                e.target.checked=false
                setGetLocationError("Geolocation is not supported by this browser.");
                setLocationCoordinates("0,0")
            }
        }
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
        <div className="md:w-[500px] w-[90vw] flex items-center rounded-none h-screen shadow-none">
            <Card className="w-full rounded-none shadow-none border-none">
                {currentTab === 1 ?(
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">You're almost there!</CardTitle>
                        <CardDescription>Create your account here.</CardDescription>
                    </CardHeader>
                ):(
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">You're almost finishing!</CardTitle>
                        <CardDescription>You are almost finishing creating your account.</CardDescription>
                    </CardHeader>
                )}
                <CardContent>
                    <form onSubmit={handleSignUp}>
                        <div className="grid w-full items-center gap-4">
                            {currentTab === 1 && (
                                <motion.div key="first_tab" 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={{ opacity: 0 }} 
                                    className="grid w-full items-center gap-4" 
                                >
                                    <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-2 max-sm:gap-y-4 w-full">
                                        <div className="flex flex-col max-sm:w-full space-y-1.5">
                                            <Label htmlFor="first_name" className="text-[var(--primary-01)] font-semibold required">First name</Label>
                                            <Input id="first_name" name="first_name" type="text" placeholder="Enter your legal first name" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                        </div>
                                        <div className="flex flex-col max-sm:w-full space-y-1.5">
                                            <Label htmlFor="last_name" className="text-[var(--primary-01)] font-semibold  required">Last name</Label>
                                            <Input id="last_name" name="last_name" type="type" placeholder="Enter your legal last name" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col max-sm:w-full space-y-1.5">
                                        <Label htmlFor="username" className="text-[var(--primary-01)] font-semibold required">Username</Label>
                                        <Input id="username" name="username" type="text" placeholder="Enter preferred username" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <div className="flex flex-col max-sm:w-full space-y-1.5">
                                        <Label htmlFor="phone_number" className="text-[var(--primary-01)] font-semibold required">Phone number</Label>
                                        <Input id="phone_number" name="phone_number" type="tel" placeholder="254703733290" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <div className="flex flex-col max-sm:w-full space-y-1.5">
                                        <Label htmlFor="location_name" className="text-[var(--primary-01)] font-semibold required">City of residency</Label>
                                        <Input id="location_name" name="location_name" type="text" placeholder="Mombasa" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <Button type="button" onClick={()=>handleContinue(2)} variant="default" className={`h-[40px] bg-[var(--primary-01)] hover:bg-[var(--primary-01)]`}>
                                        <p>Continue</p>
                                    </Button>
                                </motion.div>
                            )}
                            {currentTab === 2 &&(
                                <motion.div key="second_tab" 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={{ opacity: 0 }} 
                                    className="grid w-full items-center gap-4"
                                >
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password" className="text-[var(--primary-01)] font-semibold  required">Password</Label>
                                        <Input id="password" name="password" minLength={8} maxLength={24} type="password" placeholder="Create password" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="confirm" className="text-[var(--primary-01)] font-semibold  required">Confirm password</Label>
                                        <Input id="confirm" name="confirm" minLength={8} maxLength={24} type="password" placeholder="Confirm password" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <div className="flex flex-col max-sm:w-full space-y-1.5">
                                        <div className="flex items-center justify-center w-full sm:justify-start py-2 sm:py-0">
                                            <input id="location_lat_long" onChange={(e)=>turnOnLocation(e)} defaultValue={`${false}`} name="push-notifications" type="checkbox" phx-debounce="blur" className="h-4 w-4 rounded border-gray-300 text-[var(--primary-01)] focus:ring-[var(--primary-01)]"/>
                                            <label htmlFor="location_lat_long" className="ml-3 flex w-full justify-between">
                                                <span className="block text-sm font-medium text-[var(--primary-01)]">
                                                    Turn on location
                                                </span>
                                                <span className="block text-sm font-medium text-red-500">{getLocationError}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex justify-between flex-wrap-reverse w-full gap-2">
                                        <Button type="button" onClick={()=>handleContinue(currentTab-1)} variant="secondary" className={`w-[150px] h-[40px]`}>
                                            <p>Back</p>
                                        </Button>

                                        <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] hover:bg-[var(--primary-01)]":""}`}>
                                            {isDisabled===false?(<p>Create account</p>):(<p>Creating...</p>)}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                            
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        )}
    </div>
  )
}
