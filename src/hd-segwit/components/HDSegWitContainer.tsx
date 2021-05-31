import { FC, useReducer } from 'react';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import HDSegWit from './HDSegWit';
import { BitcoinAddress, Path, PathInput } from '../type/HDSegWitType';
import { ErrorMessage } from '../../common/message/CommonMessage';

interface HDSegWitContainerProps {

}


type HDSegWitContainerState = {
    phrase: string,
    seed: string,
    isPhraseValid: boolean,
    isSeedValid: boolean,
    paths: Path[],
    addresses?: BitcoinAddress[],
    error?: string,
}

enum HDSegWitContainerActionType {
    UPDATE_INPUT_PHRASE,
    UPDATE_INPUT_SEED,
    UPDATE_PATHS,
    UPDATE_ADDRESSES
}

type HDSegWitContainerAction = {
    type: HDSegWitContainerActionType.UPDATE_INPUT_PHRASE,
    phrase: string,
} | {
    type: HDSegWitContainerActionType.UPDATE_INPUT_SEED,
    seed: string,
} | {
    type: HDSegWitContainerActionType.UPDATE_PATHS,
    paths: PathInput
} | {
    type: HDSegWitContainerActionType.UPDATE_ADDRESSES,
}

const HDSegWitContainerReducer = (state: HDSegWitContainerState, action: HDSegWitContainerAction): HDSegWitContainerState => {
    const getAddress = (node: any, network?: any) => {
        return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
    }
    switch (action.type) {
        case HDSegWitContainerActionType.UPDATE_INPUT_PHRASE: {
            let isPhraseValid = true;
            if (action.phrase) {
                isPhraseValid = bip39.validateMnemonic(action.phrase);
            }
            return { ...state, phrase: action.phrase, isPhraseValid: isPhraseValid, error: undefined, addresses: [] };
        }
        case HDSegWitContainerActionType.UPDATE_INPUT_SEED: {
            let isSeedValid = true;
            if (action.seed) {
                try {
                    bitcoin.bip32.fromSeed(
                        Buffer.from(
                            action.seed,
                            "hex"
                        ),
                    );
                } catch {
                    isSeedValid = false;
                }
            }
            return { ...state, seed: action.seed, isSeedValid: isSeedValid, error: undefined, addresses: [] };
        }
        case HDSegWitContainerActionType.UPDATE_PATHS: {
            const index = action.paths.index;
            const account = action.paths.account;
            const change = action.paths.change;
            const addressIndex = action.paths.addressIndex;
            let _paths: Path[] = [...state.paths];
            if(index !== undefined && index !== null) {
                if (_paths.length > index) {
                    if (account !== undefined && account !== null) {
                        _paths[index].account = account;
                    }
                    if (change !== undefined && change !== null) {
                        _paths[index].change = change;
                    }
                    if (addressIndex !== undefined && addressIndex !== null) {
                        _paths[index].addressIndex = addressIndex;
                    }
                }
            } else {
                _paths.push({
                    account: null,
                    change: null,
                    addressIndex: null,
                });
            }
            return { ...state, paths: _paths, error: undefined, addresses: [] };
        }
        case HDSegWitContainerActionType.UPDATE_ADDRESSES: {
            let _addresses: BitcoinAddress[] = [];            
            if (!state.phrase && !state.seed) {
                return { ...state, error: ErrorMessage.NO_MNEMOMIC_OR_SEED }
            }
            if(state.paths && state.paths.length > 0) {
                let root: any;
                if (state.phrase) {
                    if (!state.isPhraseValid) {
                        return { ...state, error: ErrorMessage.INVALID_MNEMOMIC }
                    }
                    const seed = bip39.mnemonicToSeedSync(state.phrase);
                    root = bitcoin.bip32.fromSeed(seed);
                } else if (state.seed) {
                    if (!state.isSeedValid) {
                        return {...state, error: ErrorMessage.INVALID_SEED}
                    }
                    root = bitcoin.bip32.fromSeed(
                        Buffer.from(
                            state.seed,
                            "hex"
                        ),
                    );
                }
                state.paths.forEach(path => {
                    let constructedPath: string = `m/44'/0'/${path.account}'/${path.change}/${path.addressIndex}`;
                    let address: string | undefined = "";
                    try {
                        address = getAddress(root.derivePath(constructedPath));
                        _addresses.push({
                            path: constructedPath,
                            address: address ? address : ErrorMessage.ADDRESS_GENERATION_ERROR
                        });
                    } catch {
                        _addresses.push({
                            path: "",
                            address: ""
                        });
                    }
                })
            }
            return { ...state, addresses: _addresses, error: undefined };
        }
        
        default:
            return state;
    }
}


const HDSegWitContainer: FC<HDSegWitContainerProps> = () => {

    const [state, dispatch] = useReducer(HDSegWitContainerReducer, {
        phrase: "",
        seed: "",
        isPhraseValid: true,
        isSeedValid: true,
        paths: [{
            account: null,
            change: null,
            addressIndex: null,
        }],
    });

    return (
        <>
            <HDSegWit
                phrase={state.phrase}
                seed={state.seed}
                isPhraseValid={state.isPhraseValid}
                isSeedValid={state.isSeedValid}
                paths={state.paths}
                addresses={state.addresses}
                error={state.error}
                onPhraseChange={(phrase: string) => dispatch({ type: HDSegWitContainerActionType.UPDATE_INPUT_PHRASE, phrase })}
                onSeedChange={(seed: string) => dispatch({ type: HDSegWitContainerActionType.UPDATE_INPUT_SEED, seed })}
                onPathUpdate={(paths: PathInput) => dispatch({ type: HDSegWitContainerActionType.UPDATE_PATHS, paths })}
                onGeneration={() => dispatch({ type: HDSegWitContainerActionType.UPDATE_ADDRESSES })}
            />
        </>
    );
}

export default HDSegWitContainer;