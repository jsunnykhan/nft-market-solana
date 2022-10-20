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
        let mint = &mut ctx.accounts.mint;
        let owner = &mut ctx.accounts.owner;
        token_account.mint = mint.key();
        token_account.owner = owner.key();
        token_account.amount = 1;
        token_account.delecate = None;
        token_account.state = AccountState::Initialized;
        token_account.is_native = Some(0);
        token_account.delegated_amount = 0;
        token_account.close_authority = owner.key();

        Ok(())
    }
}
