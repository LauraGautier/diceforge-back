-- Deploy diceforge:emailIntoGame to pg

BEGIN;

ALTER TABLE "game" ADD COLUMN "email" json; 

COMMIT;
