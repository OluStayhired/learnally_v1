import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Calendar, Mail, BookOpen, PartyPopper } from 'lucide-react';
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
  const [countdown, setCountdown] = useState(10);
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    // Start confetti and remove after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto close after countdown
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

  return (
    <div className="relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#3b82f6', '#4f46e5', '#facc15', '#10b981']}
        />
      )}

      <div className="text-center space-y-6">
        {/* Success Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Thank You, {formData.firstName}!
          </h2>
          <p className="text-xl text-gray-300">
            Your pre-order has been confirmed
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Plan</span>
              <span className="font-semibold capitalize">{formData.tier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount</span>
              <span className="font-semibold">${getTierPrice(formData.tier)}</span>
            </div>
            <div className="pt-3 border-t border-gray-800">
              <div className="flex justify-between text-lg">
                <span className="text-gray-400">Total</span>
                <span className="font-bold">${getTierPrice(formData.tier)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <Mail className="w-6 h-6 text-blue-400 mb-2" />
              <h4 className="font-semibold mb-1">Check Your Email</h4>
              <p className="text-sm text-gray-400">Confirmation sent to {formData.email}</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <Calendar className="w-6 h-6 text-blue-400 mb-2" />
              <h4 className="font-semibold mb-1">Mark Your Calendar</h4>
              <p className="text-sm text-gray-400">Course starts Feb 14th, 2025</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <BookOpen className="w-6 h-6 text-blue-400 mb-2" />
              <h4 className="font-semibold mb-1">Access Resources</h4>
              <p className="text-sm text-gray-400">Pre-course materials coming soon</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-6">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-2 mx-auto group"
          >
            Close Window
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-gray-400 mt-2">
            Closing automatically in {countdown} seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;