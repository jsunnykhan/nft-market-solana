import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { NftMarket } from "../target/types/nft_market";

describe("nft-market", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.NftMarket as Program<NftMarket>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
