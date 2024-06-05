-- Revert diceforge:init from pg

BEGIN;

DROP TABLE "play", "contain", "possesses", "characterize", "object", "spell", "characteristic", "sheet", "game", "license", "user" CASCADE;

COMMIT;
