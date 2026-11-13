import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
	adapter,
});

async function main()
{
	// TEST 1 : créer "ALICE" alors que "alice" existe déjà → doit échouer
	try {
		await prisma.user.create({
			data: {
				lastname: "Test",
				firstname: "Test",
				username: "ALICE",
				email: "autre@test.com",
			},
		});
		console.log("❌ TEST 1 raté : ALICE a été créé (doublon accepté)");
	} catch (error) {
		if ((error as { code?: string }).code === "P2002")
			console.log("✅ TEST 1 réussi : ALICE refusé car alice existe déjà");
		else
			throw error;
	}

	// TEST 2 : même email mais en majuscules → doit échouer
	try {
		await prisma.user.create({
			data: {
				lastname: "Test",
				firstname: "Test",
				username: "quelquun",
				email: "ALICE@TEST.COM",
			},
		});
		console.log("❌ TEST 2 raté : ALICE@TEST.COM a été créé (doublon accepté)");
	} catch (error) {
		if ((error as { code?: string }).code === "P2002")
			console.log("✅ TEST 2 réussi : ALICE@TEST.COM refusé car alice@test.com existe déjà");
		else
			throw error;
	}

	// TEST 3 : chercher avec des majuscules → doit trouver alice
	const found = await prisma.user.findUnique({
		where: { username: "AlIcE" },
	});
	if (found)
		console.log(`✅ TEST 3 réussi : "AlIcE" a trouvé l'utilisateur "${found.username}"`);
	else
		console.log("❌ TEST 3 raté : rien trouvé avec AlIcE");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});