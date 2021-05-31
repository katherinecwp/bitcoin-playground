export type P2SHInputGroup = {
    field: keyof P2SHInputs
    value: P2SHInputs
}

export type P2SHInputs = {
    m?: number,
    n?: number,
    pubkeys?: string
}

export enum P2SHInputEnum {
    m = "m",
    n = "n",
    pubkeys = "pubkeys"
}
