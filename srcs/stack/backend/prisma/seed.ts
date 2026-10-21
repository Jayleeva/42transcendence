import "dotenv/config";
import { PrismaClient, Species } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
	adapter,
});

async function main()
{
	// ==================== USERS ====================

	const alice = await prisma.user.create({
		data: {
			lastname: "Dupont",
			firstname: "Alice",
			username: "alice",
			email: "alice@test.com",
			bio: "Cat lover and 42 student",
		},
	});

	const bob = await prisma.user.create({
		data: {
			lastname: "Martin",
			firstname: "Bob",
			username: "bob",
			email: "bob@test.com",
			bio: "Dogs, code and coffee",
		},
	});

	const charlie = await prisma.user.create({
		data: {
			lastname: "Bernard",
			firstname: "Charlie",
			username: "charlie",
			email: "charlie@test.com",
		},
	});

	// ==================== PETS ====================

	const luna = await prisma.pet.create({
		data: {
			name: "Luna",
			species: Species.CAT,
			race: "European",
			bio: "Professional sleeper",
			ownerId: alice.id,
		},
	});

	const rocky = await prisma.pet.create({
		data: {
			name: "Rocky",
			species: Species.DOG,
			race: "Labrador",
			bio: "Always ready for a walk",
			ownerId: bob.id,
		},
	});

	const cookie = await prisma.pet.create({
		data: {
			name: "Cookie",
			species: Species.BUNNY,
			ownerId: charlie.id,
		},
	});

	// ==================== PET PHOTOS ====================

	await prisma.petPhoto.create({
		data: {
			image: "/uploads/pets/luna-1.jpg",
			petId: luna.id,
		},
	});

	await prisma.petPhoto.create({
		data: {
			image: "/uploads/pets/rocky-1.jpg",
			petId: rocky.id,
		},
	});

	// ==================== POSTS ====================

	const postAlice = await prisma.post.create({
		data: {
			content: "Luna discovered my keyboard today!",
			authorId: alice.id,
			pets: {
				connect: {
					id: luna.id,
				},
			},
		},
	});

	const postBob = await prisma.post.create({
		data: {
			content: "Morning walk with Rocky 🐕",
			authorId: bob.id,
			pets: {
				connect: {
					id: rocky.id,
				},
			},
		},
	});

	// ==================== POST IMAGE ====================

	await prisma.postImage.create({
		data: {
			image: "/uploads/posts/rocky-walk.jpg",
			postId: postBob.id,
		},
	});

	// ==================== COMMENTS ====================

	const commentBob = await prisma.comment.create({
		data: {
			content: "Luna is adorable!",
			authorId: bob.id,
			postId: postAlice.id,
		},
	});

	await prisma.comment.create({
		data: {
			content: "She clearly wants to learn programming.",
			authorId: charlie.id,
			postId: postAlice.id,
		},
	});

	// ==================== LIKES ====================

	await prisma.postLike.create({
		data: {
			authorId: bob.id,
			postId: postAlice.id,
		},
	});

	await prisma.postLike.create({
		data: {
			authorId: charlie.id,
			postId: postAlice.id,
		},
	});

	await prisma.commentLike.create({
		data: {
			authorId: alice.id,
			commentId: commentBob.id,
		},
	});

	await prisma.petLike.create({
		data: {
			authorId: alice.id,
			petId: rocky.id,
		},
	});

	// ==================== FRIENDSHIP ====================

	await prisma.friendship.create({
		data: {
			requesterId: alice.id,
			receiverId: bob.id,
			status: "ACCEPTED",
		},
	});

	console.log("Seed completed!");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});