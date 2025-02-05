import React, { useState } from 'react';
import { X, ArrowRight, Shield, CheckCircle } from 'lucide-react';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  problem: string;
  tier: 'starter' | 'growth' | 'enterprise' | '';
}

const PreOrderModal: React.FC<PreOrderModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    problem: '',
    tier: ''
  });

  const [step, setStep] = useState(1);
  const totalSteps = 2; // Reduced to 2 steps

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  const tiers = [
    {
      name: 'Starter',
      price: 499,
      features: ['All 6 Course Modules', 'AI Prompt Library', 'Community Access', 'Group Calls']
    },
    {
      name: 'Growth',
      price: 699,
      features: ['Everything in Starter', '1-on-1 Weekly Calls', 'Priority Support', 'Advanced AI Templates']
    },
    {
      name: 'Enterprise',
      price: 999,
      features: ['Everything in Growth', 'Custom AI Integration', 'Lifetime Updates', 'VIP Support Channel']
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 p-6 flex justify-between items-center sticky top-0 bg-[#0a0a0a] z-10">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Pre-Order Your Spot
            </h2>
            <p className="text-gray-400 text-sm mt-1">⚡ Early Bird Price - Limited Time Only <b> | Live Feb 14th, 2025</b></p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-1">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="problem" className="block text-sm font-medium text-gray-300 mb-2">
                    What's your biggest challenge in building products? (Optional)
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Right Column - Plan Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Choose Your Plan 👇</h3>
                <div className="space-y-4">
                  {tiers.map((tier) => (
                    <div
                      key={tier.name.toLowerCase()}
                      className={`relative bg-gray-900/50 p-4 rounded-xl border ${
                        formData.tier === tier.name.toLowerCase()
                          ? 'border-blue-500 bg-blue-900/10'
                          : 'border-gray-800'
                      } hover:border-blue-500 transition-all cursor-pointer group`}
                      onClick={() => setFormData(prev => ({ ...prev, tier: tier.name.toLowerCase() as FormData['tier'] }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{tier.name}</h4>
                          <ul className="mt-2 space-y-1">
                            {tier.features.slice(0, 2).map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 text-blue-400" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">${tier.price}</p>
                          <p className="text-sm text-yellow-400">one-time</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Guarantee Badge */}
                {/*<div className="flex items-center gap-3 bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 mt-4">
                  <Shield className="w-6 h-6 text-yellow-400" />
                  <p className="text-sm text-gray-300">
                    100% Satisfaction Guarantee - Get a free 1-on-1 consultation if you're not satisfied
                  </p>
                </div>*/}
              </div>
            </div>
          )}

          {/* Navigation and Submit */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-2 group"
              disabled={!formData.tier || !formData.email || !formData.firstName || !formData.lastName}
            >
              Secure My Spot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Privacy Policy */}
          <p className="text-xs text-center text-gray-500 mt-6">
            By submitting this form, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PreOrderModal;