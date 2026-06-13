-- Frans Leren — Database setup voor Neon
-- Plak dit volledig in Neon SQL Editor en klik "Run"

CREATE TABLE IF NOT EXISTS "users" (
  "id"        TEXT        NOT NULL,
  "email"     TEXT        NOT NULL,
  "password"  TEXT        NOT NULL,
  "name"      TEXT        NOT NULL,
  "level"     TEXT        NOT NULL DEFAULT 'A1',
  "focus"     TEXT[]      NOT NULL DEFAULT ARRAY['schrijven'],
  "dailyGoal" INTEGER     NOT NULL DEFAULT 10,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "onboarded" BOOLEAN     NOT NULL DEFAULT false,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

CREATE TABLE IF NOT EXISTS "vocabulary" (
  "id"        TEXT    NOT NULL,
  "dutch"     TEXT    NOT NULL,
  "french"    TEXT    NOT NULL,
  "category"  TEXT    NOT NULL,
  "level"     TEXT    NOT NULL,
  "exampleNl" TEXT    NOT NULL,
  "exampleFr" TEXT    NOT NULL,
  "isBelgian" BOOLEAN NOT NULL DEFAULT false,
  "audioText" TEXT,
  "order"     INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "vocabulary_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_vocabulary" (
  "id"            TEXT        NOT NULL,
  "userId"        TEXT        NOT NULL,
  "vocabularyId"  TEXT        NOT NULL,
  "easeFactor"    FLOAT8      NOT NULL DEFAULT 2.5,
  "interval"      INTEGER     NOT NULL DEFAULT 1,
  "repetitions"   INTEGER     NOT NULL DEFAULT 0,
  "nextReview"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "lastScore"     INTEGER     NOT NULL DEFAULT 0,
  "totalCorrect"  INTEGER     NOT NULL DEFAULT 0,
  "totalAttempts" INTEGER     NOT NULL DEFAULT 0,
  "mastered"      BOOLEAN     NOT NULL DEFAULT false,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "user_vocabulary_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "user_vocabulary_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT "user_vocabulary_vocabularyId_fkey"
    FOREIGN KEY ("vocabularyId") REFERENCES "vocabulary"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "user_vocabulary_userId_vocabularyId_key"
  ON "user_vocabulary"("userId", "vocabularyId");

CREATE TABLE IF NOT EXISTS "grammar_modules" (
  "id"          TEXT    NOT NULL,
  "slug"        TEXT    NOT NULL,
  "titleNl"     TEXT    NOT NULL,
  "description" TEXT    NOT NULL,
  "level"       TEXT    NOT NULL,
  "order"       INTEGER NOT NULL,
  CONSTRAINT "grammar_modules_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "grammar_modules_slug_key" ON "grammar_modules"("slug");

CREATE TABLE IF NOT EXISTS "user_grammar" (
  "id"          TEXT        NOT NULL,
  "userId"      TEXT        NOT NULL,
  "moduleId"    TEXT        NOT NULL,
  "bestScore"   INTEGER     NOT NULL DEFAULT 0,
  "attempts"    INTEGER     NOT NULL DEFAULT 0,
  "completed"   BOOLEAN     NOT NULL DEFAULT false,
  "completedAt" TIMESTAMPTZ,
  CONSTRAINT "user_grammar_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "user_grammar_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT "user_grammar_moduleId_fkey"
    FOREIGN KEY ("moduleId") REFERENCES "grammar_modules"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "user_grammar_userId_moduleId_key"
  ON "user_grammar"("userId", "moduleId");

CREATE TABLE IF NOT EXISTS "learning_sessions" (
  "id"           TEXT        NOT NULL,
  "userId"       TEXT        NOT NULL,
  "date"         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "durationMins" INTEGER     NOT NULL DEFAULT 0,
  "wordsStudied" INTEGER     NOT NULL DEFAULT 0,
  "xpGained"     INTEGER     NOT NULL DEFAULT 0,
  CONSTRAINT "learning_sessions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "learning_sessions_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Trigger: updatedAt automatisch bijwerken
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW."updatedAt" = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER "users_updatedAt"
  BEFORE UPDATE ON "users"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER "user_vocabulary_updatedAt"
  BEFORE UPDATE ON "user_vocabulary"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
