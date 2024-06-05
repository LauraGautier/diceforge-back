-- Revert diceforge:emailIntoGame from pg

BEGIN;

ALTER TABLE "game" DROP COLUMN "email";

COMMIT;
