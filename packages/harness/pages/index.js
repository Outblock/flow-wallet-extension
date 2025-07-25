import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Create a component that only renders on client side
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return children
}

// Dynamic import for the actual component
const FlowHarness = dynamic(() => import('../components/FlowHarness'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

export default function Home() {
  return (
    <ClientOnly>
      <FlowHarness />
    </ClientOnly>
  )
}