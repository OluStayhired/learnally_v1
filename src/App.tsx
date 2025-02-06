import React, { useEffect, useRef, useState }  from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { BarChart2, Brain, Building2, Globe2, Mail, MessageSquare, Users, Zap, Clock, Database, Trophy, Palette, Rocket, Hammer, User, Shield, BookOpen, Sparkles,Aperture, Play, Pause, ChevronDown, Cloud, Globe, Linkedin, Menu, X } from 'lucide-react';
import klaowtCase from './images/klaowt_case_3x.png';
import AnimatedSvg from './components/AnimatedSvg';
import mainHeroImage from './images/main_hero_draft01.png';
import mainHeroVideo from './images/learnally_main_video_large.mp4'
import mainHeroCover from './images/learnally_main_cover.png'
import caseStudyVideo from './images/video_of_klaowt_large.mp4';
import dbBank from './images/db-logo.svg';
import barclaysBank from './images/barclays-logo.svg'
import citiBank from './images/citigroup-logo.svg'
import microsoftLogo from './images/microsoft-logo.svg'
import rbsLogo from './images/rbs-logo.svg'
import oluAvatar from './images/olu-image.jpg'
import avatarImages from './images/avatar_images.png'
import PreOrderModal from '/src/components/PreOrderModal';

const LoopingAnimatedSvg = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const animationDuration = 20000;

    const timer = setInterval(() => {
      setKey(prevKey => prevKey + 1);
    }, animationDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedSvg 
      key={key}
      className="w-full h-auto object-contain mx-auto" 
    />
  );
};

function App() {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const faqs = [
    {
      question: "I don't know anything about coding. Can I really build a software product?",
      answer: <>Yes, absolutely!  That's the beauty of this course. it's designed specifically for people just like you, who don't have a technical background.  You don't need to learn how to write code.<br/><br/>  

We'll guide you step-by-step, using intuitive AI tools and a simple, visual approach. Think of it like using building blocks – we'll provide the blocks (the AI tools and templates), and we'll show you how to put them together to create your product.  <br/><br/> 
      
You'll be amazed at what you can achieve, even without any prior coding experience.</>
    },
    {
      question: "How long will it take to actually build my product?",
      answer: <>
        Think of it as building the foundation first. You'll have a solid, working product in 4 weeks, and then you can continue to add features and refine it as you grow. <br/><br/>  
We'll break down the process into manageable steps, so you'll see real progress each week, keeping you motivated and on track.
        </>
    },
    {
      question: "Do I need a huge budget to get started?",
      answer: <> A budget of around $500 will be more than sufficient to cover the essential tools and resources you'll need to get started. We focus on building smart and lean, so you can launch your product without emptying your wallet.<br/><br/> That's one of the biggest advantages of this approach. You don't need a massive budget to bring your product to life. With our program and the power of AI, you can build a functional, launch-ready product for a fraction of the cost.
      
      </>
    },
    {
    question: "What if my product idea doesn't work?",
    answer: <>
    That's a valid concern, and it's something every entrepreneur faces.  The truth is, not every idea is a home run right out of the gate.  But that's okay!  This program isn't just about building; it's about learning and iterating.<br/><br/>  We'll equip you with the tools and strategies to validate your idea before you invest too much time and resources.
    </> 
    },
    {
    question: "Can I do this on my own, or will I need to hire a team?",
    answer: <>Absolutely, you can do this on your own! This program is designed specifically for solopreneurs and individuals like you who want to take control of their product development. <br/><br/> You don't need to hire a team of designers, developers, or analysts.  In fact, we'll help you build your own AI team!  Our comprehensive Prompt Library acts as your virtual team of experts. 
    </> 
    },
   {
    question: "Is this really possible for someone without technical skills? ",
    answer: <> Yes, 100%!  That's the whole point of this program.  We understand that not everyone has a technical background, and we've designed our curriculum to be completely accessible to non-technical individuals. <br/><br/> You don't need to be a coder, a designer, or a data analyst.  Our AI Prompt Library and your AI Team will become your secret weapons.  They'll handle the technical heavy lifting, allowing you to focus on bringing your product vision to life. </>  
    },
   {
    question: "How can I validate my product idea before investing too much time? ",
    answer:<>Validating your idea is absolutely critical, and it's a key focus of our program.  We don't want you spending months building something no one wants.  That's why our early modules dive deep into the validation process.<br/><br/>  We'll guide you through building a Minimum Viable Product (MVP). A core, functional version of your product that showcases its key feature. This isn't about building the entire thing; it's about quickly creating something you can put in front of potential customers. </> 
    },
   {
    question: "What if my product doesn't stand out from the competition?",
    answer: <>This is something all entrepreneurs think about. While this program focuses on the creation of your product – giving you the tools and skills to build it without developers – it doesn't directly cover extensive market positioning or competitive analysis.<br/><br/>  However, I understand how crucial it is for your product to stand out. I've personally helped numerous solo founders just like you reposition their products for greater market impact, and I'm happy to offer additional consultation on this aspect.</>  
    }
  ];

  useEffect(() => {
    const video = videoRef.current;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    if (video) {
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (video) {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, []);
    
  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <nav className="md:block fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo/Brand */}
            <div className="flex items-center gap-12">
                          
              {/* Mobile Hamburger Menu */}
              <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />} 
          {/* Toggle icons */}
        </button>
            </div>
              <div className="flex items-center">
                <Aperture className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-2" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  Learnally
                </span>
              </div>



              
              {/* Desktop Navigation Menu */}
              <div className="hidden md:flex items-center gap-8">
                <button 
                  onClick={() => scrollToSection('about-section')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('course-overview')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  The Course
                </button>
                <button 
                  onClick={() => scrollToSection('FAQs')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => scrollToSection('price-plans')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </div>
            </div>

            {/* Right side - CTA Button */}
            <div className="md:block hidden">
              <button 
                onClick={() => window.open('https://meetings.hubspot.com/olu-adedeji', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full font-semibold 
                hover:opacity-90 transition-all duration-300
                animate-[pulse_2s_ease-in-out_infinite]
                hover:animate-none
                flex items-center gap-2">
                <span>Book 15min Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>


        {/* Mobile Menu (Hidden by default) */}
  {isMobileMenuOpen && (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-md border-t border-gray-800 p-4"> {/* Adjust top value if needed */}
      <div className="flex flex-col gap-4"> {/* Vertical menu items */}
                <button onClick={() => { scrollToSection('home-section'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white transition-colors">
          Home
        </button>
        <button onClick={() => { scrollToSection('about-section'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white transition-colors">
          About
        </button>
        <button onClick={() => { scrollToSection('course-overview'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white transition-colors">
          The Course
        </button>
        <button onClick={() => { scrollToSection('FAQs'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white transition-colors">
          FAQ
        </button>
        <button onClick={() => { scrollToSection('price-plans'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white transition-colors">
          Pricing
        </button>
        {/* Add more mobile menu items as needed */}
      </div>
    </div>
  )}
      </nav>

      {/* Hero Section */}
      <header id="home-section" className="min-h-screen pt-24 relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-[#0a0a0a]">
        
        {/* Content Container */}
        <div className="relative z-10 pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-5 space-y-8">
              {/* Headline */}
              <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-yellow-400 to-purple-400 text-transparent bg-clip-text">
                Build Beautiful Apps without Developers 
              </h1>
              {/* Subheading */}
              <p className="text-xl text-gray-300 leading-relaxed">
               Learn How to Create Amazing Products in 4 Weeks! 
              </p>
              
              {/* Bullet Points */}
              <ul className="space-y-4">
                {[
                  'No Technical Skills. No Problem',
                  'Transform your Ideas into Software',  
                  'Launch Products and scale your business'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-normal text-gray-300">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Section */}
              <div className="space-y-2 pt-4">
                
                <button 
                  onClick={() => setIsPreOrderModalOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Pre-Book Your Slot Now 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <div className="flex flex-row gap-2 text-center mx-auto">
                <p className="text-blue-400 text-normal font-bold">Early Bird</p> <p className="text-white text-normal font-bold">Price Increases <span className="text-yellow-400">Every 30 Sales</span></p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="hidden lg:block lg:col-span-7 relative pt-16">
                <div className="absolute inset-0 rounded-2xl"></div>
              <div className="w-full h-auto mx-auto">
                 <video 
    ref={videoRef}
    //src="/src/images/video_klaowt_website.mp4"
    src={mainHeroVideo}
    muted
    playsInline
    loop
    controls
    className="w-full object-cover rounded-lg shadow-2xl mb-5"
    poster={mainHeroCover}
  />
                {/*<img
                  src={mainHeroImage}
                  alt="Learnally main image"
                  className="w-full object-cover rounded-lg shadow-6xl mb-5 animate-custom-bounce duration-500"
                />*/}
              </div>      
            </div>

            {/* Mobile Image */}
            <div className="lg:hidden w-full relative pt-16">
              <div className=" bg-gradient-to-b from-blue-600/20 to-[#0a0a0a] rounded-2xl"></div>
                <img
                  src={mainHeroImage}
                  alt="Learnally apps main image"
                  className="w-full object-cover rounded-lg shadow-2xl mb-5"
                />
            </div>
          </div>
        </div>
      </div>
      </header>

   
      {/* No-Developer Section */}
<section className="py-24 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative">
  {/* Optional gradient overlay for smooth transition */}
  <div className="absolute inset-0"></div>
  
  {/* Content Container */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Heading with gradient text */}
<h5 className="text-yellow-400 text-xl mb-4">CASE STUDY <br/> SOCIAL MEDIA APP BUILT WITH AI</h5>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text">
      Launch Products<br/> With No Tech Skills
    </h2>
    <span className="items-center md:text-sm text-center lg:text-lg text-gray-300">
Don't waste time looking for a technical co-founder <br/> learn how to build with AI and launch fast  
    </span>
    
    {/* Full-width image container */}
    {/*<div className="w-full max-w-[1920px] mx-auto">*/}
    <div className="mt-10 w-3/4 max-w-[1920px] mx-auto">
      <div className="relative group"> {/* Container with group for hover effects */}
  <video 
    ref={videoRef}
    //src="/src/images/video_klaowt_website.mp4"
    src={caseStudyVideo}
    muted
    playsInline
    loop
    controls
    className="w-full object-cover rounded-lg shadow-2xl mb-5"
    poster={klaowtCase}
  />
  
  {/* Play button overlay */}
        {/*<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-blue-500 rounded-full p-4 cursor-pointer 
                  transition-all duration-300 hover:bg-blue-600 item-center">
    <Play className="w-12 h-12 item-center fill-white text-white" />
  </div>*/}
        {!isPlaying && (
        <button 
          onClick={handlePlayClick}
          className="md:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 cursor-pointer transition-all duration-300 hover:bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,255,0.7)] hover:shadow-[0_0_15px_rgba(0,0,255,0.9)]">
  <Play className="w-12 h-12 fill-white" />
</button>
  )}
</div>

      <span className="items-center text-center md:text-normal lg:text-lg text-gray-400">
This AI-driven social media engagement app was built and launched by a non-technical founder <br/> with zero coding experience in just 4 weeks🚀   
    </span>
    </div>
  </div>
</section> {/*End first section after hero*/}

{/* Client Logos Section */}
<section className="py-12 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative">
  {/* Optional gradient overlay */}
  <div className="absolute inset-0"></div>
  
  {/* Content Container */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-2">
      <h3 className="text-xl text-gray-400 font-medium">
        Trusted by Industry Leaders 🛡️
      </h3>
      <div className="mt-2 text-sm text-gray-500">
        Previous clients who have transformed their businesses...
      </div>
    </div>
    
    {/* Logo Grid */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center justify-items-center">
      {/* Each logo would be wrapped in a div for consistent sizing */}
      <div className="w-32 h-16 flex items-center justify-center">
        <img
          src={dbBank}
          alt="Deutsche Bank"
          className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="w-64 h-32 flex items-center justify-center">
        <img
          src={barclaysBank}
          alt="Barclays"
          className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="w-32 h-16 flex items-center justify-center">
        <img
          src={citiBank}
          alt="Citigroup"
          className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="w-64 h-32 flex items-center justify-center">
        <img
          src={microsoftLogo}
          alt="Microsoft"
          className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="w-32 h-16 flex items-center justify-center">
        <img
          src={rbsLogo}
          alt="RBS"
          className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
    />
      </div>
    </div>
  </div>
</section>
{/*Personal Letter Starts Here*/}
      
{/* Personal Introduction Section */}
<section id="about-section" className="py-16 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative">
  {/* Gradient overlay */}
  <div className="absolute inset-0"></div>
  <h5 className="text-yellow-400 text-xl text-center mb-4">QUICK INTRODUCTION</h5>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-center"> Meet the Founder 👋
    </h2>
    <p className="text-center text-lg text-gray-300">
I teach solopreneurs with zero technical experience how to build beautiful products with AI
    </p>

  {/* Content Container */}
  <div className="relative mt-10 z-10 max-w-3xl mx-auto px-4 sm:px-6">
    {/* Avatar Container */}
    <div className="flex justify-center mb-12">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
        <img
          src={oluAvatar}
          alt="Olu"
          className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full border-4 border-[#0a0a0a]"
        />
      </div>
    </div>
    
    {/* Letter Content */}
    <div className="space-y-6 text-center sm:text-left">
      {/* Greeting */}
      <h2 className="text-3xl font-bold">
        {/*<span className="mr-2">👋</span>*/}
        Hi, I'm Olu.
      </h2>
      
      {/* Introduction */}
      <p className="text-xl text-left text-gray-300">
        I help non-technical professionals escape the 'developer dependency' and bring their software ideas to life with AI.
      </p>

       {/* Personal Story */}
      <div className="space-y-4">
        {/*<p className="text-xl font-semibold">I understand.</p>*/}
        <p className="text-xl text-left text-gray-300">
          I've poured tens of thousands of dollars into development projects, only to feel further away from my goals. Building software isn't about endless spending. It's about turning your ideas into products without breaking the bank.
        </p>

      </div>
      
      {/* Pain Points */}
      <p className="text-xl text-left text-gray-300">
        No more endless frustration waiting on developers, no need to compromise on your vision and feel constantly out of control.
      </p>
        <p className="text-xl text-left text-gray-300">
          This course will empower you to build your side hustle, on your terms.
        </p>
    
      {/* Call to Action */}
      <div className="pt-6">
        <p className="text-xl text-left font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          You don't have to be technical.
        </p>
      </div>
      
      {/* Benefits List */}
      <div className="bg-blue-900/10 p-6 rounded-xl text-left">
        <p className="text-xl text-gray-300 mb-4">Together, we'll achieve the freedom to:</p>
        <ul className="space-y-2 text-xl text-gray-300">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
            <span>Build software without technical skills</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
            <span>Launch products on your timeline</span>
          </li>
           <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
            <span>Generate recurring passive income</span>
          </li>    
        </ul>
      </div>
      
      {/* Final CTA */}
      <div className="pt-8 space-y-4">
        <p className="text-xl font-semibold">
          Ready to break free and finally turn that software idea into a real product?
        </p>
        <button 
          onClick={() => window.open('https://meetings.hubspot.com/olu-adedeji', '_blank')}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Book 15min Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
      </div>
    </div>
  </div>
</section>
    {/* Start Features Section */}
      <section id="course-overview" className="py-20 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h5 className="text-yellow-400 text-xl mb-4">THE COURSE AT A GLANCE</h5>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">All-in-one Solution</h2>
          <h4 className="text-normal text-gray-400 text-lg mb-16 max-w-3xl mx-auto">
          Skip months of project delays and spiraling development costs <br/> with battle-tested AI frameworks and expert guidance
          </h4>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: 'Weekly Sessions', desc: '12 hours of practical step-by-step guide' },
              { icon: Database, title: 'AI Prompt Library', desc: 'Proven AI templates to help you launch fast' },
              { icon: Brain, title: 'AI Integration', desc: 'Add ChatGPT, Claude, Gemini into your software' },
              { icon: Trophy, title: 'Lifetime Access', desc: 'Full access to all materials + future updates' }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors">
                <feature.icon className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*Course Breakdown Module*/}

{/* Course Overview Section */}
<section id="course-module" className="py-24 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative">
  {/* Content Container */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
       <h5 className="text-yellow-400 text-xl mb-4">6 COURSE MODULE</h5>
      <h2 className="text-5xl md:text-6xl font-bold mb-4">
        Build Your Dream App <br/> Without Code 😲
      </h2>
      <p className="text-xl text-gray-400">
        A Beginner's Guide for Non-Technical Founders
      </p>
    </div>

    {/* Modules Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      {/* Module 1 */}
      <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <User className="w-10 h-10 text-yellow-400" />
          <h3 className="text-2xl font-bold">Module 1</h3>
        </div>
        <h4 className="text-xl font-semibold mb-4 text-blue-400">
          Course Introduction
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Welcome & Introduction</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>The Solopreneur's Struggle</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Introducing Your AI Tools</span>
          </li>
           <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Setting Up Your AI Playground</span>
          </li>
        </ul>
      </div>

      {/* Module 2 */}
      <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <Palette className="w-10 h-10 text-yellow-400" />
          <h3 className="text-2xl font-bold">Module 2</h3>
        </div>
        <h4 className="text-xl font-semibold mb-4 text-blue-400">
          Design Essentials
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Design Fundamentals (Basics)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Color Theory and UI Best Practices</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Building with AI Prompts & Templates</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Building a Landing Page with Prompts</span>
          </li>
          {/* ... other items */}
        </ul>
      </div>

      {/* Module 3 */}
      <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <Hammer className="w-10 h-10 text-yellow-400" />
          <h3 className="text-2xl font-bold">Module 3</h3>
        </div>
        <h4 className="text-xl font-semibold mb-4 text-blue-400">
          Build Your Product 
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Domain Registration</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Connecting Your Landing Page</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Design Your App Functionlity</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span>Start Building Your App</span>
          </li>
          {/* ... other items */}
        </ul>
      </div>
      {/* Module 4 */}
<div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
  <div className="flex items-center gap-4 mb-6">
    <Database className="w-10 h-10 text-yellow-400" />
    <h3 className="text-2xl font-bold">Module 4</h3>
  </div>
  <h4 className="text-xl font-semibold mb-4 text-blue-400">
    Data & Integration
  </h4>
  <ul className="space-y-3">
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Understanding Databases</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Connecting to APIs</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Data Security Basics</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Integration Best Practices</span>
    </li>
  </ul>
</div>

{/* Module 5 */}
<div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
  <div className="flex items-center gap-4 mb-6">
    <Shield className="w-10 h-10 text-yellow-400" />
    <h3 className="text-2xl font-bold">Module 5</h3>
  </div>
  <h4 className="text-xl font-semibold mb-4 text-blue-400">
    Security & Testing
  </h4>
  <ul className="space-y-3">
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Basic Security Measures</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>User Authentication</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Testing Your Product</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Quality Assurance</span>
    </li>
  </ul>
</div>

{/* Module 6 */}
<div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
  <div className="flex items-center gap-4 mb-6">
    <Rocket className="w-10 h-10 text-yellow-400" />
    <h3 className="text-2xl font-bold">Module 6</h3>
  </div>
  <h4 className="text-xl font-semibold mb-4 text-blue-400">
    Launch & Scale
  </h4>
  <ul className="space-y-3">
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Pre-launch Checklist</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Marketing Integration</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Analytics Setup</span>
    </li>
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
      <span>Scaling Strategies</span>
    </li>
  </ul>
</div>
</div>
 {/* Featured Article */}
<div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 mt-8">
  <div className="flex items-center gap-4 mb-6">
    <BookOpen className="w-10 h-10 text-yellow-400" />
    <h3 className="text-2xl font-bold">Featured Article</h3>
  </div>
  <h4 className="text-xl font-semibold mb-4 text-blue-400">
    How to Build Your Landing Page with AI
  </h4>
  <ul className="space-y-3">
    <li className="flex items-start gap-3">
      <span className="mb-4">Check out our free guide on Building landing pages with AI.<br/> Showing you a step-by-step guide for deconstructing websites you want to replicate.</span>
    </li>
    
    <li className="flex items-start gap-3">
        <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full md:text-lg lg:text-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group">
                 Read the Free Guide
<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </li>
  </ul>
</div>  
</div>
</section>

{/* Pricing Section */}
<section id="price-plans" className="py-24 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h5 className="text-yellow-400 text-xl mb-4">PRICING</h5>
      <h2 className="text-5xl md:text-5xl font-bold mb-8">
        Launch Your Software in 4 Weeks <br/> No Coding Required
      </h2>
      
      {/* Early Bird Banner */}
      <div className="inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-1 rounded-2xl mb-16">
        <div className="flex items-center gap-2 bg-gray-900 px-6 py-3 rounded-xl">
          
          <span className="text-xl">

            <p className="font-bold text-blue-400">⚡Pre-Launch Super Early Bird</p>
            <p className="text-gray-400 ml-2">Regular price $1499+ (increases every 100 sales)</p>
          </span>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-2">Starter</h3>
          <div className="mb-6">
            <span className="text-5xl font-bold">$499</span>
            <p className="text-yellow-400">one-time</p>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>All 6 Course Modules</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>AI Prompt Library</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>Community Access</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>Group Calls</span>
            </li>
          </ul>
          <button 
            onClick={() => setIsPreOrderModalOpen(true)}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300">
            Pre-Order Starter
          </button>
        </div>

        {/* Growth Plan - Most Popular */}
        <div className="bg-gradient-to-b from-blue-600/20 to-purple-600/20 p-[1px] rounded-2xl relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl h-full">
            <h3 className="text-2xl font-bold mb-2">Growth </h3> 
            <div className="mb-6">
              <span className="text-5xl font-bold">$699</span>
              <p className="text-yellow-400">one-time</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span>Everything in Starter</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span>1-on-1 Weekly Calls</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span>Priority Support</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span>Advanced AI Templates</span>
              </li>
            </ul>
            <button 
              onClick={() => setIsPreOrderModalOpen(true)}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300">
              Pre-Order Growth
            </button>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
          <div className="mb-6">
            <span className="text-5xl font-bold">$999</span>
            <p className="text-yellow-400">one-time</p>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>Everything in Growth</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>Custom AI Integration</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>Lifetime Updates</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>VIP Support Channel</span>
            </li>
          </ul>
          <button 
            onClick={() => setIsPreOrderModalOpen(true)}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300">
            Pre-Order Enterprise
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
{/*End Pricing Section Start FAQ Section*/}
<section id="FAQs" className="py-24 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h5 className="text-yellow-400 text-xl mb-4">COMMON QUESTIONS</h5>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
        Frequently Asked Questions
      </h2>
      <p className="text-xl text-gray-300">
        Everything you need to know about building your product
      </p>
    </div>
     

    {/*Add responsive classes*/}
<div className="max-w-3xl mx-auto"> {/* Container for better readability */}
  <div className="space-y-4 md:space-y-6"> {/* Increased spacing on lg screens */}
    {/* FAQ items */}
    
<div className="space-y-4">
  {faqs.map((faq, index) => (
    <div 
      key={index}
      className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-blue-500"
    >
      <button
        onClick={() => setOpenFaq(openFaq === index ? null : index)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <h3 className="text-xl font-semibold">{faq.question}</h3>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300 ${
            openFaq === index ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${
          openFaq === index 
            ? 'max-h-auto opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-4 text-gray-400">
          {faq.answer}
        </p>
      </div>
    </div>
  ))}
</div>

</div>
</div>
  </div>
  </section>
      {/*Final CTA*/}
      <section className="py-24 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
     
      <h2 className="py-2 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-yellow-400 to-purple-400 text-transparent bg-clip-text mb-6">
        Ready to Build your first App?
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
        Join thousands of non-technical founders and solopreneurs building products with AI.
      </p>
       <img
        src={avatarImages}
        alt="Learnally apps main image"
        className="w-[240px] h-auto object-cover rounded-lg shadow-2xl mb-5 animate-custom-bounce duration-500 mx-auto"
      />

      {/* CTA Button */}
      <div className="space-y-4">
        <button  
          onClick={() => setIsPreOrderModalOpen(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group mx-auto">
          Get Started Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* Additional Info */}
        <div className="space-y-2 text-center">
          <p className="text-yellow-400 font-bold mb-8">⚡Limited Slots Available</p>
          
          <p className="text-gray-400 text-lg">🛡️Results-Based Guarantee </p>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
          If you need additional support, we'll schedule a personal 15-minute consultation to review your app and help you succeed.</p>
        </div>
      </div>
    </div>
  </div>
</section>
  {/*End Final Call to Action - Start Footer Section*/}
    <footer className="py-24 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a] relative border-t border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Main Footer Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      
      {/* Column 1: Company Info */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Aperture className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Learnally
          </span>
        </div>
        <p className="text-gray-400">
          Empowering non-technical founders to build beautiful products with AI. Transform your ideas into reality without code.
        </p>
      </div> 

      {/* Column 3: Quick Links */}
      <div>
        <h3 className="text-xl font-bold mb-6">Quick Links</h3>
        <ul className="space-y-4 text-gray-400">
          <li className="hover:text-blue-400 transition-colors cursor-pointer">
  <a 
    href="#home-section" 
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById('home-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }}
  >
    Home
  </a>
</li>
<li className="hover:text-blue-400 transition-colors cursor-pointer">
  <a 
    href="#about-section" 
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById('about-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }}
  >
    About Me
  </a>
</li>

<li className="hover:text-blue-400 transition-colors cursor-pointer">
  <a 
    href="#course-overviewe" 
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById('course-overview');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }}
  >
    Course Overview
  </a>
  </li>

<li className="hover:text-blue-400 transition-colors cursor-pointer">
  <a 
    href="#course-module" 
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById('course-module');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }}
  >
    Course Modules
  </a>
  </li>
<li className="hover:text-blue-400 transition-colors cursor-pointer">
  <a 
    href="#price-plans" 
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById('price-plans');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }}
  >
    Pricing Plans
  </a>
  </li>   

<li className="hover:text-blue-400 transition-colors cursor-pointer">
  <a 
    href="#FAQs" 
    onClick={(e) => {
      e.preventDefault();
      const element = document.getElementById('FAQs');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }}
  >
    FAQs
  </a>
  </li>           
          
          <li className="hover:text-blue-400 transition-colors cursor-pointer">
            Contact
          </li>
                   <li className="hover:text-blue-400 transition-colors cursor-pointer">
                     <a href="/privacy.html" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors">
            Privacy Policy </a>
          </li>
        </ul>
      </div>
 {/* Column 2: Latest Blog Posts */}
      <div>
        <h3 className="text-xl font-bold mb-6">Blog Insights(soon)</h3>
        <ul className="space-y-4 text-gray-400">
          <li className="hover:text-blue-400 transition-colors cursor-pointer">
            Building Apps with AI: A Beginner's Guide
          </li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer">
            From Idea to Launch: No-Code Success Stories
          </li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer">
            Why Non-Technical Founders Are Winning
          </li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer">
            The Future of AI-Powered Development
          </li>
        </ul>
      </div>
      {/* Column 4: Connect */}
      <div>
        <h3 className="text-xl font-bold mb-6">Connect</h3>
        <div className="space-y-4">
          <a href="https://www.linkedin.com/in/oluadedeji/" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors">
            <Linkedin className="w-5 h-5" />
            <span>Follow Olu on LinkedIn</span>
          </a>
          {/*} <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors">
            <BlueskyLogo className="w-5 h-5" />
            <span>Bluesky</span>
          </a>*/}
          <a href="mailto:team@joinlearnally.com" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors">
            <Mail className="w-5 h-5" />
            <span>team@joinlearnally.com</span>
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} Learnally Apps. All rights reserved.</p>
    </div>
  </div>
      
</footer>
      <PreOrderModal 
        isOpen={isPreOrderModalOpen} 
        onClose={() => setIsPreOrderModalOpen(false)} 
        />
    </div>  
    
   );
}

export default App;