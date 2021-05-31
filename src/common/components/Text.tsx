import { FC } from "react";
import styled from "@emotion/styled";

type TextProps = {
    color?: string,
    size?: string,
    bold?: boolean
}

const CustomText = styled.div<{ color?: string, size?: string, bold?: boolean }>(({ color, size, bold }) => ({
    margin: "1rem 0",
    color: color ? color : undefined,
    fontSize: size ? size : "1rem",
    fontWeight: bold ? "bold" : undefined,
}));

const Text: FC<TextProps> = ({ children, ...rest }) => {
    return (
        <CustomText {...rest} >
            {children}
        </CustomText>
    )
}

export default Text;