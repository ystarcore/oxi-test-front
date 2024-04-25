import React from 'react'
import CountDown from './components/CountDown'
import { Button } from 'src/common/components/Buttons'

export const OXI = () => {

    return (
        <div className=''>
            <CountDown />
            <div className="w-full flex items-center justify-between mt-10 sm:mt-20">
                <Button
                    type="primary"
                    onClick={() => { }}
                    style={{ minWidth: '140px' }}
                >
                    <span className="text-[16px] md:text-[18px]">Connect X</span>
                </Button>
                <Button
                    type="primary"
                    onClick={() => { }}
                    style={{ minWidth: '140px' }}
                >
                    <span className="text-[16px] md:text-[18px]">Connect Tiktok</span>
                </Button>
            </div>
            <div className="w-full flex items-center justify-center mt-4 sm:mt-8">
                <Button
                    type="primary"
                    onClick={() => { }}
                    style={{ minWidth: '140px', height: '48px' }}
                >
                    <span className="text-[18px] md:text-[20px] font-semibold">Claim Reward</span>
                </Button>
            </div>
        </div>
    )
}