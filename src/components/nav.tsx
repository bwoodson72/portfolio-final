
export function Nav(){


    return (
        <div className="flex justify-center w-screen fixed top-0 z-50 ">
        <nav className=" bg-blue-900 backdrop:opacity-30 backdrop-blur-md w-fit p-6 rounded-3xl shadow-2xl">
            <ul className="flex justify-center gap-3 text-xl text-gray-300">
                <li className="hover:text-white text-gray-300"><a href="#">Home</a></li>
                <li className="hover:text-white text-gray-300"><a href="#about">About</a></li>
                <li className="hover:text-white text-gray-300"><a href="#projects">Projects</a></li>
                <li className="hover:text-white text-gray-300"><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        </div>
    )
}