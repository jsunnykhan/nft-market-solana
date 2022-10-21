import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { NftMarket } from "../target/types/nft_market";
import { PublicKey } from "@solana/web3.js";

describe("nft-market", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.NftMarket as Program<NftMarket>;

  const Token_Program = new anchor.web3.PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  );
  const Associate_Token_Program = new anchor.web3.PublicKey(
    "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  );
  const SystemProgram = new anchor.web3.PublicKey(
    "11111111111111111111111111111111"
  );
  const programId = new anchor.web3.PublicKey(
    "BvDgBZ3PS8g4rz3s9hmfXNYBYM5XDqyzLqeK7cYVgoPs"
  );

  it("Is initialized!", async () => {
    // Add your test here.

    // create mint account
    const mint = anchor.web3.Keypair.generate();
    console.log({ mintKey: mint.publicKey });
    //create owner account

    const owner = anchor.web3.Keypair.generate();
    console.log({ owner: owner.publicKey });
    //create a pda

    const pda = (
      await PublicKey.findProgramAddress(
        [
          owner.publicKey.toBuffer(),
          Token_Program.toBuffer(),
          mint.publicKey.toBuffer(),
        ],
        Associate_Token_Program
      )
    )[0];
    console.log({ program_id: program.programId });
    console.log({ pda });
    const tx = await program.methods
      .initializeAccount()
      .accounts({
        mint: mint.publicKey,
        owner: owner.publicKey,
        tokenAccount: pda,
        tokenProgram: Token_Program,
        associatedTokenProgram: Associate_Token_Program,
        systemProgram: SystemProgram,
      })
      .signers([mint, owner])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
