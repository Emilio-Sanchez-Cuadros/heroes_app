import { FastifyReply, FastifyRequest } from "fastify";
import { createHero, updateHero, deleteHero, findHeroes, findHeroById, findHeroByName } from "./hero.service";
import { CreateHeroData, UpdateHeroData } from './hero.schema';
import { verifyPassword } from "../../utils/hash";
import { fastify } from "../../app";

export async function registerHeroHandler(req: FastifyRequest<{ Body: CreateHeroData}>, reply: FastifyReply) {
    const body = req.body;
    try {
        const hero = await createHero(body);
        return hero;
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }

}

export async function updateHeroHandler(req: FastifyRequest<{ Body: UpdateHeroData, Params: { id: number }}>, reply: FastifyReply) {
    const body = req.body;
    const { id } = req.params;
    try {
        const hero = await updateHero(body, id);
        return hero;
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }

}

export async function findHeroByNameHandler(req: FastifyRequest<{Params: { name: string }}>) {
    const { name } = req.params;
    const hero = await findHeroByName(name);

    return hero;
}

export async function deleteHeroHandler(req: FastifyRequest<{Params: { id: number }}>, reply: FastifyReply) {
    const { id } = req.params;
    try {
        const hero = await deleteHero(id);
        return reply.code(201).send({'Hero deleted successfully': hero.id})
        
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e)
    }
}

export async function getHeroesHandler(req: FastifyRequest, reply: FastifyReply) {
    const heroes = await findHeroes();

    return heroes;
}

export async function getHeroByIdHandler(req: FastifyRequest<{Params: { id: number }}>, reply: FastifyReply) {
    const { id } = req.params;
    try {
        const hero = await findHeroById(id);
        return hero;
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}