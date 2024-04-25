import { useMemo, useState } from 'react'
import TokenQtyInputBox from 'src/common/components/TokenQtyInputBox'

interface InputProps {
    id: string
    title: string
    readOnly: boolean
    onChange: (val: any) => void
    setFocus: (val: boolean) => void
}

export default function TokenQtyInput({ id, title, readOnly, onChange, setFocus }: InputProps) {
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
        <div className={`w-full flex flex-col rounded-md flex-1 bg-app-content py-3 gap-[2px] px-4 xl:px-5 ${isBorder ? 'border border-app-primary' : ''}`}>
            <div className='text-[12px] text-app-gray'>{title}</div>
            <TokenQtyInputBox
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                decimals={undefined}
                onChange={onChange}
                id={id}
                readOnly={readOnly}
            />
        </div>
    )
}