import React, { useMemo, useState, useEffect, useRef } from 'react'
import CommonInputBox from './CommonInputBox'
import { isAddress } from "src/utils"

interface InputProps {
    title: string
    placeholder: string
    value: string
    readOnly: boolean
    onChange: (val: string | undefined) => void
    setFocus: (val: boolean) => void
}

export default function WalletAddressInput({ title, placeholder, value, readOnly, onChange, setFocus }: InputProps) {
    const [isBorder, setIsBorder] = useState(false)

    const handleFocus = () => {
        setIsBorder(true)
        setFocus(true)
    }

    const handleBlur = () => {
        setIsBorder(false)
        setFocus(false)
    }

    const handleChange = async (address: string) => {
        if (isAddress(address)) {
            onChange(address)
        } else {
            onChange(undefined)
        }
    }

    return (
        <div className={`w-full flex flex-col rounded-md flex-1 bg-app-content py-3 gap-[2px] px-4 xl:px-5 ${isBorder ? 'border border-app-primary' : ''}`}>
            <div className='text-[12px] text-app-gray'>{title}</div>
            <CommonInputBox
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                onChange={handleChange}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
            />
        </div >
    )
}