BEGIN;

DROP TABLE IF EXISTS "play", "contain", "possesses", "characterize", "object", "spell", "characteristic", "sheet", "game", "license", "user" CASCADE;

CREATE TABLE "license" (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT
);

CREATE TABLE "user" (
    id SERIAL UNIQUE PRIMARY KEY,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    image TEXT
);

CREATE TABLE "game" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    music TEXT,
    note TEXT,
    event TIMESTAMPTZ,
    license_id INTEGER REFERENCES "license"(id)
);

CREATE TABLE "sheet" (
    id SERIAL NOT NULL PRIMARY KEY,
    image TEXT,
    class TEXT,
    level INT,
    game_id INTEGER REFERENCES "game"(id)
);

CREATE TABLE "characteristic" (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT
);

CREATE TABLE "spell" (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    incantation INT,
    scope TEXT,
    school TEXT,
    type TEXT,
    level INT
);

CREATE TABLE "object" (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT,
    description TEXT
);

CREATE TABLE "play" (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    user_id INTEGER REFERENCES "user"(id),
    game_id INTEGER REFERENCES "game"(id)
);

CREATE TABLE "contain" (
    id SERIAL NOT NULL PRIMARY KEY,
    quantity INT NOT NULL,
    object_id INTEGER REFERENCES "object"(id),
    sheet_id INTEGER REFERENCES "sheet"(id)
);

CREATE TABLE "possesses" (
    id SERIAL NOT NULL PRIMARY KEY,
    cost INT,
    limitation INT,
    spell_id INTEGER REFERENCES "spell"(id),
    sheet_id INTEGER REFERENCES "sheet"(id)
);

CREATE TABLE "characterize" (
    id SERIAL NOT NULL PRIMARY KEY,
    value INT NOT NULL,
    characteristic_id INTEGER REFERENCES "characteristic"(id),
    sheet_id INTEGER REFERENCES "sheet"(id)
);

COMMIT;