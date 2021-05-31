import { FC } from "react";

type BitcoinWithTextIconProps = {
    className?: string
}

export const BitcoinWithTextIcon: FC<BitcoinWithTextIconProps> = ({ ...rest }) => <img src="img/bitcoin-logo-with-text.svg" alt="bitcoin logo with text" {...rest}/>