use crate::state::AssociateTokenAccount;
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::Token};

#[derive(Accounts)]
pub struct ATokenAccount<'info> {
    #[account(mut)]
    pub mint: Signer<'info>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        seeds=[owner.key().as_ref() , b"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" , mint.key().as_ref()],
        bump,
        space= 8 + std::mem::size_of::<AssociateTokenAccount>(),
    )]
    pub token_account: Box<Account<'info, AssociateTokenAccount>>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
