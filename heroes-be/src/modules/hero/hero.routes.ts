import { FastifyInstance } from "fastify";
import { registerHeroHandler, updateHeroHandler, deleteHeroHandler, getHeroesHandler, getHeroByIdHandler, findHeroByNameHandler } from './hero.controller'
import { $ref } from "./hero.schema";

async function heroRoutes(server: FastifyInstance) {

    // Create hero
    server.post('/', {
        schema: {
            body: $ref("createHeroSchema"),
            response: {
                201: $ref('createHeroResponseSchema')
            }
        }
    }, registerHeroHandler);

    // Update hero
    server.put('/:id', {
        schema: {
            body: $ref("updateHeroSchema"),
            response: {
                200: $ref('updateHeroResponseSchema')
            }
        }
    }, updateHeroHandler);

    // Delete hero
    server.delete('/:id', {
    }, deleteHeroHandler);

    // Get heroes list
    server.get('/', {
    }, getHeroesHandler);

    // Get hero by id
    server.get('/:id', {
        preHandler: server.authenticate
    }, getHeroByIdHandler);

    // Search hero by name
    server.get('/search/:name', {
    }, findHeroByNameHandler);
    
}

export default heroRoutes;