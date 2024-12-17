import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero(){
    return(
        <div
            style={{opacity: 1, filter: "blur(0px)", backgroundImage: 'url("/images/hero1.jpg"), linear-gradient(rgba(0, 13, 107, 0.5), rgba(0, 13, 107, 0.5))'}} 
            className="flex font-[family-name:var(--font-geist-sans)] bg-cover bg-no-repeat gap-9 flex-col justify-center items-center mt-[60px] w-[95vw] rounded-[30px] h-[70vh]"
        >
            <div className="flex flex-col gap-3 text-center md:w-[480px] w-[90vw]">
                <p className="font-semibold md:text-4xl text-3xl text-[var(--primary-01)]">
                    Unlocking Human Potential With Generative AI. 
                </p>
                <p className="text-gray-600 text-sm font-[family-name:var(--font-geist-mono)]">
                    Insight.ai is an AI-powered virtual assistants that combines both Generative AI and Speech-to-Text for fast prompting.
                </p>
            </div>
            <div className="flex gap-2 max-md:flex-col">
                <Button className="bg-[var(--primary-01)] w-[130px] max-md:w-[80vw] hover:bg-[var(--primary-01)]" asChild>
                    <Link href="/sign-up">
                        Get Started
                    </Link>
                </Button>
                <Button variant="outline" className="hover:text-[var(--primary-01)] w-[130px] max-md:w-[80vw] border-[1px] border-dashed border-[var(--primary-01)]" asChild>
                    <Link href="/sign-in">
                        Sign in
                    </Link>
                </Button>
            </div>
        </div>
    )
}