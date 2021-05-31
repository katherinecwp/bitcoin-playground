import { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Header from '../common/components/Header';
import { BitcoinIcon } from '../common/icons/BitcoinIcon';
import { RightArrow } from '../common/icons/RightArrow';
import { PageName } from '../common/PageName';
import { Route } from '../common/Route';

const FlexContainer = styled.div({
    marginTop: "4.5rem",
    display: "flex",
    flexDirection: "row",
    gap: "1.5rem"
})

const LeftFlexContainer = styled.div({
    flex: "1 1 auto",
    display: "flex",
    gap: "2rem",
    flexDirection: "column",
    "a": {
        textDecoration: "none",
        fontSize: "1.2rem",
        color: "grey"
    },
})

const WelcomeMessage = styled.div({
    color: "#ff9800",
    fontFamily: "Segoe UI",
    fontSize: "3rem",
    fontWeight: 480,
})

const SectionItem = styled.div({
    padding: "1rem",
    height: 50,
    borderRadius: 10,
    border: "1px solid #e6e6e6",
    lineHeight: "50px",
    ":hover": {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
})

const RightFlexContainer = styled.div({
    display: "flex",
    alignItems: "center",
    ".bitcoin-img": {
        width: "28.125rem"
    },
})

const BodyContainer = styled.div({
    width: "65%",
    margin: "auto",
})


const Home: FC = () => {

    return (
        <>
            <Header />
            <BodyContainer>
                <FlexContainer>
                    <LeftFlexContainer>
                        <WelcomeMessage>
                            Welcome to Bitcoin Playground!
                        </WelcomeMessage>
                        <Link to={Route.MNEMONIC_WORDS}><SectionItem>{PageName.MNEMONIC_WORDS}<RightArrow/></SectionItem></Link>
                        <Link to={Route.HD_SEGWIT}><SectionItem>{PageName.HD_SEGWIT}<RightArrow/></SectionItem></Link>
                        <Link to={Route.N_OUT_OF_M_P2SH}><SectionItem>{PageName.N_OUT_OF_M_P2SH}<RightArrow/></SectionItem></Link>
                    </LeftFlexContainer>
                    <RightFlexContainer>
                        <BitcoinIcon className="bitcoin-img"/>
                    </RightFlexContainer>
                </FlexContainer>
            </BodyContainer>
        </>
    )
}

export default Home;