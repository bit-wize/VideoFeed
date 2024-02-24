import React from "react"
import  Navbar  from "../components/Navbar"

function UploadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F8f8f8] h-[100vh]">
      <Navbar />
      <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
        {children}
      </div>
    </div>
  )
}

export default UploadLayout