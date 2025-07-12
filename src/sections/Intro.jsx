import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function Intro({ handlePageChange }) {

    const [isClickable, setIsClickable] = useState(false);
    const [hasHovered, setHasHovered] = useState(false);
    
    const dwainRef = useRef(null);
    const enterRef = useRef(null);
    const dwainSplit = useRef(null);
    const enterSplit = useRef(null);

    useGSAP(() => {

        dwainSplit.current = SplitText.create("#dwain-dev", { type: "chars" });
        enterSplit.current = SplitText.create("#enter", { type: "chars" });

        const tl = gsap.timeline({ delay: 1 });

        tl.to("#logo-bracket-1", {
            x: 0,
            duration: 2,
            ease: "power4.inOut",
        }).to("#logo-bracket-2", {
            x: 0,
            duration: 2,
            ease: "power4.inOut",
        }, "<").from(dwainSplit.current.chars, {
            opacity: 0,
            stagger: { each: 0.02, from: "center" },
            ease: "power4.inOut",
            duration: 1.3,
            delay: 0.9,
            onComplete: () => setIsClickable(true),
        }, "<")  
    }, []);

    useEffect(() => {

        if (!isClickable) return;
        const to = {
            y: hasHovered ? 100 : 0,
            ease: "power4.inOut",
            stagger: { each: 0.02, from: "center" },
        };

        gsap.to(dwainSplit.current.chars, to);
        gsap.to(enterSplit.current.chars, to);

        gsap.to("#logo-bracket-1", {
            x: hasHovered ? "-15px": 0,
            duration: 0.5,
            ease: "power4.inOut",
        })
        
        gsap.to("#logo-bracket-2", {
            x: hasHovered ? "15px": 0,
            duration: 0.5,
            ease: "power4.inOut",
        })

        gsap.to("#difference", {
            clipPath: hasHovered ? "polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%)" : "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
            duration: 0.5,
            ease: "power4.inOut",
        })
    }, [hasHovered, isClickable]);

    return (
        <div className="page-wrapper">
            <div className="bg-transparent h-full w-full flex-center overflow-hidden">
                <svg className="w-16 h-16 rotate-180 translate-x-[2000px]" id="logo-bracket-1" fill="#222123" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z" />
                </svg>
                <div className="relative min-w-[270px] cursor-pointer" onMouseEnter={() => setHasHovered(true)} onMouseLeave={() => setHasHovered(false)} onClick={() => handlePageChange("landing")}>
                    <h1 id="dwain-dev" ref={dwainRef} className="absolute overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 color-black font-logo text-center whitespace-nowrap w-max md:text-[4.5rem] text-6xl tracking-tighter">
                        DWAIN.DEV
                    </h1>
                    <div className="absolute overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 color-black font-logo text-center whitespace-nowrap w-max md:text-[4.5rem] text-6xl tracking-tighter">
                        <h1 id="enter" ref={enterRef} className="-translate-y-[100px]">
                            KNOW MORE
                        </h1>
                    </div>
                </div>
                <svg className="w-16 h-16 -translate-x-[2000px]" id="logo-bracket-2" fill="#222123" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z" />
                </svg>
                <div id="difference" style={{ clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" }} className="absolute w-full h-dvh bg-[#f3f3f3] mix-blend-difference cursor-pointer" onMouseEnter={() => setHasHovered(true)} onMouseLeave={() => setHasHovered(false)} onClick={() => handlePageChange("landing")}>
                    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-logo md:text-[15rem] text-[18rem] text-center font-extrabold leading-none mix-blend-color-dodge">
                        KNOW MORE
                    </h1>
                </div>
                
                <p className="absolute top-10 left-10 font-secondary leading-[1] md:text-[14px] text-[12px]">
                    <ArrowLongRightIcon className="w-5 h-5"/>
                    Portfolio <br/> v-1.0.0
                </p>
            </div>
        </div>
    );
}
