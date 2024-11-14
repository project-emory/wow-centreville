import Image from "next/image";
import About from "@/src/app/about/page";
import { main1, main2 } from "@/public";

export default function Home() {
    return (
        <div className="min-h-screen justify-items-center py-[4.75rem]">
            <main className="mb-20 flex w-[60vw] flex-col items-center gap-8 overflow-x-hidden pt-8 sm:items-start">
                <div className="flex w-full items-center justify-between">
                    <div className="text-[5em] font-bold leading-[7.5rem] text-wow-red">
                        <div className="text-[7rem]">WOW</div>
                        <div>엄마밥상</div>
                    </div>
                    <div>
                        <Image
                            src={main1}
                            alt="엄마밥상 placeholder image"
                            className="h-[35vh] w-[35vw] rounded-md object-cover shadow-md"
                        />
                    </div>
                </div>
                <div className="mt-4 flex w-full items-center justify-between">
                    <div>
                        <Image
                            src={main2}
                            alt="엄마밥상 placeholder image"
                            className="h-[35vh] w-[30vw] rounded-md object-cover shadow-md"
                        />
                    </div>
                    <div className="text-right text-[5em] font-bold leading-[7.5rem] text-wow-red">
                        <div className="text-[7rem]">WOW</div>
                        <div>Fresh Meat</div>
                    </div>
                </div>
                <div className="absolute bottom-[1rem] left-0 flex w-full animate-bounce flex-col items-center text-[3rem] font-bold text-wow-red">
                    <div>&#8964;</div>
                </div>
            </main>
            <About />
        </div>
    );
}
