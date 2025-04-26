
import { Link, useNavigate } from '@tanstack/react-router'
import {
    LayoutDashboard,
    Folder,
    CheckSquare,
    LogOut,
} from 'lucide-react'
import { useAuthStore } from '../store/auth.store'
import { useMutationLogout } from '../Api-Client/auth'
import toast from 'react-hot-toast'

const Sidebar = () => {

    const { user, logout } = useAuthStore()
    const logoutMutation = useMutationLogout()
    const navigation = useNavigate()
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/dashboard' },
        { name: 'Workspaces', icon: <Folder size={18} />, to: '/workspaces' },
        { name: 'Manage Tasks', icon: <CheckSquare size={18} />, to: '/tasks' },
        { name: 'Logout', icon: <LogOut size={18} />, to: '/logout' },
    ]
    return (
        <aside className="w-64  shadow-lg px-6 flex flex-col items-center border-[1px] border-slate-700/80 rounded-t-md">
            <div className="flex flex-col items-center gap-2 mt-8">
                <img
                    src={user?.avatarImage || "https://i.pravatar.cc/75"}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full border-2 border-gray-300"
                />
                <h6 className="text-lg font-semibold text-gray-200/90">{user?.name}</h6>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <nav className="mt-10 w-full">
                <ul className="flex flex-col gap-3">
                    {menuItems.map(({ name, icon, to }) => (
                        <li key={name}>
                            <Link
                                to={to}

                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-100 text-gray-300/80 hover:text-amber-600 transition-colors font-medium"
                            >
                                <span className="text-amber-600">{icon}</span>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
