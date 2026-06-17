import React from 'react';

const About = () => {
  const values = [
    {
      icon: "✨",
      title: "Integrity First",
      description: "We believe transparency is the foundation of every great property journey. No hidden loops, just clear data."
    },
    {
      icon: "🚀",
      title: "Next-Gen Tech",
      description: "From predictive smart matching to virtual closing structures, we build tools that push real estate forward."
    },
    {
      icon: "🤝",
      title: "Human Centered",
      description: "Behind every listing is a person, a family, or a business. We place human connection at the core of our platform."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-16 sm:px-6 lg:px-8">
        <div className="bg-blue-700 rounded-3xl overflow-hidden shadow-xl lg:flex relative min-h-[450px]">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          {/* Left Side: Content */}
          <div className="relative z-10 lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-200 mb-3">Our Journey</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none mb-6">
              Redefining the way the world finds home.
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-light max-w-md">
              Founded with a simple vision, Acme Inc has grown from a local listing directory into the world's most trusted real estate infrastructure network.
            </p>
          </div>

          {/* Right Side: Image */}
          <div 
            className="lg:w-1/2 bg-cover bg-center min-h-[250px] lg:min-h-full relative"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-blue-700/50 via-transparent to-black/10"></div>
          </div>
        </div>
      </div>

      {/* 2. OUR STORY & TEXT CONTENT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20">
        <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Who We Are</h2>
          <p>
            At <strong className="font-semibold text-blue-600">Acme Inc</strong>, we believe that finding a property shouldn’t be a stressful web of disconnected portals and confusing metrics. Established in 2024, our team set out to engineer a streamlined ecosystem that puts absolute clarity, security, and velocity back into the hands of real people.
          </p>
          <p>
            Today, we manage a highly verified registry of premium residential developments, local brokerages, and commercial real estate. By matching high-resolution data parameters with a beautiful, minimal user interface, we empower millions worldwide to settle into spaces they love.
          </p>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            The values that drive us
          </h2>
          <p className="text-sm text-gray-500 mt-2">The standards we live by every single day.</p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-blue-50 text-2xl rounded-xl flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default About;