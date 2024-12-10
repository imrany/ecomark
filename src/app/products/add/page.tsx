"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react";
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function Page() {
    const { toast }=useToast()
    const [isDisabled,setIsDisabled]=useState(false)
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState(null);

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
                    product_description:e.target.product_description.value,
                    product_name:e.target.product_name.value
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
    <div className="flex font-[family-name:var(--font-geist-sans)] mx-5 mt-4 flex-col h-screen">
        <div className="flex w-full">
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <ArrowLeft/>
                </Button>
                <div>
                    <p className="text-sm font-semibold text-gray-600">Back to products</p>
                    <p className="text-xl font-semibold text-[var(--primary-01)]">Add new product</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex flex-col gap-4">
                <div>
                    <div className="w-[500px]">
                        <div className="grid w-full items-center gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="product_photo" className="text-[var(--primary-01)] font-semibold required">Product Photo</Label>
                                <Input id="product_photo" className="w-[500px] border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" type="file" required/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="product_name" className="text-[var(--primary-01)] font-semibold required">Product Name</Label>
                                <Input id="product_name" name="product_name" type="text" placeholder="Enter your product name" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="product_category" className="text-[var(--primary-01)] font-semibold required">Product Category</Label>
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder="Choose your product's category"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="product_description" className="text-[var(--primary-01)] font-semibold required">Product Description</Label>
                                <Textarea id="product_description" name="product_description" className="h-[200px] border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" placeholder="Describe your product" required>
                                </Textarea>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="product_price" className="text-[var(--primary-01)] font-semibold required">Price</Label>
                                <Input id="product_price" name="product_price" type="number" placeholder="Enter product price" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                            </div>
                            <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] font-semibold hover:bg-[var(--primary-01)]":""}`}>
                                {isDisabled===false?(<p>Add Product</p>):(<p>Adding Product...</p>)}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">

            </div>
        </div>
        <div className="md:w-[500px] w-[90vw] flex items-center rounded-none h-screen shadow-none">
        </div>
    </div>
  )
}