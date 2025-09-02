"use client";
import { ThreeDMarquee } from "./ui/3d-marquee";
 
export function ThreeDMarqueeDemo() {
  const images = [
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371411/Gemini_Generated_Image_imi2isimi2isimi2_qvhrzt.png",

    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371412/Gemini_Generated_Image_u5horbu5horbu5ho_ge7xnb.png",
    
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371411/Gemini_Generated_Image_ykc8r4ykc8r4ykc8_vwpcpo.png",

    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371409/Gemini_Generated_Image_pu4pfmpu4pfmpu4p_nleyus.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371410/Gemini_Generated_Image_m2y1gsm2y1gsm2y1_w6v3md.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371408/Gemini_Generated_Image_4niqdu4niqdu4niq_ukk54c.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371408/Gemini_Generated_Image_m0mdsjm0mdsjm0md_iqmpsi.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371408/Gemini_Generated_Image_f846xif846xif846_r7qozb.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371407/Gemini_Generated_Image_ep02ucep02ucep02_xpkmor.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371406/Gemini_Generated_Image_b0f439b0f439b0f4_meyxjq.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371406/Gemini_Generated_Image_migw2nmigw2nmigw_hnkvv3.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371406/Gemini_Generated_Image_xcts4bxcts4bxcts_llc9cy.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371405/Gemini_Generated_Image_2t0nr42t0nr42t0n_cbtyr8.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371405/Gemini_Generated_Image_tc07b7tc07b7tc07_kmvecl.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371404/Gemini_Generated_Image_s375tis375tis375_rso7nx.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371404/Gemini_Generated_Image_npzgmwnpzgmwnpzg_ckxxnl.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371404/Gemini_Generated_Image_rsj28zrsj28zrsj2_fbw3nt.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371404/Gemini_Generated_Image_2ag4tj2ag4tj2ag4_zeog2x.png",
    
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371406/Gemini_Generated_Image_b0f439b0f439b0f4_meyxjq.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371406/Gemini_Generated_Image_migw2nmigw2nmigw_hnkvv3.png",
     "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371408/Gemini_Generated_Image_4niqdu4niqdu4niq_ukk54c.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371404/Gemini_Generated_Image_npzgmwnpzgmwnpzg_ckxxnl.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371404/Gemini_Generated_Image_rsj28zrsj28zrsj2_fbw3nt.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371404/Gemini_Generated_Image_2ag4tj2ag4tj2ag4_zeog2x.png",
   "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371411/Gemini_Generated_Image_imi2isimi2isimi2_qvhrzt.png",

    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371412/Gemini_Generated_Image_u5horbu5horbu5ho_ge7xnb.png",
    
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371411/Gemini_Generated_Image_ykc8r4ykc8r4ykc8_vwpcpo.png",

    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371409/Gemini_Generated_Image_pu4pfmpu4pfmpu4p_nleyus.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371410/Gemini_Generated_Image_m2y1gsm2y1gsm2y1_w6v3md.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371408/Gemini_Generated_Image_4niqdu4niqdu4niq_ukk54c.png",
    "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756371408/Gemini_Generated_Image_m0mdsjm0mdsjm0md_iqmpsi.png",
  ];
  return (
    <div className="mx-auto my-10 rounded-3xl ">
      <ThreeDMarquee images={images} />
    </div>
  );
}