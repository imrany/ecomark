export type ProductType={
    slug:string,
    seller:string,
    date:string,
    label:string,
    description:string,
    image:string,
    sellerAvatar:string | null,
    price:number
}

export type tagType={
    label:string,
    href:string,
    className?:string,
    variant:any,
    icon?:any
}