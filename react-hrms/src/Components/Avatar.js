import React from 'react'

function Avatar({ url = 'animal-cat.png', classes = 'h-8 w-8', alt='image' }) {
    return (
        <img
            className={"rounded-full " + classes}
            src={"/avatars/" + url}
            alt={alt}
        />
    )
}

export default Avatar