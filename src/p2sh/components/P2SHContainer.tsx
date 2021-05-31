import { FC, useReducer } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import P2SH from './P2SH';
import { P2SHInputGroup, P2SHInputEnum } from '../type/P2SHType';
import { ErrorMessage } from '../../common/message/CommonMessage';

interface P2SHContainerProps {

}

type P2SHContainerState = {
    n?: number,
    m?: number,
    pubkeys?: string,
    address?: string,
    error?: string
}

enum P2SHContainerActionType {
    UPDATE_INPUTS,
    UPDATE_ADDRESS
}

type P2SHContainerAction = {
    type: P2SHContainerActionType.UPDATE_INPUTS,
    p2shInputGroup: P2SHInputGroup
} | {
    type: P2SHContainerActionType.UPDATE_ADDRESS
}

const P2SHContainerReducer = (state: P2SHContainerState, action: P2SHContainerAction): P2SHContainerState => {
    switch (action.type) {
        case P2SHContainerActionType.UPDATE_INPUTS: {
            switch (action.p2shInputGroup.field) {
                case P2SHInputEnum.m: {
                    return { ...state, m: action.p2shInputGroup.value?.m, error: undefined, address: "" };
                }
                case P2SHInputEnum.n: {
                    return { ...state, n: action.p2shInputGroup.value?.n, error: undefined, address: "" };
                }
                case P2SHInputEnum.pubkeys: {
                    return { ...state, pubkeys: action.p2shInputGroup.value?.pubkeys, error: undefined, address: "" };
                }
                default:
                    return state;
            }
        }
        case P2SHContainerActionType.UPDATE_ADDRESS: {
            let pubkeyArr: any = state.pubkeys ? state.pubkeys?.split(",") : [];
            if (!state.n) {
                return { ...state, error: ErrorMessage.INVALID_N };
            }
            if (!state.m) {
                return { ...state, error: ErrorMessage.INVALID_M };
            }
            if (state.n > state.m) {
                return { ...state, error: ErrorMessage.N_LARGER_THAN_M };
            }
            if (pubkeyArr.length !== state.m) {
                return { ...state, error: ErrorMessage.INCORRECT_NUMBER_PUBKEYS };
            }
            pubkeyArr = pubkeyArr.map((pubkey: string) => (pubkey.trim())).map((hex: string) => (Buffer.from(hex, 'hex')));
            try {
                const { address } = bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2ms({ m: state.n, pubkeys: pubkeyArr }), });
                return { ...state, address: address, error: undefined };
            } catch {
                return { ...state, address: "", error: ErrorMessage.ADDRESS_GENERATION_ERROR };
            }
        }
        default:
            return state;
    }
}


const P2SHContainer: FC<P2SHContainerProps> = () => {

    const [state, dispatch] = useReducer(P2SHContainerReducer, {
    });

    return (
        <>
            <P2SH
                n={state.n}
                m={state.m}
                pubkeys={state.pubkeys}
                address={state.address}
                error={state.error}
                onInputChange={(p2shInputGroup) => dispatch({ type: P2SHContainerActionType.UPDATE_INPUTS, p2shInputGroup })}
                onGeneration={() => dispatch({ type: P2SHContainerActionType.UPDATE_ADDRESS })}
            />
        </>
    );
}

export default P2SHContainer;