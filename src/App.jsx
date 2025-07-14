// REACT
import { useState } from "react";

// SECTIONS
import Loader from "./sections/Loader";
import Cursor from "./components/Cursor";
import Landing from "./sections/Landing";

export default function App() {

    const [isLoadingDone, setIsLoadingDone] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#cfcec9] text-black">
            <Loader setIsLoadingDone={setIsLoadingDone}/>
            <Landing isLoadingDone={isLoadingDone}/>
            <Cursor />
        </div>
    );
}
