import { FC } from 'react';
import P2SHContainer from './P2SHContainer';
import Header from '../../common/components/Header';
import styled from '@emotion/styled';
import { theme } from '../../common/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const BodyContainer = styled.div({
  width: "95%",
  margin: "auto",
})

const P2SHPage: FC = () => {

    return (
        <>
          <Header/>
          <BodyContainer>
            <MuiThemeProvider theme={theme}>
              <P2SHContainer/>
            </MuiThemeProvider>
          </BodyContainer>
        </>
    );
}

export default P2SHPage;