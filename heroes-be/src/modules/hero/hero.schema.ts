import {z} from 'zod';
import { buildJsonSchemas } from 'fastify-zod'

const heroCore = {
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name has to be a string'
    }),
    description: z.string(),
    picture: z.string()
}

const createHeroSchema = z.object({
    ...heroCore,
    name: z.string({
        invalid_type_error: 'Name has to be a string'
    })
});

const updateHeroSchema = z.object({
    name: z.string({
        invalid_type_error: 'Name has to be a string'
    }),
    description: z.string({
        invalid_type_error: 'Description has to be a string'
    })
});

const createHeroResponseSchema = z.object({
    id: z.number(),
    ...heroCore
});

const updateHeroResponseSchema = z.object({
    id: z.number(),
    ...heroCore
});

export type CreateHeroData = z.infer<typeof createHeroSchema>;
export type UpdateHeroData = z.infer<typeof updateHeroSchema>;

export const {schemas: heroSchemas, $ref } = buildJsonSchemas({
    createHeroSchema,
    updateHeroSchema,
    createHeroResponseSchema,
    updateHeroResponseSchema
}, { $id: "heroSchema" })