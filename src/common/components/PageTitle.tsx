import { FC } from "react";
import styled from "@emotion/styled";

const Title = styled.div({
    marginBottom: "2rem",
    color: "#ff9800",
    fontFamily: "Segoe UI",
    fontSize: "3rem",
    fontWeight: 480,
})

const PageTitle : FC = ({ children }) => {
    return (
        <Title>
            {children}
        </Title>
    )
}

export default PageTitle;