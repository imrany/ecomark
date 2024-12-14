"use client"
import Body from "@/components/body"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Hero from "@/components/hero"
import { useState, useEffect } from "react"
import { ProductType } from "./types"

export default function Home() {
  const [products,setProducts]=useState<ProductType[]>([
    {
      product_reference:"",
      product_photo:"",
      product_category:"",
      product_name:"",
      product_description:"",
      product_price:0,
      business_name:"",
      business_location:"",
      business_phone_number:0,
      business_till_number:0,
      business_paybill:0,
      business_paybill_account_number:0,
      business_location_photo:"",
      business_location_lat_long:"",
      sellerAvatar:null,
    }
  ])

  function convertData(data:any){
    const convertedData = data.map((item:any) => ({
        product_reference: item["Product Reference"],
        product_photo: item["Product Photo"],
        product_category: item["Product Category"],
        product_name: item["Product Name"],
        product_description: item["Product Description"],
        product_price: Number(item["Product Price"]),
        business_name: item["Business Name"],
        business_location: item["Business location"],
        business_phone_number: Number(item["Business Phone Number"]),
        business_till_number: Number(item["Business Till number"]),
        business_paybill: Number(item["Business Paybill"]) || null,
        business_paybill_account_number: Number(item["Business paybill account number"]) || null,
        business_location_photo: item["Business Location Photo"],
        business_location_lat_long: item["Business Location lat_long"]
    }));
    
    return convertedData;
  }

  async function getProducts(){
    try{
      const url=`/api/products`
      const response=await fetch(url)
      const parseRes=await response.json()
      if(parseRes.error){
        console.log(parseRes.error)
      }else{
        console.log(parseRes.data)
        const convertProducts=convertData(parseRes.data)
        setProducts(convertProducts)
      }
    }catch(error){
      console.log(error)
    }
  }
 
  async function registerServiceWorker() {
    try{
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      console.log("sw registered")
    }catch(error:any){
      console.log(error.message)
    }
  }

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker()
    }
    getProducts()
  }, [])
  return(
    <main className="flex min-h-screen overflow-x-hidden flex-col items-center justify-start">
      <Header/>
      {/* <Hero/> */}
      <Body products={products}/>
      {/* <Footer/> */}
    </main>
  )
}