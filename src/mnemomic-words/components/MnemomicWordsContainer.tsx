import { FC, useReducer } from 'react';
import * as bip39 from 'bip39';
import MnemomicWords from './MnemomicWords';

interface MnemomicWordsContainerProps {

}

type MnemomicWordsContainerState = {
    mnemonicWords: string,
}

enum MnemomicWordsContainerActionType {
    UPDATE_MNEMOMIC_WORDS
}

type MnemomicWordsContainerAction = {
    type: MnemomicWordsContainerActionType.UPDATE_MNEMOMIC_WORDS,
}

const MnemomicWordsContainerReducer = (state: MnemomicWordsContainerState, action: MnemomicWordsContainerAction): MnemomicWordsContainerState => {
    switch (action.type) {
        case MnemomicWordsContainerActionType.UPDATE_MNEMOMIC_WORDS: {
            return { ...state, mnemonicWords: bip39.generateMnemonic() };
        }
        default:
            return state;
    }
}

const MnemomicWordsContainer: FC<MnemomicWordsContainerProps> = () => {

    const [state, dispatch] = useReducer(MnemomicWordsContainerReducer, {
        mnemonicWords: "",
    });

    return (
        <>
            <MnemomicWords
                mnemonicWords={state.mnemonicWords}
                onGeneration={() => dispatch({ type:  MnemomicWordsContainerActionType.UPDATE_MNEMOMIC_WORDS })}
            />
        </>
    );
}

export default MnemomicWordsContainer;