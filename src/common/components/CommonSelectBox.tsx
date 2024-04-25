export default function CommonSelectBox({ value, source, onChange }:
    { value: any, source: any, onChange: (val: any) => void }) {

    return (
        <select className='bg-app-content text-white text-[16px] block w-full p-0 focus:outline-none'>
            {
                source.map((item: any, index: number) => {
                    return <option key={index} value={item.value} selected={item.value === value ? true : false}>{item.label}</option>
                })
            }
        </select>
    )
}