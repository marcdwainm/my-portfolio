// GSAP
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Cursor() {

    useGSAP(() => {

        gsap.set(".cursor", {xPercent: -50, yPercent: -50})

        let xTo = gsap.quickTo(".cursor", "x", {duration: 1, ease: "power4"}),
            yTo = gsap.quickTo(".cursor", "y", {duration: 1, ease: "power4"})

        window.addEventListener("mousemove", (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        })
    })
    
    return <div className="cursor w-[100px] h-[100px] fixed top-0 left-0 pointer-events-none z-[1000] rounded-full bg-red-900 mix-blend-difference" />
}