import { NftMarket } from "../interface/idltypes";

export const IDL: NftMarket = {
  version: "0.1.0",
  name: "nft_market",
  instructions: [
    {
      name: "initializeAccount",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: true,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "associateTokenAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "delecate",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "state",
            type: {
              defined: "AccountState",
            },
          },
          {
            name: "isNative",
            type: {
              option: "u64",
            },
          },
          {
            name: "delegatedAmount",
            type: "u64",
          },
          {
            name: "closeAuthority",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "AccountState",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "Initialized",
          },
          {
            name: "Frozen",
          },
        ],
      },
    },
  ],
};
