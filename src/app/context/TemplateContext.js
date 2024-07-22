import { createContext } from "react"

export const TemplateContext = createContext({
    data: {}
});


export const TemplateProvider = ({
    children,
    data
}) => {
    return (
        <TemplateContext.Provider value={data}>
            {children}
        </TemplateContext.Provider>
    )
}