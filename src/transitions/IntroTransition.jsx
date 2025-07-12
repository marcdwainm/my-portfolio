import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function BasicTransition() {

    useGSAP(() => {

        const transitionTimeline = gsap.timeline()
        transitionTimeline.from("#transitioner", {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            ease: "power3.inOut",
            duration: 1.4,
        }).from("#transitioner-2", {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            ease: "power3.inOut",
            duration: 1.5,
        }, "<").to("#transitioner", {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            ease: "power3.inOut",
            duration: 1.6
        }).to("#transitioner-2", {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            ease: "power3.inOut",
            duration: 1.5
        }, "<")
    })

    return <div className="page-wrapper absolute top-0 left-0 z-[1000]">
        <div id="transitioner" style={{ clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)" }} className="absolute top-0 left-0 bg-blue h-dvh w-full flex-center"></div>
        <div id="transitioner-2" style={{ clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)" }} className="absolute top-0 left-0 bg-[#222123] h-dvh w-full flex-center">
            <h1 className="font-logo text-white text-[25vw] font-bold tracking-tighter">WELCOME</h1>
        </div>
    </div>
}