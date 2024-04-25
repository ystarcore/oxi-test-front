import CountDownLeft from "./CountDownLeft"
import CountDownRight from "./CountDownRight"

export default function CountDownBox() {

    return (
        <div className="flex items-center justify-center gap-4">
            <CountDownLeft />
            <CountDownRight />
        </div>
    )
}