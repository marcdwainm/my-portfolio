// REACT
import { useState } from "react";

// SECTIONS
import Intro from "./sections/Intro";
import Landing from "./sections/Landing";
import Cursor from "./components/Cursor";
import NavBar from "./components/NavBar";

export default function App() {

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

            <Cursor />

            <NavBar />
        </div>
    );
}
