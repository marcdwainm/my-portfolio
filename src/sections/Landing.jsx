import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin"

gsap.registerPlugin(ScrambleTextPlugin) 

export default function Landing ({ isLoadingDone }){

    useGSAP(() => {

        gsap.set(".full-name", { yPercent: 200 });
        gsap.set(".profession", { yPercent: 200 });

        if(isLoadingDone){

            const animateTextBy = { type: "chars" }
            const nameSplit = new SplitText(".full-name", animateTextBy)
            const profession = new SplitText(".profession", animateTextBy)
    
            const textAnimation = {
                yPercent: -200,
                stagger: 0.05,
                duration: 1,
                ease: "power1.inOut",
            }
            
            const fullNameAnimation = gsap.to(nameSplit.chars, textAnimation)
            const professionAnimation = gsap.to(profession.chars, textAnimation)
            const imageAnimation = gsap.to("#image-wrapper", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power1.inOut",
                duration: 2
            })

            professionAnimation.eventCallback("onComplete", () => {

                gsap.set("#profession", { display: "none" });
                gsap.set("#profession-clone", { display: "block" });

                const typingTl = gsap.timeline({ delay: 2, repeat: -1, repeatDelay: 1 });

                const titles = ["CREATOR", "VISIONARY", "DEVELOPER"];
                titles.forEach((title) => {
                    typingTl.to("#profession-clone", {
                        duration: 1.5,
                        scrambleText: title,
                        delay: 1,
                    });
                });
            })
        }
    }, [isLoadingDone])

    return <div className="absolute top-0 bg-transparent w-full min-h-dvh flex flex-col justify-center xl:px-45 lg:px-30 md:px-10 px-6 select-none">
        <div className="flex flex-col">
            <div>
                <div id="hello-world"></div>
                <div>
                    <div className="overflow-hidden leading-[0.85] flex lg:flex-row flex-col justify-between items-center gap-3">
                        <div id="image-wrapper" style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} className="w-full md:h-[20vh] h-[10vh] overflow-hidden">
                            <img src="/chris.jpg" className="w-full h-full object-cover scale-200" />
                        </div>
                        <div className="overflow-hidden leading-[0.85] w-full lg:text-[7vw] md:text-[8vw] text-[10vw]">
                            <div className="overflow-hidden">
                                <h5 className="full-name md:text-[20px] text-[14px] tracking-[-0.05em] w-full text-right font-outfit font-light whitespace-nowrap">
                                    The name's
                                </h5>
                            </div>
                            <h1 className="full-name tracking-[-0.05em] w-full text-right font-outfit font-bold">
                                DWAIN
                            </h1>
                            <h1 className="full-name tracking-[-0.05em] w-full text-right font-outfit font-bold">
                                MAGRACIA
                            </h1>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="overflow-hidden">
                        <h5 className="profession md:text-[20px] text-[14px] tracking-[-0.05em] w-full font-outfit font-light whitespace-nowrap">
                            I am a
                        </h5>
                    </div>
                    <div className="overflow-hidden leading-[0.85]">
                        <h1 id="profession" className="profession lg:text-[7vw] md:text-[8vw] text-[10vw] tracking-[-0.05em] w-full font-formal font-extralight">
                            DEVELOPER
                        </h1>
                        <h1 id="profession-clone" className="hidden lg:text-[7vw] md:text-[8vw] text-[10vw] tracking-[-0.05em] w-full font-formal font-extralight">
                            DEVELOPER
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
}