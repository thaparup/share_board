import React from 'react'
import Sidebar from './Sidebar'

type Props = {
    children: React.ReactNode
}

const Body = ({ children }: Props) => {
    return (

        <main className="h-full">
            <div className="flex gap-4 h-full">
                <Sidebar />
                <div className="w-full overflow-y-auto">{children}</div>
            </div>
        </main>

    )
}

export default Body;
