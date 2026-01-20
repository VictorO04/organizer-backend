import * as gamesModel from "../models/gamesModel.js";

const normalizeUrl = (url) => {
    return url ? `https:${url}` : null;
}

export const importGame = async (req, res) => {
    try {
        const { term } = req.body;

        if (!term || typeof term !== "string") {
            return res.status(400).json({
                message: "The search term is required and must be a string"
            });
        }

        const response = await fetch("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                "Client-ID": process.env.IGDB_CLIENT_ID,
                "Authorization": `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
                "Content-Type": "text/plain"
            },
            body: `
                search "${term}";
                fields id, name, slug, summary, first_release_date, cover.url, artworks.url;
                limit 1;
            `
        });

        if (!response.ok) {
            return res.status(502).json({
                message: "Error querying IGDB"
            });
        }

        const [game] = await response.json();

        if (!game) {
            return res.status(404).json({
                message: "Game not found"
            });
        }

        const exists = await gamesModel.findIgdbId(game.id);
        if (exists) {
            return res.status(409).json({
                message: "The game already exists in the database",
                data: exists
            });
        }

        const newGame = await gamesModel.createGame({
            igdb_id: game.id,
            name: game.name,
            slug: game.slug,
            summary: game.summary,
            release_date: game.first_release_date
                ? new Date(game.first_release_date * 1000)
                : null,
            cover_url: normalizeUrl(
                game.cover?.url?.replace("t_thumb", "t_cover_big")
            ),
            artwork_url: normalizeUrl(
                game.artworks?.[0]?.url?.replace("t_thumb", "t_1080p")
            )
        });

        res.status(201).json({
            message: "Game imported successfully.",
            data: newGame
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error importing game" 
        });
    }
}

const serverErrorMessage = (res, error) => {
    console.error(error);

    return res.status(500).json({
        mensagem: "Erro interno do servidor"
    });
}

export const getGames = async (req, res) => {
    try {
        const games = await gamesModel.findGames();

        res.status(200).json({
            total: games.length,
            message: games.length === 0
                ? "No games registered"
                : "Games found successfully",
            data: games
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}