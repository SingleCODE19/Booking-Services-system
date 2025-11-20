import React from 'react';
import { Clock, Trophy, Star } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">About Us</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            With over two decades of experience in marble polishing and restoration, we've built our reputation on excellence, reliability, and superior craftsmanship.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-[#0B101B] border border-slate-800 p-10 rounded-2xl text-center group hover:border-slate-600 transition-colors">
            <Clock className="mx-auto text-white mb-6" size={48} strokeWidth={1} />
            <h3 className="text-4xl font-bold text-white mb-2">25+</h3>
            <p className="text-white font-semibold mb-2">Years of Experience</p>
            <p className="text-gray-500 text-sm">Serving since 2001 with expertise in marble polishing</p>
          </div>

          <div className="bg-[#0B101B] border border-slate-800 p-10 rounded-2xl text-center group hover:border-slate-600 transition-colors">
            <Trophy className="mx-auto text-white mb-6" size={48} strokeWidth={1} />
            <h3 className="text-4xl font-bold text-white mb-2">1500+</h3>
            <p className="text-white font-semibold mb-2">Projects Completed</p>
            <p className="text-gray-500 text-sm">Successfully delivered premium polishing services</p>
          </div>

          <div className="bg-[#0B101B] border border-slate-800 p-10 rounded-2xl text-center group hover:border-slate-600 transition-colors">
            <Star className="mx-auto text-white mb-6" size={48} strokeWidth={1} />
            <h3 className="text-4xl font-bold text-white mb-2">98%</h3>
            <p className="text-white font-semibold mb-2">Client Satisfaction</p>
            <p className="text-gray-500 text-sm">Consistently maintaining high quality standards</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Journey</h3>
            <div className="text-gray-400 space-y-4 leading-relaxed">
              <p>
                Since our establishment in 2001, we've been at the forefront of the marble polishing industry. Our journey began with a simple mission: to provide exceptional stone restoration services that bring out the natural beauty of every surface we touch.
              </p>
              <p>
                Over the years, we've grown from a small local business to one of the most trusted names in marble polishing in Jaipur, serving both residential and commercial clients with the same dedication to quality and excellence.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Expertise</h3>
            <div className="text-gray-400 space-y-4 leading-relaxed">
              <p>
                With 25 years of hands-on experience, our team has developed unparalleled expertise in all aspects of marble and stone care. From traditional sada polish to advanced diamond polishing techniques, we understand the unique characteristics of every stone type and how to bring out its best qualities.
              </p>
              <p>
                Having successfully completed over 1500 projects, we've encountered and mastered every challenge in stone restoration, making us the go-to experts for both simple polishing jobs and complex restoration projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;