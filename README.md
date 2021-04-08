# MoonLotto Subgraph

An example subgraph initially forked from The Graph [example subgraph](https://github.com/graphprotocol/example-subgraph). Created by Purestake to get you started with The Graph on Moonbeam.

## Setup

Install the node dependencies using `yarn`:

```shell
yarn
```

Create the TS types for The Graph:

```shell
yarn codegen
```

## Deploying contracts

For deploying contracts on Moonbase Alpha, you'll need a funded account and its private key. Store it in a ENV variable like this:

```shell
export MOON_PRIVATE_KEY="99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342"  
```

Then, we'll need to compile and finally deploy the contracts:

```shell
# compiles using hardhat and solc 0.8.3
yarn contract-build
# deploys to moonbase alpha
yarn contract-deploy
```

> For more information see The Graph docs on https://thegraph.com/docs/.
> Or the Moonbeam docs on https://docs.moonbeam.network/.
