import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSvgProps {
  width?: number;
  height?: number;
  className?: string;
}

interface ConfettiParticle {
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

const generateConfetti = () => {
  return Array.from({ length: 100 }, () => ({
    x: 405 + Math.random() * 225,
    y: 370,
    color: [
      '#3b82f6', '#4f46e5', '#facc15', '#10b981', 
      '#ec4899', '#8b5cf6', '#f97316', '#06b6d4'
    ][Math.floor(Math.random() * 8)],
    rotation: Math.random() * 360,
    scale: 0.3 + Math.random() * 0.7,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
    velocity: {
      x: -5 + Math.random() * 10,
      y: -15 - Math.random() * 10
    }
  }));
};

const AnimatedSvg: React.FC<AnimatedSvgProps> = ({ 
  width = 800, 
  height = 600,
  className = ''
}) => {
  const text1Ref = useRef<SVGTextElement>(null);
  const response1Ref = useRef<SVGTextElement>(null);
  const [showMockup, setShowMockup] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [typewriterProgress, setTypewriterProgress] = useState<number[]>([0, 0, 0, 0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const isTypewriterStarted = useRef(false);

  useEffect(() => {
    if (animationStep >= 1 && !isTypewriterComplete && !isTypewriterStarted.current) {
      isTypewriterStarted.current = true;
      const text = "✈️ Vacation Planner";
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setHeaderText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsTypewriterComplete(true);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [animationStep, isTypewriterComplete]);

  useEffect(() => {
    if (animationStep >= 5) {
      const totalAnimationDuration = 7000;
      setTimeout(() => {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 7000);
      }, totalAnimationDuration);
    }
  }, [animationStep]);

  useEffect(() => {
    if (text1Ref.current && response1Ref.current) {
      text1Ref.current.textContent = '';
      response1Ref.current.textContent = '';
      
      setTimeout(() => {
        let index = 0;
        const content = "I want to build an app to plan our vacation";
        const interval = setInterval(() => {
          if (index <= content.length) {
            if (text1Ref.current) {
              text1Ref.current.textContent = content.slice(0, index);
            }
            index++;
          } else {
            clearInterval(interval);
            
            setTimeout(() => {
              let responseIndex = 0;
              const response = "Sure! I can help you build that";
              const responseInterval = setInterval(() => {
                if (responseIndex <= response.length) {
                  if (response1Ref.current) {
                    response1Ref.current.textContent = response.slice(0, responseIndex);
                  }
                  responseIndex++;
                } else {
                  clearInterval(responseInterval);
                  
                  setTimeout(() => {
                    setShowMockup(true);
                    const stepInterval = setInterval(() => {
                      setAnimationStep(prev => {
                        if (prev < 5) return prev + 1;
                        clearInterval(stepInterval);
                        return prev;
                      });
                    }, 1000);
                  }, 1000);
                }
              }, 50);
            }, 1000);
          }
        }, 50);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (animationStep >= 5) {
      const items = [
        { icon: "🏨", text: "Hotel", price: "$800" },
        { icon: "✈️", text: "Flight", price: "$500" },
        { icon: "🚗", text: "Transport", price: "$200" },
        { icon: "🍽️", text: "Activities", price: "$300" }
      ];

      items.forEach((_, index) => {
        const delay = index * 500;
        setTimeout(() => {
          const interval = setInterval(() => {
            setTypewriterProgress(prev => {
              const newProgress = [...prev];
              if (newProgress[index] < items[index].text.length) {
                newProgress[index]++;
                return newProgress;
              } else {
                clearInterval(interval);
                return prev;
              }
            });
          }, 100);
        }, delay);
      });
    }
  }, [animationStep]);

  const handleDateHover = (day: number) => {
    setHoveredDate(day);
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 600"
      className={`${className} overflow-visible`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
        </linearGradient>
        <filter id="cellGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Monitor Frame */}
      <rect
        x="100"
        y="100"
        width="600"
        height="350"
        rx="10"
        fill="#1e1e1e"
        stroke="#2d2d2d"
        strokeWidth="4"
      />

      {/* Screen */}
      <rect
        x="120"
        y="120"
        width="560"
        height="310"
        rx="5"
        fill="#0a0a0a"
      />

      {/* Terminal Header */}
      <rect
        x="120"
        y="120"
        width="560"
        height="30"
        rx="5"
        fill="#1e1e1e"
      />
      
      {/* Terminal Buttons */}
      <circle cx="140" cy="135" r="5" fill="#ff5f57"/>
      <circle cx="160" cy="135" r="5" fill="#febc2e"/>
      <circle cx="180" cy="135" r="5" fill="#28c840"/>

      {/* Text Content */}
      <g transform="translate(140, 180)">
        <text
          ref={text1Ref}
          x="0"
          y="0"
          fill="#FACC15"
          className="font-mono text-sm"
        ></text>
        <text
          ref={response1Ref}
          x="0"
          y="25"
          fill="#A1A1AA" 
          className="font-mono text-sm"
        ></text>
      </g>

      {/* Mockup */}
      {showMockup && (
        <g>
          {/* App Container */}
          <rect 
            x="140" 
            y="170" 
            width="520" 
            height="240" 
            rx="8" 
            fill="#1e1e1e" 
            opacity={animationStep >= 0 ? 1 : 0}
          >
            <animate 
              attributeName="opacity" 
              from="0" 
              to="1" 
              dur="0.5s" 
              begin="0s" 
              fill="freeze"
            />
          </rect>

          {/* Header with typewriter effect */}
          {animationStep >= 1 && (
            <>
              <rect 
                x="140" 
                y="170" 
                width="520" 
                height="35" 
                rx="8" 
                fill="#2d2d2d"
              >
                <animate 
                  attributeName="opacity" 
                  from="0" 
                  to="1" 
                  dur="0.5s" 
                  fill="freeze"
                />
              </rect>
              <text 
                x="160" 
                y="192" 
                fill="#facc15" 
                fontSize="14" 
                fontWeight="bold"
              >
                {headerText}
                <animate 
                  attributeName="opacity" 
                  from="0" 
                  to="1" 
                  dur="0.3s" 
                  fill="freeze"
                />
              </text>
              {/* Cursor for header */}
            <text 
                x="160" 
                y="192" 
                fill="#facc15" 
                fontSize="14" 
                fontWeight="bold"
              >
                ✈️ Vacation Planner
              </text>
            </>
          )}

          {/* Calendar Section */}
          {animationStep >= 2 && (
            <g>
              <rect 
                x="155" 
                y="215" 
                width="220" 
                height="180" 
                rx="4" 
                fill="#2d2d2d"
              >
                <animate 
                  attributeName="opacity" 
                  from="0" 
                  to="1" 
                  dur="0.5s" 
                  fill="freeze"
                />
              </rect>
              <text 
                x="170" 
                y="235" 
                fill="#fff" 
                fontSize="12" 
                fontWeight="bold"
              >
                📅 July 2024
              </text>
            </g>
          )}

          {/* Calendar Grid */}
          {animationStep >= 3 && (
            <g pointerEvents="all">
              {Array.from({ length: 4 }, (_, row) =>
                Array.from({ length: 7 }, (_, col) => {
                  const day = row * 7 + col + 1;
                  const isSelected = day >= 15 && day <= 22;
                  const isHovered = hoveredDate === day;
                  const x = 170 + col * 28;
                  const y = 245 + row * 28;

                  return (
                    <g key={`${row}-${col}`}>
                      {/* Interactive area */}
                      <rect
                        x={x - 2}
                        y={y - 2}
                        width={26}
                        height={26}
                        fill="transparent"
                        onMouseEnter={() => handleDateHover(day)}
                        onMouseLeave={() => handleDateHover(-1)}
                        style={{ cursor: 'pointer' }}
                      />

                      {/* Hover effect */}
                      {isHovered && (
                        <rect
                          x={x - 1}
                          y={y - 1}
                          width={24}
                          height={24}
                          rx={3}
                          fill="url(#hoverGradient)"
                          filter="url(#cellGlow)"
                        >
                          <animate
                            attributeName="opacity"
                            from="0"
                            to="0.6"
                            dur="0.2s"
                            fill="freeze"
                          />
                        </rect>
                      )}

                      {/* Calendar cell */}
                      <rect
                        x={x}
                        y={y}
                        width={22}
                        height={22}
                        rx={2}
                        fill={isSelected ? '#3b82f6' : '#404040'}
                      >
                        <animate
                          attributeName="opacity"
                          from="0"
                          to="1"
                          dur="0.3s"
                          begin={`${0.05 * (row * 7 + col)}s`}
                          fill="freeze"
                        />
                          <animate
                            attributeName="fill"
                            to={isSelected ? '#4f46e5' : '#4b5563'}
                            dur="2s"
                            fill="freeze"
                          />
                        <animate
                  attributeName="opacity"
                  values="1;0.8;1"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
                        
                      </rect>

                      {/* Date text */}
                      <text
                        x={x + 11}
                        y={y + 15}
                        fill={isSelected || isHovered ? '#fff' : '#888'}
                        fontSize={10}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {day}
                      </text>
                    </g>
                  );
                })
              )}
            </g>
          )}

          {/* Details Panel */}
          {animationStep >= 4 && (
            <g>
              <rect 
                x="390" 
                y="215" 
                width="255" 
                height="180" 
                rx="4" 
                fill="#2d2d2d"
              >
                <animate 
                  attributeName="opacity" 
                  from="0" 
                  to="1" 
                  dur="0.5s" 
                  fill="freeze"
                />
              </rect>
              <text 
                x="405" 
                y="235" 
                fill="#fff" 
                fontSize="12" 
                fontWeight="bold"
              >
                💰 Trip Details
              </text>
            </g>
          )}

          {/* Trip Items */}
          {animationStep >= 5 && (
            <g>
              {[
                { icon: "🏨", text: "Hotel", price: "$800" },
                { icon: "✈️", text: "Flight", price: "$500" },
                { icon: "🚗", text: "Transport", price: "$200" },
                { icon: "🍽️", text: "Activities", price: "$300" }
              ].map((item, i) => (
                <g key={i}>
                  <rect
                    x="405"
                    y={250 + i * 30}
                    width="225"
                    height="25"
                    rx="4"
                    fill="#404040"
                  >
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      dur="0.3s"
                      begin={`${0.1 * i}s`}
                      fill="freeze"
                    />
                  </rect>
                  <text
                    x="420"
                    y={267 + i * 30}
                    fill="#fff"
                    fontSize="11"
                  >
                    {item.icon} {item.text.slice(0, typewriterProgress[i])}
                  </text>
                  <text
                    x="610"
                    y={267 + i * 30}
                    fill="#fff"
                    fontSize="11"
                    textAnchor="end"
                  >
                    {typewriterProgress[i] === item.text.length ? item.price : ''}
                  </text>
                </g>
              ))}
              
              {/* Total with pulsating effect */}
              <rect 
                x="405" 
                y="370" 
                width="225" 
                height="25" 
                rx="4" 
                fill="#3b82f6"
              >
                <animate 
                  attributeName="opacity"
                  values="1;0.7;1"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
                <animate
                  attributeName="fill"
                  values="#3b82f6;#4f46e5;#3b82f6"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </rect>
              <text 
                x="420" 
                y="387" 
                fill="#fff" 
                fontSize="12" 
                fontWeight="bold"
              >
                Total: $1,800
                <animate
                  attributeName="opacity"
                  values="1;0.8;1"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </text>

              {showConfetti && generateConfetti().map((particle, i) => (
                <g key={i}>
                  {particle.shape === 'circle' ? (
                    <circle
                      cx={particle.x}
                      cy={particle.y}
                      r={4 * particle.scale}
                      fill={particle.color}
                    >
                      <animate
                        attributeName="cy"
                        from={particle.y}
                        to={particle.y + 200}
                        dur={`${2 + Math.random() * 2}s`}
                        begin="0s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 0.1 0.25 1"
                      />
                      <animate
                        attributeName="cx"
                        from={particle.x}
                        to={particle.x + particle.velocity.x * 20}
                        dur={`${2 + Math.random() * 2}s`}
                        begin="0s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 0.1 0.25 1"
                      />
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${particle.x} ${particle.y}`}
                        to={`${360 + Math.random() * 720} ${particle.x} ${particle.y}`}
                        dur={`${1 + Math.random() * 2}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="1"
                        to="0"
                        dur={`${2 + Math.random() * 2}s`}
                        begin="0s"
                        fill="freeze"
                      />
                    </circle>
                  ) : (
                    <rect
                      x={particle.x - 4 * particle.scale}
                      y={particle.y - 4 * particle.scale}
                      width={8 * particle.scale}
                      height={8 * particle.scale}
                      fill={particle.color}
                    >
                      <animate
                        attributeName="y"
                        from={particle.y}
                        to={particle.y + 200}
                        dur={`${2 + Math.random() * 2}s`}
                        begin="0s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 0.1 0.25 1"
                      />
                      <animate
                        attributeName="x"
                        from={particle.x}
                        to={particle.x + particle.velocity.x * 20}
                        dur={`${2 + Math.random() * 2}s`}
                        begin="0s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 0.1 0.25 1"
                      />
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${particle.x} ${particle.y}`}
                        to={`${360 + Math.random() * 720} ${particle.x} ${particle.y}`}
                        dur={`${1 + Math.random() * 2}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="1"
                        to="0"
                        dur={`${2 + Math.random() * 2}s`}
                        begin="0s"
                        fill="freeze"
                      />
                    </rect>
                  )}
                </g>
              ))}          
            </g>
          )}
        </g>
      )}

      {/* Cursor */}
      <rect
        x="138"
        y="168"
        width="8"
        height="16"
        fill="#fff"
        opacity="0.7"
      >
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};

export default AnimatedSvg;