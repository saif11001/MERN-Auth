const FloatingShape = ({ color, size, top, left }) => {
    return (
        <div
            className={`absolute rounded-full ${color} ${size} opacity-20 blur-2xl`}
            style={{ top, left }}
            aria-hidden="true"
        />
    )
}

export default FloatingShape;