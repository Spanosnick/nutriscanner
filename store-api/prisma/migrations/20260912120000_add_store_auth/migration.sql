-- AlterTable
ALTER TABLE "Store" ADD COLUMN "email" TEXT NOT NULL,
ADD COLUMN "password" TEXT NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");
