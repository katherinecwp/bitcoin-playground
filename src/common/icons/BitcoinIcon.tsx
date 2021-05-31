import { FC } from "react";

type BitCoinIconProps = {
    className?: string
}

export const BitcoinIcon: FC<BitCoinIconProps> = ({ ...rest }) => <img src="img/bitcoin-logo.svg" alt="bitcoin logo" {...rest}/>