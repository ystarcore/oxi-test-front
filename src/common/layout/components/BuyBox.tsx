import { Button } from "src/common/components/Buttons"
import { BuyOXI_URLs } from "src/constants/AppConstants"
import { useOXI } from "src/contexts"

export default function BuyBox() {
    const { selectedChainId } = useOXI()

    return (
        <Button
            type="primary"
            href={BuyOXI_URLs[selectedChainId]}
            style={{ minWidth: '140px', textAlign: 'center' }}
        >
            <span className="text-[16px] md:text-[18px]">Buy $OXI</span>
        </Button>
    )
}