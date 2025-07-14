import React from 'react'

export default function NavBar() {
  return (
    <div className='fixed top-0 w-full h-20 z-[9999]'>
        <div className="w-full h-full flex px-45 justify-between">
            <div className="flex items-center">
                <h5 className="font-outfit font-bold">&lt; DWAIN.DEV &gt;</h5>
            </div>
            <div className="flex items-center gap-5">
                <div className="w-7 h-7 cursor-pointer">
                    <img src="/icons/github.svg" />
                </div>
                <div className="w-7 h-7 cursor-pointer">
                    <img src="/icons/htmx.svg" />
                </div>
            </div>
        </div>  
    </div>
  )
}
