import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import * as anchor from "@project-serum/anchor";
import { useMemo } from "react";

import { IDL } from "../utils/Idl";
import { NftMarket } from "../interface/idltypes";
import { PROGRAM_ID } from "../utils/account";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  ASSOCIATED_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@project-serum/anchor/dist/cjs/utils/token";
import { Program } from "@project-serum/anchor";

export const useSolana = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const program: Program<NftMarket> | undefined = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );

      return new anchor.Program(IDL, PROGRAM_ID, provider);
    }
  }, [connection, anchorWallet]);

  const createPdaAssociateAccount = async (
    mint: PublicKey,
    owner: PublicKey
  ): Promise<PublicKey> => {
    const [pda, _] = await findProgramAddressSync(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      program?.programId!
    );
    return pda;
  };

  const createAssociateAccount = async () => {
    if (program && publicKey) {
      try {
        const mintAccount: Keypair = Keypair.generate();
        const pdaAccount = await createPdaAssociateAccount(
          mintAccount.publicKey,
          publicKey
        );

        console.log(pdaAccount?.toString(), mintAccount.publicKey.toString());
        console.log("--------------------------------------------------");

        const transaction = await program.methods
          .initializeAccount()
          .accounts({
            mint: mintAccount.publicKey,
            owner: publicKey,
            tokenAccount: pdaAccount,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([mintAccount])
          .rpc();

        console.log("The transaction id : ", transaction);
      } catch (error) {
        console.error("Error from : ", error);
      }
    }
  };

  return {
    createAssociateAccount,
  };
};
