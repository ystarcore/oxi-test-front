import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { SIDEBAR_ITEMS, SIDEBAR_ROUTES, SIDEBAR_SUBITEMS } from "../LayoutConstants"
import DropDownMenu from "./DropDownMenu"

export default function NavMenu() {
    const [menuOpen, setMenuOpen] = useState<any>({ key: '', isOpen: false })
    const location = useLocation()
    const itemEls = useRef(new Array(Object.keys(SIDEBAR_ITEMS).length))

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuOpen.key) {
                if (itemEls.current[Number(menuOpen.key)] && !itemEls.current[Number(menuOpen.key)].contains(event.target)) {
                    setMenuOpen({ key: '', isOpen: false })
                }
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [itemEls, menuOpen])

    const routeMatch = (path: string) => {
        return (path && location.pathname.includes(path))
    }

    const getIsActiveMenu = (key: string) => {
        let isActive = routeMatch(SIDEBAR_ROUTES[key].link)
        if (SIDEBAR_ROUTES[key].type === "dropdown") {
            SIDEBAR_SUBITEMS[key].map((t: any) => {
                if (routeMatch(t.link)) isActive = true
            })
        }
        return isActive
    }

    const handleMenuClick = (key: string) => {
        if (menuOpen.key === key && menuOpen.isOpen) setMenuOpen({ key: '', isOpen: false })
        else setMenuOpen({ key: key, isOpen: true })
    }

    return (
        <div className='flex gap-8 lg:gap-1 xl:gap-8 mx-8'>
            {Object.keys(SIDEBAR_ITEMS).map((key) => {
                const isActive = getIsActiveMenu(key)
                return (
                    <div className="relative" key={key}>
                        {SIDEBAR_ROUTES[key].type === "dropdown" ?
                            <>
                                <div id={`dropdown_menu${key}`} className={`flex items-center cursor-pointer px-4 py-[5px] ${isActive ? 'bg-app-content' : ''} rounded-md`}
                                    ref={(element) => itemEls.current[Number(key)] = element}
                                    onClick={() => handleMenuClick(key)}>
                                    <div className="flex gap-2 items-center">
                                        <div className='text-[16px] text-white font-medium'>{SIDEBAR_ITEMS[key]}</div>
                                        {menuOpen.key === key && menuOpen.isOpen ? <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.60938 5.5L5.60938 1.5L9.60938 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg> :
                                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.60938 1.5L5.60937 5.5L1.60937 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        }
                                    </div>
                                    {/* {!(menuOpen.key === key && menuOpen.isOpen) && isActive ?
                                    <div className={`bg-app-primary h-0.5 w-full`} /> : <div className={`h-0.5 w-full`} />} */}
                                    <DropDownMenu subItems={SIDEBAR_SUBITEMS[key]} isOpen={menuOpen.key === key && menuOpen.isOpen} />
                                </div>
                            </>
                            :
                            <>
                                {!isActive ?
                                    <>
                                        {SIDEBAR_ROUTES[key].type === "link" ?
                                            <a href={SIDEBAR_ROUTES[key].link} target="_blank" rel="noreferrer">
                                                <div className="flex items-center px-4 py-[5px] rounded-md">
                                                    <div className='text-[16px] text-white font-medium'>{SIDEBAR_ITEMS[key]}</div>
                                                </div>
                                            </a>
                                            :
                                            <Link to={SIDEBAR_ROUTES[key].link}>
                                                <div className="flex items-center px-4 py-[5px] rounded-md">
                                                    <div className='text-[16px] text-white font-medium'>{SIDEBAR_ITEMS[key]}</div>
                                                </div>
                                            </Link>
                                        }
                                    </>
                                    :
                                    <div className="flex items-center px-4 py-[5px] bg-app-content rounded-md">
                                        <div className='text-[16px] text-white font-medium'>{SIDEBAR_ITEMS[key]}</div>
                                        {/* <div className={`bg-app-primary h-0.5 w-full`}></div> */}
                                    </div>
                                }
                            </>
                        }
                    </div>
                )
            })}
        </div>
    )
}