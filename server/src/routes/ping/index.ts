import { FastifyPluginAsync } from "fastify";

const ping: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return { message: "pong" };
  });
};

export default ping; 