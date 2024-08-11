import React, { useContext } from "react"

interface UiContext {
    isToastDisplayed: boolean
    setIsToastDisplayed: (isDisplayed: boolean) => void
}

export const UiContext = React.createContext<UiContext>({
    isToastDisplayed: false,
    setIsToastDisplayed: () => undefined
})

export const useUiContext = () => useContext(UiContext);
