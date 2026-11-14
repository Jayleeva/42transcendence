import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

function check(label: string, ok: boolean) {
  console.log(`${ok ? "✅" : "❌"} ${label}`);
  if (!ok) process.exitCode = 1;
}

async function main() {
  const suffix = Date.now();

  // ---------- Données de test ----------
  const owner = await prisma.user.create({
    data: {
      lastname: "Owner", firstname: "Test",
      username: `owner_${suffix}`, email: `owner_${suffix}@test.local`,
    },
  });

  const pet = await prisma.pet.create({
    data: {
      name: "Rex", species: "DOG", ownerId: owner.id,
      photos: { create: [{ image: "a.jpg" }, { image: "b.jpg" }] },
    },
  });

  // post de owner qui identifie le pet
  const post = await prisma.post.create({
    data: { content: "Mon chien", authorId: owner.id, pets: { connect: { id: pet.id } } },
  });

  // ---------- Test 1 : suppression du Pet ----------
  console.log("\n--- Suppression du Pet ---");
  await prisma.pet.delete({ where: { id: pet.id } });

  check("Owner existe toujours", !!(await prisma.user.findUnique({ where: { id: owner.id } })));
  check("PetPhoto supprimées", (await prisma.petPhoto.count({ where: { petId: pet.id } })) === 0);
  const postAfter = await prisma.post.findUnique({ where: { id: post.id }, include: { pets: true } });
  check("Post existe toujours", !!postAfter);
  check("Post n'est plus lié au pet", postAfter?.pets.length === 0);

  // ---------- Test 2 : suppression du User ----------
  console.log("\n--- Suppression du User ---");
  const pet2 = await prisma.pet.create({
    data: { name: "Mia", species: "CAT", ownerId: owner.id, photos: { create: { image: "c.jpg" } } },
  });

  await prisma.user.delete({ where: { id: owner.id } });

  check("User supprimé", !(await prisma.user.findUnique({ where: { id: owner.id } })));
  check("Pets du user supprimés", (await prisma.pet.count({ where: { ownerId: owner.id } })) === 0);
  check("PetPhoto supprimées", (await prisma.petPhoto.count({ where: { petId: pet2.id } })) === 0);
  check("Posts du user supprimés", (await prisma.post.count({ where: { authorId: owner.id } })) === 0);
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());