import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"

import './App.css'
import { useGetPostsQuery } from './store/services/api'

function App() {
  const [count, setCount] = useState(0)

  const { data, error, isLoading } = useGetPostsQuery()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching data</div>
  console.log("Data fetched:", data)
  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
export default App;
