import { faker } from "@faker-js/faker";
import { prisma } from "../lib/db.js";
import { electionFactoryService } from "../services/electionService.js";

async function createUser(username, password) {
  try {
    await prisma.user.delete({
      where: {
        username,
      },
    });
  } catch (e) {
  } finally {
    return await prisma.user.create({
      data: {
        password,
        username,
      },
    });
  }
}

async function createRandomElection(userId) {
  const name = faker.lorem.words();
  const description = faker.lorem.sentence();
  const votingTime = faker.datatype.number(Math.random > 0.7 ? { min: 30, max: 200 } : { min: 3600, max: 864000 });
  const candidateCount = faker.datatype.number({ min: 2, max: 10 });
  const candidateNames = Array.from(
    { length: candidateCount },
    () => faker.name.firstName() + " " + faker.name.lastName(),
  );

  try {
    const ballot = await electionFactoryService.createBallot(userId, name, description, votingTime, candidateNames);
    console.log(`Election created with ID ${ballot.id}`);
    return ballot.id;
  } catch (error) {
    console.error("Error creating election");
    return null;
  }
}

async function seedElections(userIds, electionCountPerUser) {
  const electionIds = [];

  for (const userId of userIds) {
    for (let i = 0; i < electionCountPerUser; i++) {
      const electionId = await createRandomElection(userId);
      if (electionId !== null) {
        electionIds.push(electionId);
      }
      await new Promise(resolve => setTimeout(() => resolve(1), 100));
    }
  }

  return electionIds;
}

async function voteInElection(electionId, userId, candidateIds) {
  // Determine if the user will vote in this election based on a 50% chance
  if (Math.random() > 0.7) {
    // Randomly select a candidate to vote for
    const candidateId = candidateIds[faker.datatype.number({ min: 0, max: candidateIds.length - 1 })];
    try {
      // Vote for the selected candidate
      const voted = await electionFactoryService.voteForCandidate(electionId, candidateId, userId);
      console.log(`User ${userId} voted in election ${electionId} for candidate ${candidateId}`);
    } catch (error) {
      console.error(`Error voting in election ${electionId}`);
    }
  }
}

export async function seed(userCount, electionCount) {
  const userPromises = Array.from({ length: userCount }, async (_, index) => {
    const username = `user${index}`;
    const password = "12345678";
    try {
      const user = await createUser(username, password);
      console.log("Created user: ", user.username);
      return user.id;
    } catch (error) {
      console.error(`Error creating user ${username}:`, error);
      return null;
    }
  });

  const userIds = await Promise.all(userPromises);
  const validUserIds = userIds.filter(userId => userId !== null);

  const electionIds = await seedElections(validUserIds, electionCount);
  console.log("All elections seeded:", electionIds);

  // Vote in each seeded election
  for (const electionId of electionIds) {
    const electionInfo = await electionFactoryService.getBallotInfoById(electionId);
    for (const userId of validUserIds) {
      await voteInElection(
        electionId,
        userId,
        electionInfo.candidates.map(el => el.id),
      );
      await new Promise(resolve => setTimeout(() => resolve(1), 100));
    }
  }
}
