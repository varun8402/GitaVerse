import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
    <div className ="w-40 h-40">
    <DotLottieReact
      src="../assets/animations/Bookanimation.lottie"
      loop
      autoplay
    />
    </div>
  </div>
);

export default LoadingSpinner;