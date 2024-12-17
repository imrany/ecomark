// import Body from "@/components/body"

// '/products?a=1'
export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const filters = (await searchParams).filters
   
    return(
        <main className="flex min-h-screen overflow-x-hidden flex-col justify-start">
            {/* <Body products={products}/> */}
            {filters}
        </main>
    )
}