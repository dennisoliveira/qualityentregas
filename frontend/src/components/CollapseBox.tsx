import React, { useState, ReactNode } from 'react'

type CollapseBoxProps = {
  title: string
  children: ReactNode
}

const CollapseBox: React.FC<CollapseBoxProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => setIsOpen(!isOpen)

  return (
    <div className="w-full mx-auto my-4 shadow-md">
      <button
        onClick={toggleCollapse}
        className="w-full px-4 py-2 text-left bg-gray-800 text-white font-bold flex items-center justify-between"
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-4 bg-white">{children}</div>
      </div>
    </div>
  )
}

export default CollapseBox
