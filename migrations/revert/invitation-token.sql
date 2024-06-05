-- Revert diceforge:invitation-token from pg

BEGIN;

ALTER TABLE "game" DROP COLUMN invitation_token;

COMMIT;
