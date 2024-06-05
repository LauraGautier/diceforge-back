-- Deploy diceforge:seedLicenses to pg

BEGIN;

INSERT INTO "license" (name)
VALUES 
('Donjons et Dragons'), 
('Cthulhu'), 
('Warhammer'),
('Libre');


INSERT INTO "game" (id, name)
VALUES
('1', 'Le trésor perdu');

COMMIT;
