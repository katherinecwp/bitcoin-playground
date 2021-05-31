import { FC } from 'react';
import MnemomicWordsContainer from './MnemomicWordsContainer';
import Header from '../../common/components/Header';
import styled from '@emotion/styled';
import { theme } from '../../common/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const BodyContainer = styled.div({
  width: "95%",
  margin: "auto",
})

const MnemomicWordsPage: FC = () => {

    return (
        <>
          <Header/>
          <BodyContainer>
            <MuiThemeProvider theme={theme}>
              <MnemomicWordsContainer/>
            </MuiThemeProvider>
          </BodyContainer>
        </>
    );
}

export default MnemomicWordsPage;