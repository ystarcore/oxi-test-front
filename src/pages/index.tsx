import React, { useState } from 'react'
import Cookies from 'js-cookie'
import CountDown from './components/CountDown'
import { Button } from 'src/common/components/Buttons'
import { useAuth0 } from "@auth0/auth0-react"

export const OXI = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0()

    const logoutWithRedirect = () =>
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            }
        })

    const handleLogin = () => {
        // This is purely illustrative.
        // Imagine this being a real OAuth token received from a secure backend after redirecting from Twitter.
        const mockOAuthToken = 'mock-oauth-token-received-from-twitter'
        Cookies.set('twitter_oauth', mockOAuthToken, { expires: 1 })
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        Cookies.remove('twitter_oauth')
        setIsLoggedIn(false)
    }

    return (
        <div className=''>
            <CountDown />
            <div className="w-full flex items-center justify-between mt-10 sm:mt-20">
                {!isAuthenticated ? (
                    <Button
                        type="primary"
                        style={{ minWidth: '140px' }}
                        onClick={() => loginWithRedirect()}
                    >
                        <span className="text-[16px] md:text-[18px]">Connect X</span>
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        style={{ minWidth: '140px' }}
                        onClick={() => logout()}
                    >
                        <span className="text-[16px] md:text-[18px]">Logout</span>
                    </Button>
                )}
                {/* {token && <p>Token: {token}</p>} */}
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