import CustomSlider from '@/components/custom-slider/custom-slider';
// import { FaRegDotCircle } from "react-icons/fa";
// import { PiCircleNotch, PiDisc, PiDot, PiDotDuotone } from "react-icons/pi";

export default function CustomProgressBar() {
  return (
    <>
      {/* <PiDotDuotone className="w-8 h-8" /> */}

      {/* <PiCircleNotch /> */}
      {/* <FaRegDotCircle /> */}
      <div className="rounded-lg border border-gray-300 p-5 sm:rounded-sm lg:rounded-xl lg:p-7 xl:rounded-2xl">
        <CustomSlider total={100} value={75} />
      </div>
    </>
  );
}
