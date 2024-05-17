-- Revert diceforge:reset-password from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN reset_password_token;
ALTER TABLE "user" DROP COLUMN reset_password_expires;

COMMIT;
