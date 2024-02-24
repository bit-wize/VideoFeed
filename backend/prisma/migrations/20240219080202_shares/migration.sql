-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "shares" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg';
