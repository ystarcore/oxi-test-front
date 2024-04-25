import { useState } from 'react'
import CommonInputBox from './CommonInputBox'

interface InputProps {
    title: string
    placeholder: string
    value: string
    readOnly: boolean
    onChange: (val: any) => void
    setFocus: (val: boolean) => void
}

export default function URLInput({ title, placeholder, value, readOnly, onChange, setFocus }: InputProps) {
    const [isBorder, setIsBorder] = useState(false)

    const handleFocus = () => {
        setIsBorder(true)
        setFocus(true)
    }

    const handleBlur = () => {
        setIsBorder(false)
        setFocus(false)
    }

    return (
        <div className={`w-full flex flex-col rounded-md bg-app-content py-3 gap-[2px] px-4 xl:px-5 ${isBorder ? 'border border-app-primary' : ''}`}>
            <div className='text-[12px] text-app-gray'>{title}</div>
            <CommonInputBox
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
            />
        </div>
    )
}