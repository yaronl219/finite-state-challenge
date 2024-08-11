export const makeDebounce = () => {
    let timout: NodeJS.Timeout
    return (fn: () => void, ms: number) => {
        clearTimeout(timout)
        timout = setTimeout(fn, ms)
    }
}