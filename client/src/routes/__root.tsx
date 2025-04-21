
import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthStoreType } from '../store/auth.store'

// import type { AuthContext } from '../AuthContext'

interface MyRouterContext {
    auth: AuthStoreType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
        </>
    ),
})


{/* <div className="flex justify-between px-8 py-2">
<h1 className='bungee-spice-regular text-2xl '>SHARE BOARD</h1>
<div className='flex gap-3'>
    <Link to='/login' className='font-bold'>Login</Link>
    <Link to='/signup' className='font-bold'>Signup</Link>
</div>
</div>
<hr /> */}