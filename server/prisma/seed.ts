import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("from prisma client", process.env.POSTGRES_URI);
console.log("from prisma client", Bun.env.POSTGRES_URI);
async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Harry Potter",
        email: "harry@gmail.com",
        avatarImage:
          "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        password: hashedPassword,
      },
      {
        name: "Hermione Granger",
        email: "hermione@gmail.com",
        avatarImage:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        password: hashedPassword,
      },
      {
        name: "Ron Weasley",
        email: "ron@gmail.com",
        avatarImage:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
        password: hashedPassword,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();

    console.log("from prisma client", process.env.POSTGRES_URI);
    console.log("from prisma client", Bun.env.POSTGRES_URI);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
