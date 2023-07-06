'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (session.user.id) fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await response.json()
        console.log(data);
        setPosts(data)
    }

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
///api/prompt/${promptId}
    const handleDelete = (post) => {

    }

    return (
        <Profile
            name="my"
            desc="Welcome to your personalied profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile