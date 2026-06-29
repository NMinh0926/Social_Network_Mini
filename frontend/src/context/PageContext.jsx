import { useState, createContext, useContext } from 'react'

const PageContext = createContext()

export function PageProvider ({ children }) {
    const [topbar, setTopbar ]= useState(null)
    const [rightPanel, setRightPanel] = useState(null)

    return (
        <PageContext.Provider value={{ topbar, setTopbar, rightPanel, setRightPanel }}>
            {children}
        </PageContext.Provider>
    )
}

export function usePage() {
    return useContext(PageContext)
}