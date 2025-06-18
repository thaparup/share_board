import React from 'react';

const HeroSection = () => {
    return (
        <section className="flex flex-col lg:flex-row justify-center items-center py-16 px-4 md:px-8 lg:px-10 bg-gray-50 text-gray-800 min-h-[60vh]">
            {/* Hero Content */}
            <div className="flex-1 max-w-xl lg:mr-12 text-center lg:text-left mb-10 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 text-gray-900">
                    Organize Your Work, Empower Your Team.
                </h1>
                <p className="text-lg sm:text-xl mb-8 leading-relaxed text-gray-600">
                    Streamline your projects, collaborate seamlessly, and achieve your goals
                    with our intuitive task management platform.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Get Started Free
                    </button>
                    <button className="px-8 py-3 bg-transparent text-blue-600 border-2 border-blue-600 font-semibold rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Hero Image / Illustration */}
            <div className="flex-1 flex justify-center items-center max-w-xl">
                <div className="w-full relative pb-[60%] bg-gray-200 rounded-xl shadow-lg flex justify-center items-center text-gray-600 text-xl font-medium">
                    {/*
            Replace this placeholder div with your actual image:
            <img src="/path/to/your-product-screenshot.png" alt="Product Screenshot" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
          */}
                    <p>Product Screenshot/Illustration</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;