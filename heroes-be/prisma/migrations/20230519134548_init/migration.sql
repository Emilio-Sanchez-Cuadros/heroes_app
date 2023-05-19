-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "picture" TEXT,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
