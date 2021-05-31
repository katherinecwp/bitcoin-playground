import { FC } from 'react';
import styled from '@emotion/styled';
import { Button, Fab, TextField, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, InputAdornment } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import InputIcon from '@material-ui/icons/Input';
import AddIcon from '@material-ui/icons/Add';
import Text from '../../common/components/Text';
import Alert from '../../common/components/Alert';
import { ACCOUNT_MIN, CHANGE_MIN, ADDRESS_INDEX_MIN } from '../type/HDSegWitConstant';
import { BitcoinAddress, Path, PathInput } from '../type/HDSegWitType';
import PageTitle from '../../common/components/PageTitle';
import { ErrorMessage } from '../../common/message/CommonMessage';

interface HDSegWitProps {
    phrase: string,
    seed: string,
    isPhraseValid: boolean,
    isSeedValid: boolean,
    paths: Path[],
    addresses?: BitcoinAddress[],
    error?: string,
    onPhraseChange: (phrase: string) => void
    onSeedChange: (seed: string) => void
    onPathUpdate: (paths: PathInput) => void
    onGeneration: () => void
}

const ModulePaper = styled(Paper)({
    margin: "1rem",
    padding: "25px",
    ".input-area, table": {
        margin: "1rem 0",
    },
    ".error-text": {
        color: "#f44336"
    }
})

const AddContainer = styled.div({
    display: "flex",
    justifyContent: "flex-end"
})

const HDSegWit: FC<HDSegWitProps> = ({ phrase, seed, isPhraseValid, isSeedValid, paths, addresses, error, onPhraseChange, onSeedChange, onPathUpdate, onGeneration }) => {

    return (
        <ModulePaper variant="outlined">
            <PageTitle>HD SegWit Bitcoin Address Creation</PageTitle>
                <TextField 
                    className={"input-area"}
                    id={"phrase-input"}
                    label={"Mnemomic Words"}
                    placeholder={"Please input your BIP39 mnemomic phrase here."}
                    variant={"outlined"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <InputIcon />
                        </InputAdornment>
                        ),
                    }}
                    fullWidth
                    value={phrase}
                    onChange={e => onPhraseChange(e.target.value)}
                    error={!isPhraseValid}
                    helperText={isPhraseValid ? undefined : "Invalid Mnemomic Words!"}
                    disabled={!!seed}
                />
                <TextField 
                    className={"input-area"}
                    id={"seed-input"}
                    label={"Seed"}
                    placeholder={"Please input your BIP39 seed here."}
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
                    value={seed}
                    onChange={e => onSeedChange(e.target.value)}
                    error={!isSeedValid}
                    helperText={isSeedValid ? undefined : "Invalid Seed!"}
                    disabled={!!phrase}
                />
                <Text bold>Paths</Text>
                    <TableContainer>
                        <Table size="small" aria-label="Derived Addresses">
                            <TableHead>
                            <TableRow>
                                <TableCell>m</TableCell>
                                <TableCell>/</TableCell>
                                <TableCell>purpose'</TableCell>
                                <TableCell>/</TableCell>
                                <TableCell>coin_type'</TableCell>
                                <TableCell>/</TableCell>
                                <TableCell>account'</TableCell>
                                <TableCell>/</TableCell>
                                <TableCell>change</TableCell>
                                <TableCell>/</TableCell>
                                <TableCell>address_index</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {paths.map((path, index) => {
                                return (
                                    <TableRow key={`path-${index}`}>
                                    <TableCell>m</TableCell>
                                    <TableCell>/</TableCell>
                                    <TableCell>44'</TableCell>
                                    <TableCell>/</TableCell>
                                    <TableCell>0'</TableCell>
                                    <TableCell>/</TableCell>
                                        <TableCell>
                                            <TextField
                                                id={"account-input"}
                                                value={path.account}
                                                type={"number"}
                                                InputProps={{ inputProps: { min: ACCOUNT_MIN } }}
                                                onChange={e => onPathUpdate({ index, account: parseInt(e.target.value) })}
                                            />'
                                        </TableCell>
                                        <TableCell>/</TableCell>
                                        <TableCell>
                                        <TextField
                                                id={"change-input"}
                                                value={path.change}
                                                type={"number"}
                                                InputProps={{ inputProps: { min: CHANGE_MIN } }}
                                                onChange={e => onPathUpdate({ index, change: parseInt(e.target.value) })}
                                        />
                                        </TableCell>
                                        <TableCell>/</TableCell>
                                        <TableCell>
                                        <TextField
                                                id={"index-input"}
                                                value={path.addressIndex}
                                                type={"number"}
                                                InputProps={{ inputProps: { min: ADDRESS_INDEX_MIN } }}
                                                onChange={e => onPathUpdate({ index, addressIndex: parseInt(e.target.value) })}
                                        />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                <AddContainer>
                    <Fab color="secondary" aria-label="add" onClick={() => onPathUpdate({})}>
                        <AddIcon />
                    </Fab>
                </AddContainer>
                <Button
                    className={"input-area"}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<RefreshIcon />}
                    onClick={onGeneration}
                >
                    Generate
                </Button>
                {addresses && addresses.length > 0 && 
                        <TableContainer>
                            <Table size="small" aria-label="Bitcoin Addresses">
                                <TableHead>
                                    <TableRow key={`address-head`}>
                                        <TableCell>Path</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {addresses.map((address, index) => {
                                        return (
                                            <>
                                                <TableRow key={`address-${index}`}>
                                                    <TableCell>{address.path ? address.path : <span className="error-text">{ErrorMessage.INVALID_PATH}</span>}</TableCell>
                                                    <TableCell>{address.address ? address.address : "-"}</TableCell>
                                                    <TableCell>{address.address && <Button size="small" color="secondary" onClick={() => navigator.clipboard.writeText(address.address)}>Copy</Button>}</TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                {error && <Alert variant="filled" severity="error">{error}</Alert>}
        </ModulePaper>
    );
}

export default HDSegWit;