

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthStoreType } from '../types/auth.types'
import Navbar from '../components/Navbar'


// import type { AuthContext } from '../AuthContext'

interface MyRouterContext {
    auth: AuthStoreType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <Navbar />
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
        </>
    ),
})


