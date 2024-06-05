-- Revert diceforge:seedLicenses from pg

BEGIN;

TRUNCATE TABLE "license" CASCADE;

COMMIT;
