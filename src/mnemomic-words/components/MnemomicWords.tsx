import { FC } from 'react';
import { Button, Paper } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import styled from '@emotion/styled';
import PageTitle from '../../common/components/PageTitle';

interface MnemomicWordsProps {
    mnemonicWords: string,
    onGeneration: () => void
}

const ModulePaper = styled(Paper)({
    margin: "1rem",
    padding: "25px",
})

const FlexContainer = styled.div({
    display: "flex",
    minHeight: "2rem",
    "button": {
        marginRight: "1rem",
    },
})

const PhraseContainer = styled.div({
    fontSize: "1.2rem",
    height: "fit-content",
    margin: "auto 0",
})

const MnemomicWords: FC<MnemomicWordsProps> = ({ mnemonicWords, onGeneration }) => {

    return (
        <ModulePaper variant="outlined">
            <PageTitle>Mnemomic Words Generation</PageTitle>
                <FlexContainer>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<RefreshIcon />}
                        onClick={onGeneration}
                    >
                        Generate
                    </Button>
                    <PhraseContainer>{mnemonicWords}</PhraseContainer>
                </FlexContainer>
        </ModulePaper>
    );
}

export default MnemomicWords;