import CountDownBox from "./countdown/CountDownBox"
import CountDownTitle from "./countdown/CountDownTitle"

export default function CountDown() {

    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-14 border border-[#272318]" style={{ borderRadius: '99999px' }}>
            <div className="flex flex-col gap-4 items-center justify-center p-6 sm:p-16 border border-[#645326]" style={{ borderRadius: '99999px' }}>
                <CountDownTitle />
                <CountDownBox />
                <div className="text-[#AAA] text-[12px] sm:text-[16px] uppercase" style={{ letterSpacing: '0.1em' }}>Using Hashtag</div>
            </div>
        </div>
    )
}