// REACT
import { useState } from "react";

// SECTIONS
import Intro from "./sections/Intro";
import Landing from "./sections/Landing";
import IntroTransition from "./transitions/IntroTransition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function App() {

    const [transition, setTransition] = useState()
    const [currentPage, setCurrentPage] = useState("intro");

    
    const handlePageChange = (page) => {
        
        // Run animation first
        setTransition()
        
        // In the middle of the animation, change page accordinly.
        setTimeout(() => {
            setCurrentPage(page)
        }, 1500)
    }
    
    const pageMapping = {
        intro: () => <Intro handlePageChange={(page) => handlePageChange(page)} />,
        landing: () => <Landing />
    }

    useGSAP(() => {

        gsap.set(".cursor", {xPercent: -50, yPercent: -50});

        let xTo = gsap.quickTo(".cursor", "x", {duration: 0.6, ease: "power3"}),
            yTo = gsap.quickTo(".cursor", "y", {duration: 0.6, ease: "power3"});

        window.addEventListener("mousemove", e => {
            xTo(e.clientX);
            yTo(e.clientY);
        });
    })
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#cac9c5] text-black">
            {pageMapping[currentPage]?.()}

            {transition}

            <div className="cursor w-[100px] h-[100px] fixed top-0 left-0 pointer-events-none z-[1000] rounded-full bg-red-900 mix-blend-difference" />
        </div>
    );
}
