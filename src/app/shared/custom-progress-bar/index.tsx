import CustomSlider from "@/components/custom-slider/custom-slider";
// import { FaRegDotCircle } from "react-icons/fa";
// import { PiCircleNotch, PiDisc, PiDot, PiDotDuotone } from "react-icons/pi";


export default function CustomProgressBar() {

    return (
        <>
        {/* <PiDotDuotone className="w-8 h-8" /> */}

        {/* <PiCircleNotch /> */}
        {/* <FaRegDotCircle /> */}
        <div className="p-5 lg:p-7 rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl border border-gray-300">
            <CustomSlider total={100} value={75} />
        </div>
        </>
    )
}