import React, { useContext, useState } from 'react'
import { CHAIN_ITEMS } from 'src/common/layout/SupportChainsConstants'

declare type Maybe<T> = T | null | undefined

export interface IOXIContext {
    selectedChainId: number
    setSelectedChainId: (v: number) => void
}

const OXIContext = React.createContext<Maybe<IOXIContext>>(null)

export const OXIProvider = ({ children = null as any }) => {
    const [selectedChainId, setSelectedChainId] = useState(CHAIN_ITEMS[Object.keys(CHAIN_ITEMS)[0]])

    return (
        <OXIContext.Provider
            value={{
                selectedChainId,
                setSelectedChainId
            }}
        >
            {children}
        </OXIContext.Provider >
    )
}

export const useOXI = () => {
    const context = useContext(OXIContext)

    if (!context) {
        throw new Error('Component rendered outside the provider tree')
    }

    return context
}
