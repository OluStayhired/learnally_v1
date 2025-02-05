import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, ArrowRight, Calendar, Mail, BookOpen } from 'lucide-react';
import Confetti from 'react-confetti';

interface ThankYouPageProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    tier: string;
  };
  onClose: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ formData, onClose }) => {
const [countdown, setCountdown] = useState(30);
const [showConfetti, setShowConfetti] = useState(true);
const confettiRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, countdown * 1000);

    return () => {
      clearTimeout(confettiTimer);
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const getTierPrice = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'starter':
        return 499;
      case 'growth':
        return 699;
      case 'enterprise':
        return 999;
      default:
        return 0;
    }
  };

  //return (
    //<div className="relative h-full flex items-center">
      //{showConfetti && (
        //<Confetti
          //width={window.innerWidth}
          //height={window.innerHeight}
          //recycle={false}
          //numberOfPieces={200}
          //colors={['#3b82f6', '#4f46e5', '#facc15', '#10b981']}
        ///>
      //)}

  return (
    <div className="relative h-full flex items-center">
      {/* Confetti Container with Ref */}
      <div className="absolute inset-0 pointer-events-none" ref={confettiRef}> {/* Added ref and pointer-events-none */}
        {showConfetti && confettiRef.current && ( // Conditional rendering based on ref
          <Confetti
            width={confettiRef.current.offsetWidth} // Use ref for width
            height={confettiRef.current.offsetHeight} // Use ref for height
            recycle={false}
            numberOfPieces={200}
            colors={['#3b82f6', '#4f46e5', '#facc15', '#10b981']}
          />
        )}
      </div>

      <div className="w-full">
        <div className="grid gap-4 max-w-4xl mx-auto">
          {/* Success Header - Made more compact */}
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Thank You, {formData.firstName}!
              </h2>
              <p className="text-gray-300">Your pre-order has been confirmed</p>
            </div>
          </div>

          {/* Two Column Layout for Summary and Next Steps */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* Order Summary - Left Column */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="font-semibold capitalize">{formData.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-semibold">${getTierPrice(formData.tier)}</span>
                </div>
                <div className="pt-2 border-t border-gray-800">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold">${getTierPrice(formData.tier)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps - Right Column */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Next Steps</h3>
              <div className="grid gap-2">
                <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-800 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Check Your Email</h4>
                    <p className="text-xs text-gray-400">Confirmation sent to {formData.email}</p>
                  </div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-800 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Mark Your Calendar</h4>
                    <p className="text-xs text-gray-400">Course starts Feb 14th, 2025</p>
                  </div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-800 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Access Resources</h4>
                    <p className="text-xs text-gray-400">Pre-course materials coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button - Made more compact */}
          <div className="text-center mt-4">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-2 mx-auto group text-sm"
            >
              Close Window
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-400 mt-1">
              Closing automatically in {countdown} seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;