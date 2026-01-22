import React, { useEffect } from 'react'

const Loading = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-gray-50">
      <div className="flex flex-col items-center">
        {/* Jewelry Ring Animation */}
        <div className="relative w-32 h-32 mb-8">
          {/* Rotating Ring */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Ring Band */}
              <ellipse cx="50" cy="50" rx="35" ry="10"
                stroke="url(#goldGradient)"
                strokeWidth="4"
                fill="none"
                className="drop-shadow-lg"
              />

              {/* Diamond/Gem */}
              <g transform="translate(50, 30)">
                <polygon
                  points="0,-15 -8,-5 -5,5 5,5 8,-5"
                  fill="url(#diamondGradient)"
                  stroke="#d97706"
                  strokeWidth="1"
                  className="animate-pulse"
                />
                {/* Diamond Sparkles */}
                <circle cx="0" cy="-8" r="2" fill="white" className="animate-ping" opacity="0.8" />
                <circle cx="-5" cy="-5" r="1.5" fill="white" className="animate-ping" opacity="0.6" style={{ animationDelay: '0.2s' }} />
                <circle cx="5" cy="-5" r="1.5" fill="white" className="animate-ping" opacity="0.6" style={{ animationDelay: '0.4s' }} />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="50%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#fcd34d" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Glowing Effect */}
          <div className="absolute inset-0 animate-pulse">
            <div className="w-full h-full rounded-full bg-amber-400/20 blur-2xl"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="font-serif text-2xl font-bold text-gray-900 mb-2">
            RedBuddha Jwells
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Crafting your experience</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotateX(60deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(60deg) rotateZ(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Loading