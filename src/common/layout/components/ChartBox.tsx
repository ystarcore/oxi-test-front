import { Button } from "src/common/components/Buttons"

export default function ChartBox() {

    return (
        <Button
            type="primary"
            href="https://oxi.com"
            style={{ minWidth: '140px', textAlign: 'center' }}
        >
            <span className="text-[16px] md:text-[18px]">Chart</span>
        </Button>
    )
}