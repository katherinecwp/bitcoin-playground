import { FC } from "react";
import styled from "@emotion/styled";

const ArrowContainer = styled.div({
    display: "flex",
    marginRight: "0.625rem",
    ".right-arrow": {
        width: "0.5rem"
    }
})

export const RightArrow: FC = ({...rest}) => {
    return (
        <ArrowContainer {...rest}>
            <img className="right-arrow" src="/img/right-arrow.svg" alt="right arrow"/>
        </ArrowContainer>
    )
}