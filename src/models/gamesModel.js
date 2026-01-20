import prisma from "../../lib/prisma.js";

export const findIgdbId = async (igdbID) => {
    return await prisma.games.findUnique({
        where: { igdb_id: igdbID }
    });
}

export const createGame = async (data) => {
    return await prisma.games.create({ data });
}