use anchor_lang::prelude::*;
use anchor_spl::{token::Token, associated_token::AssociatedToken};
use crate::state::AssociateTokenAccount;

#[derive(Accounts)]
pub struct ATokenAccount<'info> {
    /// CHECK: This is not dangerous we don't read or write from this account
    #[account(mut)]
    pub mint: AccountInfo<'info>,
    /// CHECK: This is not dangerous we don't read or write from this account
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    #[account(
        init,
        payer = owner,
        seeds=[owner.key().as_ref() , b"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" , mint.key().as_ref()],
        bump,
        space= 8 + std::mem::size_of::<AssociateTokenAccount>(),
    )]
    pub token_account: Account<'info, AssociateTokenAccount>,

    pub token_program : Program<'info , Token>,
    pub associated_token_program : Program<'info , AssociatedToken>,
    pub system_program : Program<'info , System>
}
