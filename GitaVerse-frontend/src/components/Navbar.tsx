const Navbar = ()=>{
    return (
       <>
  <div className="flex justify-between items-center p-4 z-50 w-full absolute text-white ">
    {/* Left Logo */}
    <div className="flex items-center gap-2">
      <img
        src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756266244/whtitegitaverselogo_kad7xz.png"
        className="w-12 mb-2"
        alt="GitaVerse Logo"
      />
      <span className="font-bold text-lg ">GitaVerse</span>
    </div>

    {/* Right Nav */}
    <ul className="flex gap-10 items-center p-2">
      <li>
        <a
          href="/"
          className="hover:text-gray-300 cursor-pointer"
        >
          Home
        </a>
      </li>
      <li>
        <a href="/browse" className="hover:text-gray-300 cursor-pointer">Browse Gita</a>
      </li>
      <li>
        <a href="#" className="hover:text-gray-300 cursor-pointer ">AI Chatbot</a>
      </li>
      <li>
        <a href="#" className="hover:text-gray-300 cursor-pointer ">Random Shloka</a>
      </li>
      <li>
        <a href="#" className="hover:text-gray-300 cursor-pointer ">Contact</a>
      </li>
      <li>
        <a href="#" className="inline-block border rounded-[20%] px-3 py-2 hover:bg-white hover:text-black cursor-pointer duration-300 ">Signup</a>
      </li>
    </ul>
  </div>
</>
    )
};

export default Navbar;