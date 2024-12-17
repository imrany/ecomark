"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ChevronRight, Home, LogIn, Mail, Menu, Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

type LinkType = {
    label: string,
    href: string,
    className?: string,
    variant: any,
    icon?: any
}

export default function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(false); // Manage menu visibility
    const [userDetails, setUserDetails] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserDetails = localStorage.getItem("user-details");
            if (storedUserDetails) {
                setUserDetails(JSON.parse(storedUserDetails));
            }
        }
    }, []);

    const links: LinkType[] = [
        {
            label: "Products",
            href: "/",
            className: "hover:text-[var(--primary-01)] text-[var(--text-primary-04)]",
            variant: "ghost"
        },
        {
            label: "Contact us",
            href: "mailto:imranmat254@gmail.com?subject=Mail from Villebiz-ke",
            className: "hover:text-[var(--primary-01)] text-[var(--text-primary-04)]",
            variant: "ghost"
        },
        !userDetails && {
            label: "Sign in",
            href: "/sign-in",
            className: "bg-[var(--primary-01)] hover:bg-[var(--primary-01)]",
            variant: "default"
        },
        userDetails && {
            label: `${userDetails.username}`,
            href: `/user/${userDetails.email}`,
            className: "bg-[var(--primary-01)] hover:bg-[var(--primary-01)]",
            variant: "default"
        }
    ].filter(Boolean); // Filter out falsey values, like null

    const mobileLinks: LinkType[] = [
        userDetails && {
            label: "Go to home page",
            icon: (<Home className="text-[var(--primary-01)] w-[20px] h-[20px]" />),
            href: "/home",
            variant: "link"
        },
        !userDetails && {
            label: "Go to Landing page",
            icon: (<Home className="text-[var(--primary-01)] w-[20px] h-[20px]" />),
            href: "/",
            variant: "link"
        },
        !userDetails && {
            icon: (<LogIn className="text-[var(--primary-01)] w-[20px] h-[20px]" />),
            label: "Sign in",
            href: "/sign-in",
            variant: "ghost"
        },
        userDetails && {
            icon: (<Plus className="text-[var(--primary-01)] w-[20px] h-[20px]" />),
            label: "Add new product",
            href: "/",
            variant: "link"
        },
        userDetails && {
            icon: (<Settings className="text-[var(--primary-01)] w-[20px] h-[20px]" />),
            label: `${userDetails.username}`,
            href: `/user/${userDetails.username}`,
            variant: "ghost"
        },
    ].filter(Boolean); // Filter out falsey values, like null

    const handleClose = () => {
        setOpen(false); // Set open state to false to close the menu
    };

    function checkScreen() {
        if (screen.width > 768) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }

    useEffect(() => {
        checkScreen();
        if (typeof window !== 'undefined') {
            window.onresize = checkScreen;
        }
    }, []);

    return (
        <>
            <header className={`font-[family-name:var(--font-geist-sans)] border-b-[1px] z-50 ${pathname==="/"?"flex justify-between w-screen bg-transparent":"fixed top-0 left-0 right-0 bg-[var(--body-bg)]"}`}>
                <div className="my-2 mx-2 w-full max-md:my-[13px] max-md:mx-4">
                    <nav className="flex justify-between items-center w-full md:px-5">
                        <div className="flex items-center gap-2">
                            <svg width="32" height="32" viewBox="0 0 106 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.41666 4.66666H22.0833L33.92 67.1533C34.3239 69.3018 35.4301 71.2318 37.045 72.6054C38.6599 73.979 40.6806 74.7086 42.7533 74.6667H85.6833C87.7561 74.7086 89.7768 73.979 91.3917 72.6054C93.0066 71.2318 94.1128 69.3018 94.5167 67.1533L101.583 28H26.5M44.1667 98C44.1667 100.577 42.1893 102.667 39.75 102.667C37.3107 102.667 35.3333 100.577 35.3333 98C35.3333 95.4227 37.3107 93.3333 39.75 93.3333C42.1893 93.3333 44.1667 95.4227 44.1667 98ZM92.75 98C92.75 100.577 90.7726 102.667 88.3333 102.667C85.8941 102.667 83.9167 100.577 83.9167 98C83.9167 95.4227 85.8941 93.3333 88.3333 93.3333C90.7726 93.3333 92.75 95.4227 92.75 98Z" stroke="#009951" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M52 54C62.5468 64.6579 68.4538 64.6755 79 54" stroke="#43A02C" strokeWidth="3" />
                                <circle cx="58" cy="44" r="5" transform="rotate(180 58 44)" fill="#43A02C" />
                                <circle cx="74" cy="44" r="5" transform="rotate(180 74 44)" fill="#43A02C" />
                            </svg>

                            <Link href="/" className="flex gap-2 text-[var(--primary-01)] font-semibold">
                                Villebiz
                            </Link>
                        </div>

                        {isMobile ? (
                            <Drawer open={open} onOpenChange={setOpen}>
                                <DrawerTrigger asChild>
                                    <Menu onClick={() => setOpen(true)} className="w-[23px] h-[23px] text-[var(--primary-01)]" />
                                </DrawerTrigger>
                                <DrawerContent>
                                    <div className="mx-auto w-full max-w-sm">
                                        <DrawerHeader className="none">
                                            <DrawerTitle hidden className="text-[var(--primary-01)]">Villebiz</DrawerTitle>
                                            <DrawerDescription hidden className="text-gray-600">Menu</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="flex flex-col gap-y-4 p-4 pb-0">
                                            {mobileLinks.map((link, index) => (
                                                <Link key={index} href={link.href}>
                                                    <Button onClick={handleClose} variant={link.variant} asChild>
                                                        <span className="flex items-center w-full">
                                                            <span className="flex gap-2 items-center">
                                                                {link.icon}
                                                                <span>{link.label}</span>
                                                            </span>
                                                            <ChevronRight className="ml-auto w-[30px] h-[30px] text-[var(--primary-01)]" />
                                                        </span>
                                                    </Button>
                                                </Link>
                                            ))}
                                            <a target="_blank" rel="noreferrer noopener" href="mailto:imranmat254@gmail.com?subject=Mail from Villebiz-ke">
                                                <Button onClick={handleClose} variant="link" asChild>
                                                    <span className="flex items-center w-full">
                                                        <span className="flex gap-2 items-center">
                                                            <Mail className="text-[var(--primary-01)] w-[20px] h-[20px]" />
                                                            <span>Contact us</span>
                                                        </span>
                                                        <ChevronRight className="ml-auto w-[30px] h-[30px] text-[var(--primary-01)]" />
                                                    </span>
                                                </Button>
                                            </a>
                                        </div>
                                        <DrawerFooter>
                                            {!userDetails && (
                                                <Link href="/sign-up" className="w-full">
                                                    <Button onClick={handleClose} variant="outline" className="border-[1px] w-full border-dashed border-[var(--primary-01)] text-[var(--primary-01)]">
                                                        Get Started
                                                    </Button>
                                                </Link>
                                            )}
                                            <DrawerClose asChild>
                                                <Button variant="secondary" onClick={handleClose} className="text-gray-600 hover:text-[var(--primary-01)]">Close Menu</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        ) : (
                            <div id="desktop_nav" className="flex gap-2">
                                {links.map(link => (
                                    <Button key={link.href} variant={link.variant} className={link.className} asChild>
                                        <Link href={link.href}>
                                            {link.label}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
}