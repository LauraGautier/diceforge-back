-- Deploy diceforge:reset-password to pg

BEGIN;

ALTER TABLE "user"
    ADD COLUMN reset_password_token VARCHAR(255),
    ADD COLUMN reset_password_expires TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 day';


COMMIT;
