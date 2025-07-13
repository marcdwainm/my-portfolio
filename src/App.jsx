// REACT
import { useState } from "react";

// SECTIONS
import Intro from "./sections/Intro";
import Landing from "./sections/Landing";
import IntroTransition from "./transitions/IntroTransition";
import Cursor from "./components/Cursor";

export default function App() {

    const [transition, setTransition] = useState()
    const [currentPage, setCurrentPage] = useState("intro");

    
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    
    const pageMapping = {
        intro: () => <Intro handlePageChange={(page) => handlePageChange(page)} />,
        landing: () => <Landing />
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#cfcec9] text-black">
            {pageMapping[currentPage]?.()}

            {transition}

            <Cursor />
        </div>
    );
}
