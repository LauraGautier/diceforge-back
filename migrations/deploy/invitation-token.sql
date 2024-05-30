-- Deploy diceforge:invitation-token to pg

BEGIN;

ALTER TABLE "game" ADD COLUMN invitation_token TEXT;


COMMIT;
