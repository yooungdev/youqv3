import { ReactNode } from "react"



type ButtonProps = {
    children: ReactNode
    onClick?: () => void
    className?: string
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled?: boolean | undefined
}


const Button = ({
    children,
    onClick,
    className,
    type,
    disabled
}: ButtonProps) => {
    return (
        <button
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