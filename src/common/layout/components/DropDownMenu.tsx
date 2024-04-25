import { Link, useLocation } from "react-router-dom"

interface InputProps {
    isOpen: boolean
    subItems: any[]
}

export default function DropDownMenu({ isOpen, subItems }: InputProps) {
    const location = useLocation()

    const routeMatch = (path: string) => {
        return location.pathname.includes(path)
    }

    return (
        <div className="absolute top-[35px] left-0 py-2 min-w-[120px]" style={{ display: isOpen ? 'block' : 'none', zIndex: 9999 }}>
            <div className="w-full rounded-md bg-app-content px-4 py-3" style={{ boxShadow: '1px 1px 5px #000' }}>
                {
                    subItems.map((item, index) => {
                        const isActive = routeMatch(item.link)
                        return (
                            <div key={index} className="mt-2">
                                {!isActive ?
                                    <>
                                        {item.type === "link" ?
                                            <a href={item.link} target="_blank" rel="noreferrer">
                                                <div className='text-[16px] text-white font-medium whitespace-nowrap'>{item.label}</div>
                                            </a>
                                            :
                                            <Link to={item.link}>
                                                <div className='text-[16px] text-white font-medium whitespace-nowrap'>{item.label}</div>
                                            </Link>
                                        }
                                    </>
                                    :
                                    <>
                                        <div className='text-[16px] text-app-primary font-medium whitespace-nowrap'>{item.label}</div>
                                        {/* <div className={`bg-app-primary h-0.5 w-full 'block'`}></div> */}
                                    </>
                                }
                            </div>
                        )
                    })}
            </div>
        </div >
    )
}