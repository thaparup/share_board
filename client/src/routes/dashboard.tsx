import { createFileRoute, redirect } from '@tanstack/react-router'


export const Route = createFileRoute('/dashboard')({

    beforeLoad: async ({ context }) => {
        console.log(context.auth.user)
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',

            })
        }

    },

    component: RouteComponent,
});

function RouteComponent() {



    return <div>Hello "/dashboard"!</div>;
}
