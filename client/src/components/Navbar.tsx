import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "./ui/menubar";
import { CheckCircle, LogOut } from "lucide-react";
import { useMutationLogout } from "../Api-Client/auth";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigation = useNavigate();
    const { isAuthenticated, user, logout } = useAuthStore();
    const logoutMutation = useMutationLogout();

    const getUserInitials = () => {
        if (!user || !user.name) return "U";
        const names = user.name.split(" ");
        return names.length > 1
            ? `${names[0][0]}${names[1][0]}`
            : names[0].substring(0, 2);
    };

    return (
        <nav className=" border-b-[1px] border-gray-700 sticky">

            <div
                className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between max-[400px]:justify-center max-[400px]:flex-col max-[400px]:gap-1"
            >
                <div className="flex items-center space-x-2 ">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">ShareBoard</span>
                </div>
                {!isAuthenticated ? (
                    <div className="flex gap-3 items-center">
                        <Link
                            to="/login"
                            className="hover:text-amber-500 transition-colors duration-300 font-semibold"
                        >
                            Login
                        </Link>
                        <Link to="/signup" className="hover:text-amber-500 font-semibold">
                            Signup
                        </Link>
                    </div>
                ) : (
                    <Menubar className="border-none shadow-none p-0 ">
                        <MenubarMenu>
                            <MenubarTrigger className="p-0 hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent">
                                <Avatar className="cursor-pointer border-2 border-amber-400/59">
                                    <AvatarImage
                                        src={user?.avatarImage || "https://i.pravatar.cc/350"}
                                        alt={user?.name || "User profile"}
                                    />
                                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                </Avatar>
                            </MenubarTrigger>
                            <MenubarContent align="end" className="w-56 bg-gray-900">
                                <div className="p-2">
                                    <p className="font-medium">{user?.name || "User"}</p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user?.email || ""}
                                    </p>
                                </div>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <Link to="/" className="flex items-center w-full">
                                        Profile Settings
                                    </Link>
                                </MenubarItem>
                                <MenubarItem>
                                    <Link to="/dashboard" className="flex items-center w-full">
                                        Dashboard
                                    </Link>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem
                                    variant="destructive"
                                    onClick={() => {
                                        logoutMutation.mutate(undefined, {
                                            onSuccess() {
                                                toast.success("Log out");
                                                navigation({ to: "/login" });
                                                logout();
                                            },
                                        });
                                    }}
                                    className="cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                )}
            </div>
        </nav>

    );
};

export default Navbar;
