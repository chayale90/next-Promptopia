import React from 'react'
import PromptCart from './PromptCart'

const PromptCartList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post, index) => {
                return (
                    <PromptCart
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                )
            })}
        </div>
    )
}

export default PromptCartList