import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { envSchema } from '../src/config/env.schema';

import { profile } from './seed-data';

const logger = new Logger('Seed');

// Reuses the app's env schema so the seed fails on the same invalid values
// and parses SEED_FORCE="false" as false, not as a truthy string.
const env = envSchema
  .pick({ DATABASE_URL: true, PROFILE_SLUG: true, SEED_FORCE: true })
  .parse(process.env);

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
});

async function seed() {
  // One transaction for the check, delete and create, so a failed run
  // never leaves a half-filled profile behind.
  await prisma.$transaction(async (tx) => {
    const existing = await tx.profile.findUnique({
      where: { slug: env.PROFILE_SLUG },
      select: { id: true },
    });

    // The container runs the seed on every start, so an existing profile
    // is kept as is unless SEED_FORCE asks to recreate it.
    if (existing && !env.SEED_FORCE) {
      logger.log(`Profile "${env.PROFILE_SLUG}" already exists, skipped`);
      return;
    }

    // onDelete: Cascade removes the profile's links, skills, experience
    // and projects too, so the recreated profile starts from a clean slate.
    if (existing) {
      await tx.profile.delete({ where: { id: existing.id } });
      logger.log(`SEED_FORCE is set, recreating profile "${env.PROFILE_SLUG}"`);
    }

    const created = await tx.profile.create({
      data: {
        slug: env.PROFILE_SLUG,
        name: profile.name,
        headline: profile.headline,
        description: profile.description,
        location: profile.location,
        // Array order in seed-data is the display order; it is stored explicitly
        // because Postgres returns rows in no particular order without ORDER BY.
        links: {
          create: profile.links.map((link, index) => ({
            ...link,
            sortOrder: index,
          })),
        },
        skills: {
          create: profile.skills.map((skill, index) => ({
            ...skill,
            sortOrder: index,
          })),
        },
        experience: {
          create: profile.experience.map((item) => ({
            company: item.company,
            position: item.position,
            // Date-only ISO strings are parsed as UTC midnight, so the @db.Date
            // column gets the same calendar day in any server time zone.
            startDate: new Date(item.startDate),
            endDate: item.endDate ? new Date(item.endDate) : null,
            achievements: item.achievements,
          })),
        },
      },
      select: { id: true },
    });

    // Projects connect to skills by name, so they are created only after the
    // profile and its skills exist. An unknown skill name fails the connect
    // and rolls back the whole transaction instead of silently dropping it.
    for (const [index, project] of profile.projects.entries()) {
      await tx.project.create({
        data: {
          profileId: created.id,
          name: project.name,
          description: project.description,
          url: project.url,
          repositoryUrl: project.repositoryUrl,
          sortOrder: index,
          skills: {
            create: project.skills.map((skillName) => ({
              skill: {
                connect: {
                  profileId_name: { profileId: created.id, name: skillName },
                },
              },
            })),
          },
        },
      });
    }

    logger.log(`Profile "${env.PROFILE_SLUG}" seeded`);
  });
}

async function run() {
  try {
    await seed();
  } catch (error) {
    logger.error(error);
    // Not process.exit(1): it would kill the process before finally runs
    // and the connection pool is closed.
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void run();
