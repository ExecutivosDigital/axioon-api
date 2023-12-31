import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticateSubUserController } from "./authenticateSubUser";
import { createSubUserController } from "./createSubUser";
import { subUserListController } from "./subUserList";

export async function subUserRoutes(app: FastifyInstance) {
	app.post("/sub-user/authenticate", authenticateSubUserController);
	app.get("/sub-user", { onRequest: [verifyJwt] }, subUserListController);
	app.put("/sub-user/:id", { onRequest: [verifyJwt] }, subUserListController);
	app.post("/sub-user", { onRequest: [verifyJwt] }, createSubUserController);
}
