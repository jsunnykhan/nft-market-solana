use anchor_lang::prelude::*;
use anchor_spl::{token::Token, associated_token::AssociatedToken};
use crate::state::AssociateTokenAccount;

#[derive(Accounts)]
pub struct ATokenAccount<'info> {
    #[account(mut)]
    pub mint: AccountInfo<'info>,
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    #[account(
        init,
        payer = owner,
        seeds=[owner.key().as_ref() , b"" , mint.key().as_ref()],
        bump,
        space= 8 + std::mem::size_of::<AssociateTokenAccount>(),
    )]
    pub token_account: Account<'info, AssociateTokenAccount>,

    pub token_program : Program<'info , Token>,
    pub associated_token : Program<'info , AssociatedToken>,
    pub system_program : Program<'info , System>
}
