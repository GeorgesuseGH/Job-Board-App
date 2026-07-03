import { useState } from 'react'
import { Link } from 'react-router-dom'

const signOptions = ["Sign up", "Log In"]

export function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="relative">
            
            <div className="md:shadow-xl md:shadow-blue-300 flex flex-row items-center justify-between w-[88%] mx-auto my-2 px-4 py-2 rounded-xl md:bg-gradient-to-tl from-primary via-secondary to-primary">

                <img src="/JobBoard_Logo.png" className="rounded-xl max-w-20 max-h-16" />

                <button
                    className="md:hidden bg-white flex items-center justify-center h-10 w-10 rounded hover:bg-blue-500 transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                <div className="hidden md:flex flex-row items-center gap-2 l">
                    <Link to="/" className="bg-white flex items-center justify-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">Home Page</Link>
                    <Link to="/jobs" className="bg-white flex items-center justify-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">Job seeker</Link>
                    <Link to="/employers" className="bg-white flex items-center justify-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">Employers</Link>
                    <Link to="/aboutus" className="bg-white flex items-center justify-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">About us</Link>
                    <Link to="/faqs" className="bg-white flex items-center justify-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">FAQs</Link>

               
                    <div className="relative">
                        <button
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                            className="bg-white flex items-center justify-center h-12 px-3 rounded hover:bg-blue-500 transition-colors"
                        >
                            Account
                        </button>
                        {dropdownOpen && (
                            <div
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                                className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-32 flex flex-col z-10"
                            >
                                {signOptions.map(option => (
                                    <Link
                                        key={option}
                                        to={option.toLowerCase().replace(" ", "-")}
                                        onClick={() => setDropdownOpen(false)}
                                        className="px-4 py-2 hover:bg-gray-100 text-sm rounded-xl"
                                    >
                                        {option}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

      
            {menuOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    {/* Sidebar */}
                    <div className="w-64 h-full bg-white shadow-2xl flex flex-col gap-2 p-4">
                        <button
                            className="self-end mb-4 text-gray-500 hover:text-black"
                            onClick={() => setMenuOpen(false)}
                        >
                            ✕
                        </button>
                        <Link to="/" onClick={() => setMenuOpen(false)} className="bg-white flex items-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">Home Page</Link>
                        <Link to="/jobs" onClick={() => setMenuOpen(false)} className="bg-white flex items-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">Job seeker</Link>
                        <Link to="/employers" onClick={() => setMenuOpen(false)} className="bg-white flex items-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">Employers</Link>
                        <Link to="/aboutus" onClick={() => setMenuOpen(false)} className="bg-white flex items-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">About us</Link>
                        <Link to="/faqs" onClick={() => setMenuOpen(false)} className="bg-white flex items-center h-12 px-3 rounded hover:bg-blue-500 transition-colors">FAQs</Link>
                        <hr />
                        {signOptions.map(option => (
                            <Link
                                key={option}
                                to={option.toLowerCase().replace(" ", "-")}
                                onClick={() => setMenuOpen(false)}
                                className="bg-white flex items-center h-12 px-3 rounded hover:bg-blue-500 transition-colors"
                            >
                                {option}
                            </Link>
                        ))}
                    </div>

                   
                    <div className="flex-1 bg-black/40" onClick={() => setMenuOpen(false)} />
                </div>
            )}
        </div>
    )
}