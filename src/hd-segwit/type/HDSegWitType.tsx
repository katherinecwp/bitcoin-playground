export type BitcoinAddress = {
    path: string
    address: string
}

export type Path = {
    account: number | null
    change: number | null
    addressIndex: number | null
}

export type PathInput = {
    index?: number,
    account?: number,
    change?: number,
    addressIndex?: number
}
