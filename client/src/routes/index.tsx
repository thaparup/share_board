import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h3 className='text-red-400'>Welcome Home! hello world</h3>
        </div>
    )
}