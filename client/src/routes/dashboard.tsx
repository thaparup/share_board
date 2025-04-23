import { createFileRoute, redirect } from '@tanstack/react-router'
import Body from '../components/Body';


export const Route = createFileRoute('/dashboard')({

    beforeLoad: async ({ context }) => {
        console.log(context.auth.user)
        // if (!context.auth.isAuthenticated) {
        //     throw redirect({
        //         to: '/login',

        //     })
        // }
        if (context.auth.user === null && !context.auth.isAuthenticated) {
            // Still unauthenticated after fetchUser: redirect
            throw redirect({ to: '/login' });
        }
    },

    component: RouteComponent,
});

function RouteComponent() {



    return <Body>
        <h1>
            dashboard content
        </h1>
    </Body>
}
