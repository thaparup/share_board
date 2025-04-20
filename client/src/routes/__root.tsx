import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="flex justify-between px-8 py-2">
                <h1 className='bungee-spice-regular text-2xl '>SHARE BOARD</h1>
                <div className='flex gap-3'>
                    <Link to='/login' className='font-bold'>Login</Link>
                    <Link to='/signup' className='font-bold'>Signup</Link>
                </div>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})