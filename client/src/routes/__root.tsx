

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthStoreType } from '../types/auth.types'
import Navbar from '../components/Navbar'


interface MyRouterContext {
    auth: AuthStoreType
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <div className="h-screen flex flex-col">

            <header className="h-[6vh] shrink-0 ">
                <Navbar />
            </header>


            <main className="h-[94vh] ">
                <Outlet />
            </main>

            <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
        </div>
    ),
})
