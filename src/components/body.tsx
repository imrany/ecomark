"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, SortDesc } from "lucide-react";
import { Button } from "./ui/button";
import { ProductCard } from "@/components/product-card";
import { ProductType, tagType } from "@/app/types";
import { useEffect, useState } from "react";
import TagCarousel from "./tag-carousel";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from 'next/navigation'

export default function Body({
    products
}:{
    products:ProductType[]
}) {
 const router =useRouter()
 const [isMobile,setIsMobile]=useState(false)
 const [userDetails, setUserDetails] = useState<any>(null);

 const updateTransformValue = () => {
    const screenWidth = window.innerWidth;
    const newTransformValue:boolean = screenWidth > 640 ? false : true;
    setIsMobile(newTransformValue);
 };


 const tags:tagType[]=[
    {
        label:"All products",
        href:"/",
        className:"hover:text-[var(--primary-01)] rounded-[50px]",
        variant:"ghost"   
    },
    {
        label:"Most purchased",
        href:"/",
        className:"bg-gray-200 text-[var(--primary-01)] hover:bg-gray-200 hover:text-[var(--primary-01)] rounded-[50px]",
        variant:"default"   
    },
    {
        label:"Laptops",
        href:"/",
        className:"hover:text-[var(--primary-01)] rounded-[50px]",
        variant:"ghost"   
    },
    {
        label:"Utensils",
        href:"/",
        className:"hover:text-[var(--primary-01)] rounded-[50px]",
        variant:"ghost"   
    },
    {
        label:"Gas",
        href:"/",
        className:"hover:text-[var(--primary-01)] rounded-[50px]",
        variant:"ghost"   
    },
    {
        label:"Food items",
        href:"/",
        className:"hover:text-[var(--primary-01)] rounded-[50px]",
        variant:"ghost"   
    },
    {
        label:"Furniture",
        href:"/",
        className:"hover:text-[var(--primary-01)] rounded-[50px]",
        variant:"ghost"   
    },
 ]

  useEffect(()=>{
    updateTransformValue();
    window.addEventListener('resize', updateTransformValue);
    if (typeof window !== "undefined") {
        const storedUserDetails:any = localStorage.getItem("user-details");
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        }
    }
    return () => window.removeEventListener('resize', updateTransformValue);
 }, [isMobile])
  return (
    <div className="flex font-[family-name:var(--font-geist-sans)] mt-[63px] sm:mt-[43px] flex-col w-full sm:p-4 p-2">
        <div className="flex items-center flex-wrap justify-between gap-1 mb-6">
            <p className="text-xl font-semibold text-[var(--primary-01)]">Most purchased</p>
            {!isMobile?(
                <div className="flex gap-2 items-center flex-wrap">
                    <form className="flex items-center rounded-[50px] gap-2 bg-slate-100 py-2 px-3">
                        <Search className="text-gray-500 w-[20px] h-[20px]"/>
                        <input id="search" name="search" type="search" placeholder="Search product..." className="bg-slate-100 h-full border-none active:border-none focus:outline-none active:outline-none focus:border-none" required/>
                    </form>
                    {userDetails&&
                        (<Button onClick={()=>router.push("/products/add")} variant="outline" className="flex gap-2 rounded-[50px]">
                            <p>Add New Product</p>
                            <Plus />
                        </Button>
                    )}
                </div>
            ):(
                <div className="flex gap-2 items-center flex-wrap">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex items-center justify-center h-[35px] w-[32px] rounded-[50px]">
                                <Search />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-[90vw] rounded-md">
                            <DialogHeader>
                                <DialogTitle>Search</DialogTitle>
                                <DialogDescription>
                                    Search for any product using its name
                                </DialogDescription>
                            </DialogHeader>
                            <form className="grid gap-4 py-4">
                                <div className="flex items-center rounded-md gap-2 bg-slate-100 py-2 px-3">
                                    <Search className="text-gray-500 w-[20px] h-[20px]"/>
                                    <input id="search" name="search" type="search" placeholder="Search product..." className="bg-slate-100 h-full border-none active:border-none focus:outline-none active:outline-none focus:border-none" required/>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="bg-[var(--primary-01)] hover:bg-[var(--primary-01)]">Search</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {userDetails&&(
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="flex items-center justify-center h-[35px] w-[32px] rounded-[50px]">
                                    <Plus />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] w-[90vw] rounded-md">
                                <DialogHeader>
                                    <DialogTitle>Add</DialogTitle>
                                    <DialogDescription>
                                        Add a new product
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="grid gap-4 py-4">
                                    <div className="flex flex-col max-sm:w-full space-y-1.5">
                                        <Label htmlFor="product_name" className="text-[var(--primary-01)]  required">Product name</Label>
                                        <Input id="product_name" name="product_name" type="text" placeholder="Enter your product name" className="border-[var(--primary-03)] outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="bg-[var(--primary-01)] hover:bg-[var(--primary-01)]">Submit</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
            <TagCarousel tags={tags}/>
            <Button variant="outline" className="ml-auto flex gap-2 rounded-[50px]">
                <p>Sort by</p>
                <SortDesc />
            </Button>
        </div>
        <div>
            {products&&products[0].product_name.length>0?(
                <div className="pt-4 max-sm:flex flex-wrap gap-2 max-sm:gap-y-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center">
                    {products.map(product=>{
                        return(
                            <ProductCard key={product.product_reference} product={product}/>     
                        )
                    })}
                </div>
            ):(
                <div className="pt-4 max-sm:flex flex-wrap gap-2 max-sm:gap-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center">
                    {[1,2,3,4].map(n=>(
                        <div key={n} className="flex flex-col space-y-3">
                            <Skeleton className="w-[300px] h-[200px] rounded-xl" />
                            <div className="space-y-2">
                            <Skeleton className="h-6 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}
