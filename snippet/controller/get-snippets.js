import { snippets } from "../database/index.js";


export const fetchSnippet = async (_, res) => {
    try {
        const snippetData = snippets;

        if (!snippetData) {
            return res.status(404).json({ message: 'Snippet not found' });
        }

        res.status(200).json({
            message: 'Snippet fetched successfully',
            success: true,
            snippets: snippetData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}