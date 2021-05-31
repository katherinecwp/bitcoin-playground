# Getting Started with Bitcoin Playground

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 3rd Party Libraries used in this project
1. `bitcoinjs-lib`
2. `bip32`
3. `bip39`
4. `qrcode.react`
5. `react-router-dom`
6. `typescript`
#### Please run `yarn install` to install the packages needed in this project.

## Features
1. Generate a random mnemonic words following BOP39 standard\
See [http://localhost:3000/mnemomic-words](http://localhost:3000/mnemomic-words).
2. Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path\
See [http://localhost:3000/hd-segwit](http://localhost:3000/hd-segwit).
3. Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and public keys can be specified\
See [http://localhost:3000/p2sh](http://localhost:3000/p2sh).
