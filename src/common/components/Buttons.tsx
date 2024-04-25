import { PropsWithChildren, ReactNode, useState } from 'react'

function Button(props:
    {
        type: "primary" | "secondary" | "inlineLink",
        disabled?: boolean,
        onClick?: () => void,
        href?: string,
        style?: any
        children: ReactNode
    }
) {
    switch (props.type) {
        case 'primary':
            //Check if the primary button has a link property in it
            if (props.href && !props.disabled) {
                return (
                    <a
                        className={"primary-btn "}
                        style={props.style}
                        href={props.href}
                    >
                        {props.children}
                    </a>
                );
            }
            //Returns a button tag if it's not the case
            else {
                return (
                    <button
                        className={"primary-btn "}
                        disabled={props.disabled}
                        onClick={props.onClick}
                        style={props.style}
                    >
                        {props.children}
                    </button>
                )
            }
        case 'secondary':
            //Check if the primary button has a link property in it
            if (props.href && !props.disabled) {
                return (
                    <a
                        className={"secondary-btn "}
                        style={props.style}
                        href={props.href}
                    >
                        {props.children}
                    </a>
                );
            }
            //Returns a button tag if it's not the case
            else {
                return (
                    <button
                        className={"secondary-btn "}
                        disabled={props.disabled}
                        onClick={props.onClick}
                        style={props.style}
                    >
                        {props.children}
                    </button>
                )
            }
        case 'inlineLink':
            //Check if the primary button has a link property in it
            if (props.href && !props.disabled) {
                return (
                    <a
                        className="font-bold text-cyan hover:text-darkBlue focus:text-darkBlue"
                        style={props.style}
                        href={props.href}
                    >
                        {props.children}
                    </a>
                );
            }
            //Returns a button tag if it's not the case
            else {
                throw new Error(`inlineLink button ${!props.href ? 'must have a href attribute ' : ''} ${!props.disabled ? 'cannot be disabled' : ''}`);


            }
    }

}

export { Button }