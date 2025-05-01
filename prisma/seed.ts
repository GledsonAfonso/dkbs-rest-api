import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const prisma = new PrismaClient();
  
  console.log("Seeding data...");
  
  // Users
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: "Alice",
      email: "alice@email.com",
      role: "Admin",
    },
  });

  // Topics
  const topic1 = await prisma.topic.upsert({
    where: {
      topicId: {
        id: 1,
        version: 1,
      },
    },
    update: {},
    create: {
      name: "topic-1",
      content: "content-1",
      version: 1,
    }
  });

  const topic2 = await prisma.topic.upsert({
    where: {
      topicId: {
        id: 2,
        version: 1,
      },
    },
    update: {},
    create: {
      name: "topic-2",
      content: "content-2",
      version: 1,
      parentTopicId: topic1.id,
      parentTopicVersion: topic1.version,
    }
  });

  const topic3 = await prisma.topic.upsert({
    where: {
      topicId: {
        id: 3,
        version: 1,
      },
    },
    update: {},
    create: {
      name: "topic-3",
      content: "content-3",
      version: 1,
      parentTopicId: topic1.id,
      parentTopicVersion: topic1.version,
    }
  });

  const topic4 = await prisma.topic.upsert({
    where: {
      topicId: {
        id: 4,
        version: 1,
      },
    },
    update: {},
    create: {
      name: "topic-4",
      content: "content-4",
      version: 1,
      parentTopicId: topic2.id,
      parentTopicVersion: topic2.version,
    }
  });

  // Resources
  await prisma.resource.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      description: "resource-1",
      url: "http://resource-1.com",
      type: "pdf",
      topicId: topic1.id,
      topicVersion: topic1.version,
    }
  });

  await prisma.resource.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      description: "resource-2",
      url: "http://resource-2.com",
      type: "video",
      topicId: topic2.id,
      topicVersion: topic2.version,
    }
  });

  await prisma.resource.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      description: "resource-3",
      url: "http://resource-3.com",
      type: "article",
      topicId: topic3.id,
      topicVersion: topic3.version,
    }
  });

  await prisma.resource.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      description: "resource-4",
      url: "http://resource-4.com",
      type: "link",
      topicId: topic4.id,
      topicVersion: topic4.version,
    }
  });
  
  console.log("Finished seeding.");
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (error) => {
  console.error(error);

  await prisma.$disconnect();
  process.exit(1);
});
