import React from 'react'
import { useGetAllPostsQuery } from '../../services/PostsApi'

function Posts() {
  var {isLoading,data}=useGetAllPostsQuery()
  return (
    <div>
      <h1>Posts</h1>
      {
        !isLoading && data?.map((po)=>{
          return <li>{po.title}</li>
        })
      }
    </div>
  )
}

export default Posts