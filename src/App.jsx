import { useState, useRef } from 'react';

// GSAP
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/all';

// SECTIONS
import Navbar from "./components/Navbar"
import LandingSection from "./sections/LandingSection"
import NavSection from './sections/NavSection';

export default function App() {

    return <div className="w-full min-h-screen">
        <LandingSection/>
    </div>
    
    
}