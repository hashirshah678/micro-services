import { comments as commentDB } from "../database/index.js"


export const getAllCommentsBySinppetId = async (req, res) => {
    const { id: snippetId } = req.params

    try {
        const allComments = commentDB[snippetId] || []

       return res.status(200).json({ comments: allComments, success: true, message: "Comments fetched successfully" })
    } catch (error) {
        console.error('Error fetching comments:', error)
       return res.status(500).json({ message: 'Internal server error', success: false })
    }
}