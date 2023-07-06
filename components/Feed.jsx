'use client'

import React, { useEffect, useState } from 'react'
import PromptCartList from './PromptCartList';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    // console.log(data);
    setPosts(data)
  }

  const handleSeachChange = (e) => {
    setSearchText(e.target.value);
  }

  return (
    <section className='feed'>

      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='search for a tag or userName'
          value={searchText}
          onChange={handleSeachChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCartList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed