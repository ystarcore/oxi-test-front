import { useEffect, useRef, useState } from "react"
import ChainIcon from "./ChainIcon"
import { CHAIN_ID_NAME_MAP } from "src/constants/AppConstants"
import { useOXI } from "src/contexts/OXIContext"
import { CHAIN_ITEMS } from "../SupportChainsConstants"

export default function ChainSelect() {
    const chainSelectCompRef = useRef(null)
    const [isChainSelectOpen, setIsChainSelectOpen] = useState(false)
    const { selectedChainId, setSelectedChainId } = useOXI()

    const onSelectChain = (chainId: number) => {
        if (selectedChainId === chainId) return
        setSelectedChainId(chainId)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (chainSelectCompRef.current && !chainSelectCompRef.current.contains(event.target)) {
                setIsChainSelectOpen(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [chainSelectCompRef])

    return (
        <div className="relative flex cursor-pointer items-center rounded-md border border-2 border-[#1D1F25] py-2 px-3"
            onClick={() => setIsChainSelectOpen((val: boolean) => !val)}
            ref={chainSelectCompRef}>
            <div className="flex gap-2 items-center">
                <ChainIcon chainId={selectedChainId} />
                <div className="hidden sm:block text-white text-[14px] sm:text-[16px] mr-4">{CHAIN_ID_NAME_MAP[selectedChainId]}</div>
            </div>
            {!isChainSelectOpen ?
                <svg width="16" height="8" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 1.5L13 12.5L24 1.5" stroke="#EFEFEF" strokeWidth="3" />
                </svg> :
                <svg width="16" height="8" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 13.5L13 2.5L2 13.5" stroke="#EFEFEF" strokeWidth="3" />
                </svg>}
            <div className="shadow-sm shadow-[#505050] absolute top-[50px] left-0 w-[228px] bg-app-box border border-[#AAAAAA] py-3" style={{ display: isChainSelectOpen ? 'block' : 'none', zIndex: 9999 }}>
                {Object.keys(CHAIN_ITEMS).map((key, index) => {
                    const isActive = CHAIN_ITEMS[key] === selectedChainId
                    return (
                        <div key={key} className={`w-full px-4 mt-4 first:mt-1 hover:bg-[#2B88FA] ${isActive ? 'bg-[#2B88FA]' : 'cursor-pointer text-white'} text-[20px]`}
                            onClick={() => onSelectChain(CHAIN_ITEMS[key])}>
                            <div className="flex gap-2 items-center">
                                <div className="bg-white w-[28px] h-[28px] flex justify-center items-center" style={{ borderRadius: '50%' }}>
                                    <ChainIcon chainId={CHAIN_ITEMS[key]} />
                                </div>
                                <span className="">{CHAIN_ID_NAME_MAP[CHAIN_ITEMS[key]]}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}