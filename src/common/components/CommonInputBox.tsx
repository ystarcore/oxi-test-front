import InputBoxContainer from './InputBoxContainer'

interface InputBoxProps {
    placeholder: string
    readOnly: boolean
    value: string
    onChange: (val: any) => void
    handleFocus: () => void
    handleBlur: () => void
}

export default function CommonInputBox({ placeholder, readOnly, value, onChange, handleFocus, handleBlur }: InputBoxProps) {

    return (
        <InputBoxContainer>
            <input
                type="text"
                className="bg-app-content text-white text-[16px] rounded-sm block w-full p-0 focus:outline-none"
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                onChange={(event) => onChange(event.target.value)}
                readOnly={readOnly}
                value={value}
            />
        </InputBoxContainer>
    )
}