import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle, Users, BarChart3, Clock, Zap, } from 'lucide-react';

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {


    return (
        <div className="">


            {/* Hero Section */}

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8">
                            <span className="bg-gradient-to-r from-amber-500 via-pink-300 to-orange-500 bg-clip-text text-transparent">
                                Organize Your Work,
                            </span>
                            <br />
                            <span className="text-white">Empower Your Team</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Transform chaos into clarity with our intuitive task management platform.
                            Collaborate seamlessly, track progress effortlessly, and achieve more together.
                        </p>

                    </div>

                    {/* Hero Visual */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* To Do Column */}
                                <div className="bg-gray-800 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-yellow-400" />
                                        To Do
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="bg-gray-700 p-3 rounded-lg shadow-sm border-l-4 border-yellow-400">
                                            <p className="text-sm font-medium text-white">Design new landing page</p>
                                            <p className="text-xs text-gray-400 mt-1">Due: Tomorrow</p>
                                        </div>
                                        <div className="bg-gray-700 p-3 rounded-lg shadow-sm border-l-4 border-red-500">
                                            <p className="text-sm font-medium text-white">Review user feedback</p>
                                            <p className="text-xs text-gray-400 mt-1">High priority</p>
                                        </div>
                                    </div>
                                </div>

                                {/* In Progress Column */}
                                <div className="bg-gray-800 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-blue-400" />
                                        In Progress
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="bg-gray-700 p-3 rounded-lg shadow-sm border-l-4 border-blue-400">
                                            <p className="text-sm font-medium text-white">Mobile app development</p>
                                            <div className="flex items-center mt-2">
                                                <div className="w-full bg-gray-600 rounded-full h-2">
                                                    <div className="bg-blue-400 h-2 rounded-full w-3/4"></div>
                                                </div>
                                                <span className="text-xs text-gray-400 ml-2">75%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Done Column */}
                                <div className="bg-gray-800 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Done
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="bg-gray-700 p-3 rounded-lg shadow-sm border-l-4 border-green-400">
                                            <p className="text-sm font-medium text-white">User research completed</p>
                                            <p className="text-xs text-gray-400 mt-1">Completed today</p>
                                        </div>
                                        <div className="bg-gray-700 p-3 rounded-lg shadow-sm border-l-4 border-green-400">
                                            <p className="text-sm font-medium text-white">Brand guidelines</p>
                                            <p className="text-xs text-gray-400 mt-1">Completed yesterday</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-amber-600 to-pink-600 rounded-full opacity-30 blur-xl animate-pulse"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full opacity-30 blur-xl animate-pulse delay-1000"></div>
                    </div>
                </div>
            </section>

            {/* Features Section - Dark Theme */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Everything You Need to
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Succeed</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Powerful features designed to streamline your workflow and boost team productivity
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="w-8 h-8 text-blue-400" />,
                                title: "Team Collaboration",
                                description: "Work together seamlessly with real-time updates, comments, and file sharing across all your projects."
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8 text-green-400" />,
                                title: "Progress Tracking",
                                description: "Visualize your progress with interactive charts, reports, and analytics to keep projects on track."
                            },
                            {
                                icon: <Clock className="w-8 h-8 text-purple-400" />,
                                title: "Time Management",
                                description: "Set deadlines, track time, and get automated reminders to ensure nothing falls through the cracks."
                            },

                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-700"
                            >
                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">ShareBoard</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Empowering teams worldwide to achieve more through better organization and collaboration.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                    <span className="text-sm">𝕏</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                    <span className="text-sm">in</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                    <span className="text-sm">fb</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tasks</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Workspaces</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 ShareBoard. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 sm:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}