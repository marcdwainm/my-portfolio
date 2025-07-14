import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText, ScrambleTextPlugin, Flip } from "gsap/all"

gsap.registerPlugin(SplitText) 
gsap.registerPlugin(ScrambleTextPlugin)
gsap.registerPlugin(Flip) 

export default function Loader({ setIsLoadingDone }) {

    useGSAP(() => {

        let helloSplit = new SplitText("#hello", { type: "chars" })
        let worldSplit = new SplitText("#world", { type: "chars" })
        let helloTl = gsap.timeline()
        let scrambleTl = gsap.timeline()

        let percentObj = { val: 0 };

        helloTl.from(helloSplit.chars, {
            duration: 1,
            yPercent: 200,
            stagger: { each: 0.05, from: "start" },
            ease: "power1.inOut"
        }).from(worldSplit.chars, {
            duration: 1,
            yPercent: 200,
            stagger: { each: 0.05, from: "end" },
            ease: "power1.inOut"
        }, "<").to(percentObj, {
            val: 100,
            duration: 10,
            ease: "power1.inOut",
            onUpdate: () => {

                const percent = Math.round(percentObj.val)
                const el = document.getElementById("loader-percent")
                const loader = document.getElementById("loader")

                if (el){

                    el.textContent = `${percent}%`
                }

                if (loader){

                    loader.style.clipPath = `polygon(0% 0%, ${percent}% 0%, ${percent}% 100%, 0% 100%)`
                }
            },
        }, "<").to("#footer", {
            opacity: 0,
        }, "+=2").to("#loader-wrapper", {
            opacity: 0,
            onComplete: () => setTimeout(() => {

                const text = document.getElementById("hello-world-transitioner");
                const state = Flip.getState(text);

                // Move text to the new container (or set a flag to trigger rerender)
                document.getElementById("hello-world").appendChild(text);

                // Animate the flip
                Flip.from(state, {
                    duration: 1,
                    ease: "power4.inOut"
                });

                setIsLoadingDone(true)
            }, 1000)
        })

        scrambleTl.to("#world", {
            delay: 3,
            duration: 1,
            scrambleText: "THERE!"
        }).to("#world", { 
            delay: 2,
            duration: 1,
            scrambleText: "WORLD!"
        });
    })

    return <div className="bg-transparent w-full min-h-dvh flex justify-center items-center select-none">
        <div className="flex flex-col items-center">
            <h1 id="hello-world-transitioner" className="text-[10vw] tracking-[-0.04em] leading-[0.85] w-full text-center font-outfit font-bold overflow-hidden">
                <span id="hello" className="font-formal font-light">HELLO</span>&nbsp;
                <span id="world">WORLD!</span>
            </h1>
            <div id="loader-wrapper" className="flex flex-col justify-center items-center md:gap-2 gap-1 w-[70vw]">
                <div className="w-full md:h-3 h-2 border-1">
                    <div id="loader" style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} className="w-full h-full bg-black"></div>
                </div>
                <span id="loader-percent" className="lg:text-[16px] text-[12px]">0%</span>
            </div>
        </div>
        <footer id="footer" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center lg:text-[0.8em] text-[0.7em] md:max-w-[30vw] max-w-[50vw]">
            Portfolio v1.0.0
            <br/>
            © 2025 Dwain Magracia. Made in the Philippines. 
            <br/>
            Built with GSAP v3.13.0, React v19.1.0, Tailwind v4.1.11
        </footer>
    </div>
}
