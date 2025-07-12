// GSAP
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(TextPlugin);

export default function LandingSection() {
    
    const words = ["A Developer.", "A Creator.", "A Professional.", "An Enthusiast."]
    const introTimeline = gsap.timeline({ repeat: -1 })
    
    useGSAP(() => {

        const introSplit = new SplitText("#intro-highlighted", { type: "chars" })

        gsap.to('.cursor', {
            opacity: 0,
            ease: "power2.inOut",
            repeat: -1,
            duration: 0.5
        })

        words.forEach((word) => {
            let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
            tlText.add(() => {
            const el = document.getElementById('animated-text');
                if (el) {
                    // Example: change class based on word
                    let wordClass = "text-black"
                    if(word === "A Developer."){
                        wordClass = "developer"
                    }
                    if(word === "A Creator."){
                        wordClass = "creator"
                    }
                    if(word === "A Professional."){
                        wordClass = "professional"
                    }
                    if(word === "An Enthusiast."){
                        wordClass = "enthusiast"
                    }
                    el.className = `intro-text ${wordClass}`;
                }
            });

            tlText.to('#animated-text', { duration: 1, text: word });
            introTimeline.add(tlText)
        })

        gsap.from(introSplit.chars, {
            translateY: "-100",
            opacity: 0,
            stagger: 0.03
        })
    }, [])

    const handleMouseEnter = () => {
        gsap.to("#introduction", {
            clipPath: "polygon(100% 0%, 0% 0%, 0% 0%, 100% 0%)",
            ease: "power4.inOut"
        })

        gsap.to("#know-more", {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            ease: "power4.inOut"
        })
    }

    const handleMouseLeave = () => {
        gsap.to("#introduction", {
            clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease: "power4.inOut"
        })
        gsap.to("#know-more", {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            ease: "power4.inOut"
        })
    }

    return (
        <section className="w-full h-screen flex-center flex-col bg-[#f5f4f4] paper">
            <div className="flex-center flex-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div id="introduction" className='absolute flex-center flex-col font-heading overflow-hidden' style={{ clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)" }}>
                    <div id="intro-highlighted">
                        <h1 className="intro-text font-extrabold">Hey, I'm <span className='text-orange-700'>Dwain</span> — </h1>
                    </div>
                    <div className="flex font-extrabold">
                        <h1 id="animated-text" className='intro-text'></h1>
                        <h1 className='intro-text cursor'>
                            _
                        </h1>
                    </div>
                </div>
                <div id="know-more" className="absolute" style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
                    <span className="text-[9vw] tracking-tighter leading-[1.2] font-extrabold font-secondary">Know more</span>
                </div>
            </div>
        </section>
    );
}
