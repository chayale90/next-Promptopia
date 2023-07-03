import Feed from '@components/Feed'
import React from 'react'




const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br />
        <span className='orange_gradient text-center'>AI-Powered prompts</span>
      </h1>

      <p className='desc text-center'>
        promptopia is an open-source AI prompting tool for modern world to descover, create and share creative prompts
      </p>

      <Feed/>
    </section>
  )
}

export default Home