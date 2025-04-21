import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { useAuthStore } from './store/auth.store'


const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
})


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const queryClient = new QueryClient()

function InnerApp() {
  const auth = useAuthStore()
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    auth.fetchUser().finally(() => {
      setReady(true)
    })
  }, [])

  if (!ready) return <div>Loading...</div>

  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return <InnerApp />
}


const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </StrictMode>,
  )
}
