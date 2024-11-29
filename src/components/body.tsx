"use client"
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import { Brain, Mic, Plus, Search, SortDesc, Speaker } from "lucide-react";
import { Button } from "./ui/button";
import { ProductCard } from "@/components/product-card";
import { ProductType } from "@/app/types";
import { useEffect, useState } from "react";


type tagType={
    label:string,
    href:string,
    className?:string,
    variant:any,
    icon?:any
}

export default function Body() {
 const [isMobile,setIsMobile]=useState(false)

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
 ]

 const products:ProductType[] = [
    {
        slug: "lenovo-thinkpad-yoga-360",
        seller: "Imran Matano",
        date: "28th March, 2024",
        label: "Lenovo thinkpad yoga 360",
        description:`The ThinkPad Yoga 20CD0033US Convertible 12.5" Multi-Touch Business Ultrabook Computer from Lenovo features a unique 360° multi-mode design. Laptop Mode features the traditional layout of a laptop where you use the keyboard and touchpad to navigate the screen.`,
        image: "https://www.bhphotovideo.com/images/images500x500/lenovo_thinkpad_yoga_20cd0033us_convertible_1382660408_1004524.jpg",
        sellerAvatar: null,
        price:20000
    },
    {
        slug: "lenovo-notebook",
        seller: "Mike Ngoya",
        date: "28th March, 2023",
        label: "Lenovo notebook",
        description:`Brand NEW Lenovo Ideapad 1 | Celeron N4020 | 8GB RAM | 256GB SSD | 14'' Inch HD display School & Business Laptop Computer | Notebook | Windows 10 New Laptops Lenovo Laptop Computers`,
        image: "https://image.kilimall.com/kenya/shop/store/goods/6954/2022/10/1667205104519d1266d0daf9649079365a8982695c3f2_360.jpg.webp",
        sellerAvatar: null,
        price:310000
    },
    {
        slug: "lenovo-notepad",
        seller: "Manu Arora",
        date: "28th March, 2023",
        label: "Lenovo Notepad",
        description:`Brand New Lenovo Ideapad 1 | Intel Corei3-1215U 8GB 512SSD Storage14''inch HD Screen Display New School Business Cyber Laptop Computer NOTEBOOK`,
        image: "https://image.kilimall.com/kenya/shop/store/goods/5821/2022/11/166971955732950b5bdc72607449494ccdfb6a9908b67_360.jpg.webp",
        sellerAvatar: null,
        price:47000
    },
    {
        slug: "new-hp-envy",
        seller: "Manu Arora",
        date: "28th March, 2023",
        label: "NEW HP ENVY",
        description:`NEW HP ENVY X360 2-IN-1 LAPTOP 14 CORE 7 16GB RAM 512SSD STORAGE 15TH GENERATION WINDOWS 11 14 NCHS DISPLAY`,
        image: "https://img.kilimall.com/c/obs/seller/100003736/goods_image/241014174741_0865e9e1f9779c40cf321dc2725b8513.jpg",
        sellerAvatar: null,
        price: 121000
    },
    {
        slug: "dell",
        seller: "Manu Arora",
        date: "28th March, 2023",
        label: "Brand New Dell Vostro 3520",
        description:`Brand New Dell Vostro 3520 Laptop Notebook 12th Gen Intel Core i7-1255U 15.6" Display 16GB DDR4- SDRAM RAM 512GB SSD Ubuntu EU Plug`,
        image: "https://img.kilimall.com/c/obs/seller/9209/goods_image/240802215111_50d9dd5a76e5baf258aff7e9e421e2ef.png",
        sellerAvatar: null,
        price:120000
    },
    {
        slug: "refurbished-hp-eliebook",
        seller: "Manu Arora",
        date: "28th March, 2023",
        label: " REFURBISHED HP ELITEBOOK",
        description:`(SPECIAL OFFER) REFURBISHED HP ELITEBOOK 850 G2 CORE I7 8GB RAM 256GB SSD ,NOTEBOOK,15.6 "INCH , 5TH GENERATION, INSTALLED WINDOWS 11 , OFFICE 2019 + 9 MONTH WARRANTY+SEALED LAPTOP`,
        image: "https://image.kilimall.com/kenya/shop/store/goods/9797/2023/06/16868131892461e18fe166813411da888729786d8062e_360.jpg.webp",
        sellerAvatar: null,
        price:26000
    }
 ];

 function checkScreen(){
    if(screen.width>640){
        setIsMobile(false)
    }else{
        setIsMobile(true)
    }
  }

  if (typeof window !== 'undefined') {
    window.onresize=checkScreen
  }

  useEffect(()=>{
    checkScreen()
  })
  return (
    <div className="flex font-[family-name:var(--font-geist-sans)] mt-[80px] flex-col w-full bg-[var(--body-bg)] py-8 px-4 rounded-[50px]">
        <div className="flex items-center flex-wrap justify-between gap-1 mb-6">
            <p className="text-xl font-semibold text-[var(--primary-01)]">Products</p>
            {!isMobile?(
                <div className="flex gap-2 items-center flex-wrap">
                    <div className="flex items-center rounded-[50px] gap-2 bg-slate-100 py-2 px-3">
                        <Search className="text-gray-500 w-[20px] h-[20px]"/>
                        <input id="search" name="search" type="search" placeholder="Search product..." className="bg-slate-100 h-full border-none active:border-none focus:outline-none active:outline-none focus:border-none" required/>
                    </div>
                    <Button variant="outline" className="flex gap-2 rounded-[50px]">
                        <p>Add New Product</p>
                        <Plus />
                    </Button>
                </div>
            ):""}
        </div>
        {!isMobile?(
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-grow">
                    {tags.map((btn)=>{
                        return(
                            <Button key={btn.label} variant={btn.variant} className={btn.className}>
                                <p>{btn.label}</p>
                            </Button>
                        )
                    })}
                </div>
                <Button variant="outline" className="ml-auto flex gap-2 rounded-[50px]">
                    <p>Sort by</p>
                    <SortDesc />
                </Button>
            </div>
        ):""}
        <div>
            {products?(
                <div className="pt-4 max-sm:flex flex-wrap gap-2 max-sm:gap-y-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                    {products.map(product=>{
                        return(
                            <ProductCard key={product.slug} product={product}/>     
                        )
                    })}
                </div>
            ):(
                <div>No products</div>
            )}
        </div>
    </div>
  )
}
