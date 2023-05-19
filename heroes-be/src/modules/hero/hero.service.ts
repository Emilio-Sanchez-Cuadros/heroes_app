import prisma from '../../utils/prisma';
import { CreateHeroData, UpdateHeroData } from './hero.schema';

export async function createHero(params: CreateHeroData) {
    const { ...rest } = params;
    const hero = await prisma.hero.create({
        data: { ...rest },
    });

    return hero;
}

export async function findHeroByName(name: string) {
    const ids: number[] = await prisma.$queryRaw`
    SELECT id FROM "Hero"
    WHERE "name" LIKE '${name}'
    ;`;

    return prisma.hero.findMany({
        where: { id: { in: ids.map((row: any) => row.id) } },
    })
}

export async function updateHero(params: UpdateHeroData, id: number) {
    const { ...rest } = params;
    return prisma.hero.update({
        where: { id: Number(id) },
        data: { ...rest  }
    })
}

export async function deleteHero(id: number) {
    return prisma.hero.delete({
        where: { id: Number(id) },
      });
}

export async function findHeroes() {
    return prisma.hero.findMany({
        select: {
            description: true,
            picture: true,
            name: true,
            id: true
        }
    });
}

export async function findHeroById(id: number) {
    return prisma.hero.findUnique({
        where: { id: Number(id) },
      });
}