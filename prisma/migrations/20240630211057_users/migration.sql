-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OWNER', 'COLLABORATOR', 'GUEST');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "firstname" VARCHAR(200) NOT NULL,
    "lastname" VARCHAR(200) NOT NULL,
    "username" VARCHAR(200) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'COLLABORATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_uuid_key" ON "Users"("uuid");
