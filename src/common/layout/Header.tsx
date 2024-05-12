import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { SIDEBAR_ITEMS, SIDEBAR_ROUTES, SIDEBAR_SUBITEMS } from "./LayoutConstants"
import WalletBox from "./components/WalletBox"
import NavMenu from "./components/NavMenu"
import ChartBox from "./components/ChartBox"
import BuyBox from "./components/BuyBox"

export default function Header() {
  // const matchesDesktop = useMediaQuery(`(min-width: 1024px)`)    
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)
  // const [menuOpen, setMenuOpen] = useState<any>({ key: '', isOpen: false })
  const [title, setTitle] = useState("OXI")

  const routeMatch = (path: string) => {
    return location.pathname.includes(path)
  }

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    getTitleDynamically()
  }, [location])

  const getTitleDynamically = () => {
    Object.keys(SIDEBAR_ITEMS).map((key, index) => {
      let isActive = routeMatch(SIDEBAR_ROUTES[key].link)
      if (SIDEBAR_ROUTES[key].type === "dropdown") {
        SIDEBAR_SUBITEMS[key].map((t: any) => {
          if (routeMatch(t.link)) {
            if (t.title) setTitle(t.title)
          }
        })
        if (isActive) {
          if (SIDEBAR_ROUTES[key].title) setTitle(SIDEBAR_ROUTES[key].title)
        }
      }
    })
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

  const SideMenu = () => {
    const [menuOpen, setMenuOpen] = useState<any>({ key: '', isOpen: false })

    const handleMenuClick = (key: string) => {
      if (menuOpen.key === key && menuOpen.isOpen) setMenuOpen({ key: '', isOpen: false })
      else setMenuOpen({ key: key, isOpen: true })
    }

    return (
      <div className={`w-full pt-4 pb-2 px-12 ${isNavOpen ? 'block' : 'hidden'}`}>
        <div className='flex flex-col gap-2'>
          {Object.keys(SIDEBAR_ITEMS).map((key, index) => {
            const isActive = getIsActiveMenu(key)
            return (
              <div key={key}>
                {SIDEBAR_ROUTES[key].type === "dropdown" ?
                  <div>
                    <div className="flex gap-2 items-center">
                      <div className={`text-[16px] text-white text-white font-medium cursor-pointer`}
                        onClick={() => handleMenuClick(key)}>
                        {SIDEBAR_ITEMS[key]}
                      </div>
                      {menuOpen.key === key && menuOpen.isOpen ? <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.60938 5.5L5.60938 1.5L9.60938 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg> :
                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.60938 1.5L5.60937 5.5L1.60937 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      }
                    </div>
                    {
                      menuOpen.key === key && menuOpen.isOpen && SIDEBAR_SUBITEMS[key].map((item, index) => {
                        const isActive = routeMatch(item.link)
                        return (
                          <div key={index}>
                            {!isActive ?
                              <>
                                {item.type === "link" ?
                                  <a href={item.link} target="_blank" rel="noreferrer">
                                    <div className={`ml-4 mt-1 text-[15px] text-white text-white font-medium`}>-{item.label}</div>
                                  </a>
                                  :
                                  <Link to={item.link}>
                                    <div className={`ml-4 mt-1 text-[15px] ${isActive ? 'text-app-primary' : 'text-white'} text-white font-medium`}>-{item.label}</div>
                                  </Link>
                                }
                              </>
                              :
                              <div className={`ml-4 mt-1 text-[15px] ${isActive ? 'text-app-primary' : 'text-white'} text-white font-medium`}>-{item.label}</div>
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                  :
                  <>
                    {!isActive ?
                      <>
                        {SIDEBAR_ROUTES[key].type === "link" ?
                          <a href={SIDEBAR_ROUTES[key].link} target="_blank" rel="noreferrer">
                            <div className={`text-[16px] text-white text-white font-medium`}>{SIDEBAR_ITEMS[key]}</div>
                          </a>
                          :
                          <Link to={SIDEBAR_ROUTES[key].link}>
                            <div className={`text-[16px] ${isActive ? 'text-app-primary' : 'text-white'} text-white font-medium`}>{SIDEBAR_ITEMS[key]}</div>
                          </Link>
                        }
                      </>
                      :
                      <div className={`text-[16px] ${isActive ? 'text-app-primary' : 'text-white'} text-white font-medium`}>{SIDEBAR_ITEMS[key]}</div>
                    }
                  </>
                }
              </div>
            )
          })}
        </div>
        {/* <div className="mt-6 w-full">
          <WalletBox />
        </div> */}
      </div>
    )
  }

  return (
    <div className="w-full flex justify-between py-4 md:py-6 items-center max-w-[2000px]">
      <div className="w-full hidden md:flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between">
        <div>
          <NavMenu />
        </div>
        <div className="hidden md:block">
          <div className="flex gap-4 items-center">
            <ChartBox />
            <BuyBox />
            <WalletBox />
          </div>
        </div>
      </div>
      <div className="md:hidden w-full flex flex-col justify-center items-center">
        {/* <div className="flex w-full items-center justify-between"> */}
        <div className="flex flex-col w-full items-center justify-center gap-4">
          {/* <a href="https://ignitethechain.com">
            <div className='w-full'>
              <img src="/logotext.svg" alt="" />
            </div>
          </a> */}
          <WalletBox />
          <div className="w-full flex items-center justify-between">
            <ChartBox />
            <BuyBox />
          </div>
          {/* <div className='cursor-pointer' onClick={() => setIsNavOpen((v) => !v)}>
            {isNavOpen &&
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
            {!isNavOpen &&
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="#1D1F25" />
                <path d="M10.6654 20.002H21.332" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.6654 16.002L21.332 16.002" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.6654 12.002H21.332" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          </div> */}
        </div>
        <SideMenu />
      </div>
    </div>
  )
}
