import axios from 'axios'
import React from 'react'

const CreateComment = ({ id }) => {

    const [comment, setComment] = React.useState('')

    const [comments, setComments] = React.useState([])

    
    React.useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const resp = await axios.get(`http://localhost:8001/api/v1/snippet/${id}/comment`)
                console.log('Fetched Comment:', resp.data)
                if (resp.data.success) {
                    setComments(resp.data.comments)
                    // log('Snippets fetched successfully')
                    console.log('snippets:', resp.data.comments);

                } else {
                    console.log('Failed to fetch Comments to this snippet', id);
                }
            } catch (error) {
                console.error('Error fetching messages:', error)
            }
        }

        fetchSnippets()
    }, [])



    const createComment = async (e) => {
        e.preventDefault()
        if (!comment) {
            console.log('Please fill in all fields')
            return;
        }
        try {
            const resp = await axios.post(`http://localhost:8001/api/v1/snippet/${id}/comment`, {
                text: comment
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            console.log('Comment created:', resp.data)
            setComment('')

            if (resp.data.success) {
                // setSnippets((prevSnippets) => [...prevSnippets, resp.data.snippet])
                console.log('Comment created:', resp.data);
                
                setComments(prevCommments => [...prevCommments, resp.data.comment])
                console.log('Comment created successfully');
            } else {
                console.log('Comment creation failed');
            }
        } catch (error) {
            console.error('Error creating comment:', error)
        }
    }

    return (
        <div className="">

            {
                comments.length > 0 && comments.map((comment) => (
                    <div key={comment._id} className='border p-2 my-2 rounded-md'>
                        <p>{comment.text}</p>
                        <p className='text-sm text-gray-500'>{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))
            }

            <form className='flex gap-2' onSubmit={createComment}>

                <input
                    type='text'
                    placeholder='Comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='border rounded p-2  py-1'
                />

                <button className='bg-black w-fit  text-white px-2 py-1 rounded-md cursor-pointer'>Add Comment</button>
            </form>
        </div>
    )
}

export default CreateComment