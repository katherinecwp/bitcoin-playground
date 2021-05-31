import { FC } from 'react';
import HDSegWitContainer from './HDSegWitContainer';
import Header from '../../common/components/Header';
import styled from '@emotion/styled';
import { theme } from '../../common/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const BodyContainer = styled.div({
  width: "95%",
  margin: "auto",
})

const HDSegWitPage: FC = () => {

    return (
        <>
          <Header/>
          <BodyContainer>
            <MuiThemeProvider theme={theme}>
              <HDSegWitContainer/>
            </MuiThemeProvider>
          </BodyContainer>
        </>
    );
}

export default HDSegWitPage;