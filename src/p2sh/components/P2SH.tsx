import { FC } from 'react';
import QRCode from "qrcode.react";
import { Button, TextField, Paper, InputAdornment, Card, CardContent, CardActions } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import InputIcon from '@material-ui/icons/Input';
import styled from '@emotion/styled';
import Text from '../../common/components/Text';
import Alert from '../../common/components/Alert';
import { P2SHInputEnum, P2SHInputGroup } from '../type/P2SHType';
import { N_MIN, M_MIN } from '../type/P2SHConstant';
import PageTitle from '../../common/components/PageTitle';

interface P2SHProps {
    n?: number,
    m?: number,
    pubkeys?: string,
    address?: string,
    error?: string
    onInputChange: (p2shInputGroup: P2SHInputGroup) => void
    onGeneration: () => void
}
const ModulePaper = styled(Paper)({
    margin: "1rem",
    padding: "25px",
    ".card": {
        width: "fit-content",
        height: "fit-content",
        paddingTop: "1rem",
        margin: "1rem 0"
    },
    ".card, .card-content": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    ".button": {
        margin: "1rem 0"
    }
})

const InputArea = styled.div({
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    ".input-area": {
        width: "15rem",
    }
})

const P2SH: FC<P2SHProps> = ({ n, m, pubkeys, address, error, onInputChange, onGeneration }) => {
   
    return (
        <ModulePaper variant="outlined">
            <PageTitle>n-out-of-m Multi-Sig P2SH Bitcoin Address Generation</PageTitle>
            <InputArea>
                <TextField
                    className="input-area"
                    id={`${P2SHInputEnum.n}-input`}
                    label={P2SHInputEnum.n}
                    placeholder={"Please enter value n."}
                    variant={"outlined"}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <InputIcon />
                        </InputAdornment>
                        ),
                        inputProps: { min: N_MIN } 
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={n}
                    type={"number"}
                    onChange={e => onInputChange({ field: P2SHInputEnum.n, value: { n: parseInt(e.target.value) }})}
                />
                <TextField
                    className="input-area"
                    id={`${P2SHInputEnum.m}-input`}
                    label={P2SHInputEnum.m}
                    placeholder={"Please enter value m."}
                    variant={"outlined"}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <InputIcon />
                        </InputAdornment>
                        ),
                        inputProps: { min: M_MIN }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={m}
                    type={"number"}
                    onChange={e => onInputChange({ field: P2SHInputEnum.m, value: { m: parseInt(e.target.value) }})}
                />
                <TextField
                    id={`${P2SHInputEnum.pubkeys}-input`}
                    label={"Public Keys"}
                    placeholder={`Please enter public keys with "," as separation.`}
                    variant={"outlined"}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <InputIcon />
                        </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    multiline
                    value={pubkeys}
                    onChange={e => onInputChange({ field: P2SHInputEnum.pubkeys, value: { pubkeys: e.target.value }})}
                />
            </InputArea>
            <Button
                className="button"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={onGeneration}
            >
                Generate
            </Button>
            {address && <Text bold>Bitcoin Address</Text>}
            {address && 
                <Card className="card" variant="outlined" raised>
                    <CardContent className="card-content">
                        <QRCode level="H" size={250} value={address} />
                        <Text bold>{address}</Text>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" color="primary" onClick={() => navigator.clipboard.writeText(address)}>Click here to copy the address to clipboard!</Button>
                    </CardActions>
                </Card>
            }
            {error && <Alert variant="filled" severity="error">{error}</Alert>}
        </ModulePaper>
    );
}

export default P2SH;