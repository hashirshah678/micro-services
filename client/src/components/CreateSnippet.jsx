import React from 'react'
import axios from 'axios'
import CreateComment from './CreateComment'
// import { log } from 'console'

export const CreateSnippet = () => {

    const [title, setTitle] = React.useState('')
    const [snippetCode, setSnippetCode] = React.useState('')
    const [snippets, setSnippets] = React.useState({})

    console.log('snippets:', snippets);


    const createSnippet = async (e) => {
        e.preventDefault()
        if (!title || !snippetCode) {
            console.log('Please fill in all fields')
            return;
        }
        try {
            const resp = await axios.post('http://localhost:8000/api/v1/snippet', {
                title,
                snippetCode
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            console.log('Snippet created:', resp.data)
            setTitle('')
            setSnippetCode('')

            if (resp.data.success) {
                // setSnippets((prevSnippets) => [...prevSnippets, resp.data.snippet])
                setSnippets((prevSnippets) => {
                    return {
                        ...prevSnippets,
                        [resp.data.snippet._id]: resp.data.snippet
                    }
                })
                console.log('Snippet created successfully');

            }
        } catch (error) {
            console.error('Error creating snippet:', error)

        }
    }


    React.useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const resp = await axios.get('http://localhost:8002/snippets')
                console.log('Fetched snippets:', resp.data)
                if (resp.data.success) {
                    setSnippets(resp.data.snippets)
                    // log('Snippets fetched successfully')
                    console.log('snippets:', resp.data.snippets);

                } else {
                    console.log('Failed to fetch snippets');
                }
            } catch (error) {
                console.error('Error fetching snippets:', error)
            }
        }

        fetchSnippets()
    }, [])


    return (
        <div className='flex flex-col  w-full h-screen'>
            <form onSubmit={createSnippet} action="" method="post" className='w-full flex flex-col p-4'>
                <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'
                    className='border border-gray-300 p-2 rounded-md mb-4'
                />
                <textarea
                    value={snippetCode}
                    onChange={(e) => setSnippetCode(e.target.value)}
                    rows={10}
                    className='border border-gray-300 p-2 rounded-md mb-4'
                    placeholder='write a code snippers...'
                />
                <button className='w-fit bg-black  px-4 py-2 text-white rounded-md cursor-pointer' >ADD</button>
            </form>


            {
                Object.values(snippets).length > 0 ? (
                    <div className='flex flex-col w-full h-full'>
                        <h1 className='text-2xl font-bold mb-3'>Snippets</h1>
                        <div className='flex flex-col w-full h-full'>
                            {
                                Object.keys(snippets)?.map((snippet, index) => {
                                    return (
                                        <div key={index} className='border  border-black p-4 rounded-md mb-4'>
                                            <h2 className='text-xl mb-2  font-bold'>{snippets[snippet].title}</h2>
                                            <CreateComment id={snippets[snippet].id} Comments={snippets[snippet].comments} />   
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <p>No snippets available</p>
                )
            }
        </div>
    )
}
