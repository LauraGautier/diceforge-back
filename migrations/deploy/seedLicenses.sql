-- Deploy diceforge:seedLicenses to pg

BEGIN;

INSERT INTO "license" (name)
VALUES 
('Donjon et dragon'), 
('Cthulhu'), 
('Warhammer'),
('Libre');

COMMIT;
