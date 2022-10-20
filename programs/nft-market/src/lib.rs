use anchor_lang::prelude::*;
pub mod model;
pub mod state;

use crate::{model::*, state::*};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nft_market {
    use super::*;

    pub fn initialize_account(ctx: Context<ATokenAccount>) -> Result<()> {

        let token_account = &mut ctx.accounts.token_account;
        token_account.
        Ok(())
    }
}
