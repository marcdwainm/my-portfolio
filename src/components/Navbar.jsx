// REACT
import { useState } from 'react';

// GSAP
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

// CONSTANTS
import { NavConstants } from '../constants/NavConstants';

// HEROICONS
import { Bars3Icon, XMarkIcon, CodeBracketIcon } from '@heroicons/react/24/outline';


export default function Navbar() {

    const [isLinksOpen, setIsLinksOpen] = useState(false)

    const toggleNavLinks = () => {

        if(isLinksOpen){
            
            setIsLinksOpen(false)
        } else {

            setIsLinksOpen(true)
        }
    }

    // GSAP
    useGSAP(() => {
        const logoSplit = new SplitText("#nav-logo", { type: "chars, words" })

        gsap.from(logoSplit.chars, {
            yPercent: 100,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.03,
            opacity: 0
        })
    })

    return <nav className="px-10 md:px-30 lg:px-50 py-7 flex justify-between md:items-center">
        <h1 id="nav-logo" className="font-heading font-bold text-2xl">DWAIN.DEV</h1>
        <div className="hiddenlg:flex gap-20">
            {NavConstants.NAV_LINKS.map((link) => {
                return <div>{link}</div>
            })}
        </div>
        <div className='hidden lg:flex-center gap-3'>
            <button className='border px-5 h-9 cursor-pointer'>Resume</button>
            <button className='border px-2 h-9 cursor-pointer'><CodeBracketIcon className='w-5 h-5'/></button>
        </div>
        

        {/* NAV LINKS FULLSCREEN MOBILE */}
        <button className="block md:hidden cursor-pointer" onClick={toggleNavLinks}>
            <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
        {isLinksOpen && <div className='fixed inset-0 z-40 w-full h-screen flex-center bg-amber-50'>
            <XMarkIcon className="absolute w-7 h-7 cursor-pointer top-8 right-9" onClick={toggleNavLinks}/>
            <div className='flex-center flex-col gap-10'>
                {NavConstants.NAV_LINKS.map((link) => {
                    return <div>
                        <h2 className='text-2xl cursor-pointer'>{link}</h2>
                    </div>
                })}
            </div>
        </div>}
    </nav>
}