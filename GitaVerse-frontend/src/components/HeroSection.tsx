const HeroSection = ()=>{
    return (
        <>
            <div className="w-full h-screen relative">
            {/* Background image */}
            <div
              className="w-full h-full bg-cover bg-center absolute"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1756263112/b67f3bfc246180e199de2cbc60af33301a560e00de56f6699bffc110bcdc02d3_1_1_hpvqaz.png')",
              }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              <img src = "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756263851/erasebg-transformed_-_Copy_fyt99x.png" className="w-max h-[100%] "></img>
            </div>
          </div>
        </>
    )
};
export default HeroSection;