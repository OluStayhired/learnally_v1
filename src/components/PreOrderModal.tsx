import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '/src/lib/supabase';
import { sendEmail } from '../lib/sendgrid';
import ThankYouPage from './ThankYouPage_04Feb';
//import { sendEmail } from './netlify/functions/send-email';  

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
  type RegistrationStatus = 'idle' | 'loading' | 'success' | 'error';
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>('idle');
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    problem: '',
    tier: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationStatus('loading');
    setRegistrationError(null);

    try {
      // First register the user in Supabase
      const { data, error } = await supabase
        .from('course_users')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          challenge: formData.problem || null,
          tier: formData.tier,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email
      try {
        const emailData = {
          to: formData.email,
          from: 'team@joinlearnally.com',
          subject: "Welcome to Learnally! Your Pre-Registration is Confirmed",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #3b82f6;">Welcome ${formData.firstName}! 🎉</h1>
              
              <p style="font-size: 16px; line-height: 1.5;">
                Thank you for pre-registering for the Learnally course. We're excited to have you join us on this journey!
              </p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #1e293b; margin-top: 0;">Order Details</h2>
                <p><strong>Plan:</strong> ${formData.tier.charAt(0).toUpperCase() + formData.tier.slice(1)}</p>
                <p><strong>Start Date:</strong> February 14th, 2025</p>
              </div>

              <div style="margin: 30px 0;">
                <h3 style="color: #3b82f6;">Next Steps:</h3>
                <ul style="list-style-type: none; padding: 0;">
                  <li style="margin: 10px 0;">✅ Mark your calendar for Feb 14th, 2025</li>
                  <li style="margin: 10px 0;">📧 Watch your inbox for course updates</li>
                  <li style="margin: 10px 0;">📚 Access pre-course materials (coming soon)</li>
                </ul>
              </div>

              <p style="margin-top: 30px;">
                Best Regards,<br>
                Olu Adedeji<br>
                Founder, Learnally
              </p>
            </div>
          `
        };

        await sendEmail(emailData);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail registration if email fails
      }

      setRegistrationStatus('success');
      setShowThankYou(true);

    } catch (error) {
      setRegistrationStatus('error');
      if (error instanceof Error) {
        if (error.message.includes('duplicate key')) {
          setRegistrationError('This email is already registered');
        } else if (error.message.includes('network')) {
          setRegistrationError('Network error. Please check your connection');
        } else {
          console.error('Registration error:', error);
          setRegistrationError('An unexpected error occurred. Please try again');
        }
      } else {
        setRegistrationError('Failed to register. Please try again.');
      }
    }
  };

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
            <p className="text-gray-400 text-sm mt-1">⚡ Early Bird Price - Limited Time Only ⚡<b> Launching Feb 14th, 2025</b> </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterUser} className="p-6">
          {showThankYou ? (
            <ThankYouPage 
              formData={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                tier: formData.tier
              }} 
              onClose={onClose} 
            />
          ) : (
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
                    rows={1}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Right Column - Plan Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Choose Your Plan 👇</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <div className="flex flex-col h-full">
                        <div>
                          <h4 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                            {tier.name}
                          </h4>
                          <ul className="mt-2 space-y-1">
                            {tier.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-xs text-gray-400">
                                <CheckCircle className="w-3 h-3 text-blue-400" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-auto text-right">
                          <p className="text-2xl font-bold">${tier.price}</p>
                          <p className="text-sm text-yellow-400">one-time</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation and Submit */}
          {!showThankYou && (
            <div className="flex justify-between pt-6 border-t border-gray-800">
              <button
                type="submit"
                disabled={!formData.tier || !formData.email || !formData.firstName || !formData.lastName || registrationStatus === 'loading'}
                className={`ml-auto bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full font-semibold 
                  ${registrationStatus === 'loading' ? 'opacity-50' : 'hover:opacity-90'} 
                  transition-all duration-300 flex items-center gap-2 group`}
              >
                {registrationStatus === 'loading' ? (
                  'Registering...'
                ) : (
                  <>
                    Secure My Spot
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}

          {registrationError && (
            <p className="text-red-500 text-sm mt-2">
              {registrationError}
            </p>
          )}

          {/* Privacy Policy */}
          {!showThankYou && (
            <p className="text-xs text-center text-gray-500 mt-4">
              By submitting this form, you agree to our{' '}
              <a href="/privacy.html" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PreOrderModal;