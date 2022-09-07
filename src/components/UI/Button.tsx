import { ReactNode } from "react"



type ButtonProps = {
    children: ReactNode
    onClick?: () => void
    className?: string
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled?: boolean | undefined
    style?: any
}


const Button = ({
    children,
    onClick,
    className,
    type,
    disabled,
    style
}: ButtonProps) => {
    return (
        <button
            style={style}
            disabled={disabled}
            className={className}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button