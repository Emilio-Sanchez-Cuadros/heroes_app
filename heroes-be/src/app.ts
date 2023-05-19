import Fastify, { FastifyReply, FastifyRequest } from "fastify";
export const fastify = Fastify();
import { heroSchemas } from "./modules/hero/hero.schema";
import userRoutes from "./modules/hero/hero.routes";
import fjwt from "@fastify/jwt";
import cors from '@fastify/cors'

// TODO. Check why this is not working properly
declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
};

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            email: string;
            id: number;
            name: string;
        };
    }
}

fastify.get('/servercheck', async function () {
    return { status: "Ok" };
});

fastify.register(fjwt, {
    secret: 'very_secret'
});

fastify.decorate('auth', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }
})

const start = async () => {

    for (const schema of [...heroSchemas ]) {
        fastify.addSchema(schema);
    }

    fastify.register(userRoutes, { prefix: 'api/heroes'});
    fastify.register(cors, { 
        origin:'*',
        methods:['POST', 'GET', 'PUT', 'DELETE'],      
    })

    try {
      await fastify.listen({ port: 3000, host: '0.0.0.0'  })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  start()