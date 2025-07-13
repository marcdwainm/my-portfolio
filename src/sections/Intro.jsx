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
    const welcomeRef = useRef(null);
    const dwainSplit = useRef(null);
    const enterSplit = useRef(null);
    const welcomeSplit = useRef(null);

    useGSAP(() => {
        
        // SPLIT TEXTS
        dwainSplit.current = SplitText.create("#dwain-dev", { type: "chars" })
        enterSplit.current = SplitText.create("#enter", { type: "chars" })
        welcomeSplit.current = SplitText.create("#welcome", { type: "chars" })

        // TIMELINE
        const tl = gsap.timeline({ delay: 1 });

        // BRACKET ANIMATION
        const bracketAnimation = {
            x: 0,
            duration: 2,
            ease: "power4.inOut",
        }

        tl.to("#logo-bracket-1", bracketAnimation)
        .to("#logo-bracket-2", bracketAnimation, "<")
        .from(dwainSplit.current.chars, {
            opacity: 0,
            stagger: { each: 0.02, from: "center" },
            ease: "power4.inOut",
            duration: 1.2,
            delay: 0.9,
            onComplete: () => setTimeout(() => setIsClickable(true), 1000),
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

    const changePage = () => {

        if(isClickable){

            setIsClickable(false)
            const paragraphSplit = new SplitText(".paragraphs", { type: "lines" });
            const changePageTl = gsap.timeline()
            
            changePageTl.to("#difference", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: "power2.inOut"
            }).to({}, {
                duration: 1
            }).to(welcomeSplit.current.chars, {
                y: 100,
                ease: "power4.inOut",
                stagger: { each: 0.02, from: "center" },
            }).to(enterSplit.current.chars, {
                y: 0,
                ease: "power4.inOut",
                stagger: { each: 0.02, from: "center" },
            }, "-=1").to(".intro-content", {
                opacity: 0,
                ease: "power4.inOut",
                delay: 1
            }).to("#difference", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => handlePageChange("landing")
            }, "-=0.5")

            // PARAGRAPH ANIMATION
            gsap.to(paragraphSplit.lines, {
                opacity: 0,
                y: 40,
                filter: "blur(3px)",
                duration: 1,
                ease: "power2.out",
                delay: 1
            })

            // BRACKET ANIMATION OUTRO
            const bracketAnimation = {
                opacity: 0,
                ease: "power4.inOut"
            }

            gsap.to("#logo-bracket-1", bracketAnimation)
            gsap.to("#logo-bracket-2", bracketAnimation)
        }
    }

    return (
        <div className="page-wrapper select-none">
            <div style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }} className="intro-content bg-transparent h-full w-full flex-center overflow-hidden">
                <svg className="w-16 h-16 rotate-180 translate-x-[2000px]" id="logo-bracket-1" fill="#222123" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z" />
                </svg>
                <div className={`relative md:min-w-[380px] min-w-[300px] ${isClickable ? 'cursor-pointer' : 'cursor-default'}`} onMouseEnter={() => setHasHovered(true)} onMouseLeave={() => setHasHovered(false)} onClick={changePage}>
                    <div className="absolute overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 color-black font-outfit text-center whitespace-nowrap w-max md:text-[4.5rem] text-6xl tracking-tighter">
                        <h1 id="dwain-dev" ref={dwainRef}>
                            DWAIN.DEV
                        </h1>
                    </div>
                    <div className="absolute overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 color-black font-outfit text-center whitespace-nowrap w-max md:text-[4.5rem] text-6xl tracking-tighter">
                        <h1 id="enter" ref={enterRef} className="-translate-y-[100px]">
                            KNOW MORE
                        </h1>
                    </div>
                    <div className="absolute overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 color-black font-outfit text-center whitespace-nowrap w-max md:text-[4.5rem] text-6xl tracking-tighter">
                        <h1 id="welcome" ref={welcomeRef} className="-translate-y-[100px]">
                            WELCOME
                        </h1>
                    </div>
                </div>
                <svg className="w-16 h-16 -translate-x-[2000px]" id="logo-bracket-2" fill="#222123" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z" />
                </svg>
                
            </div>
            <p className="paragraphs overflow-hidden absolute top-10 left-10 font-secondary leading-[1] md:text-[14px] text-[12px]">
                Portfolio <br/> v1.0.0
                <ArrowLongRightIcon className="w-5 h-5"/>
            </p>
            <p className="paragraphs overflow-hidden text-right absolute top-10 right-10 font-secondary leading-[1] md:text-[14px] text-[12px]">
                Last Update: July 13, 2025 <br />
                https://github.com/marcdwainm
            </p>
            <p className="paragraphs overflow-hidden md:w-3xs w-40 absolute bottom-10 left-10 font-secondary leading-[1] md:text-[14px] text-[12px]">
                © 2025 Magracia. Made in the Philippines. Built with the GSAP v3.13.0, React v19.1.0, Tailwind v4.1.11
            </p>
            <p className="paragraphs overflow-hidden md:w-3xs w-40 text-right absolute bottom-10 right-10 font-secondary leading-[1] md:text-[14px] text-[12px]">
                © 2025 Dwain. All Rights Reserved.
            </p>
            <div id="difference" style={{ clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" }} className={`absolute w-full h-dvh bg-[#f3f3f3] mix-blend-difference ${isClickable ? 'cursor-pointer' : 'cursor-default'}`} onMouseEnter={() => setHasHovered(true)} onMouseLeave={() => setHasHovered(false)} onClick={changePage}>
                <h1 className="intro-content absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:text-[15rem] text-[18rem] text-center font-outfit leading-[200px] tracking-[-0.1em] mix-blend-color-dodge">
                    KNOW<br />MORE
                </h1>
            </div>
        </div>
    );
}
