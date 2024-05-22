-- Deploy diceforge:seedLicenses to pg

BEGIN;

INSERT INTO "license" (name)
VALUES 
('Donjon and Dragon'), 
('Cthulhu'), 
('Warhammer'),
('Libre');

COMMIT;
