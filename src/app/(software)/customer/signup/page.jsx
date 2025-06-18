'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import all components
import RegistrationLoginPage from './components/loginpage';
import DocumentsPage from './components/documents';
import EmailVerificationPage from './components/emailverification';
import RegistrationSuccess from './components/successpage';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    termsAccepted: false,
    documents: [],
    verificationCode: '',
    isEmailVerified: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Step 1: Handle registration form submission
  const handleRegistrationSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Here you would typically send data to your backend API
      console.log('Registration data:', data);
      
      // Update form data
      setFormData(prevData => ({
        ...prevData,
        ...data
      }));
      
      // Move to documents page
      setCurrentStep(2);
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle documents submission or skip
  const handleDocumentsSubmit = async (documents) => {
    setIsLoading(true);
    try {
      // Here you would upload documents to your backend
      console.log('Documents:', documents);
      
      setFormData(prevData => ({
        ...prevData,
        documents
      }));
      
      // Send OTP email
      await sendOTPEmail(formData.email);
      
      // Move to email verification
      setCurrentStep(3);
      
    } catch (error) {
      console.error('Document upload failed:', error);
      alert('Document upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle skip documents
  const handleSkipDocuments = async () => {
    setIsLoading(true);
    try {
      // Send OTP email
      await sendOTPEmail(formData.email);
      
      // Move to email verification
      setCurrentStep(3);
      
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP email function
  const sendOTPEmail = async (email) => {
    try {
      // Here you would call your backend API to send OTP via nodemailer
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
      
      console.log('OTP sent successfully to:', email);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  // Step 3: Handle email verification
  const handleEmailVerification = async (otp) => {
    setIsLoading(true);
    try {
      // Here you would verify OTP with your backend
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          otp 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid verification code');
      }
      
      setFormData(prevData => ({
        ...prevData,
        verificationCode: otp,
        isEmailVerified: true
      }));
      
      // Move to success page
      setCurrentStep(4);
      
    } catch (error) {
      console.error('Email verification failed:', error);
      alert('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      await sendOTPEmail(formData.email);
      alert('Verification code resent successfully!');
    } catch (error) {
      alert('Failed to resend verification code. Please try again.');
    }
  };

  // Step 4: Handle success page - redirect to dashboard
  const handleGoToDashboard = () => {
    router.push('/customers/dashboard');
  };

  // Modified components with props
  const ModifiedRegistrationPage = () => {
    return (
      <RegistrationLoginPage 
        onSubmit={handleRegistrationSubmit}
        formData={formData}
        isLoading={isLoading}
      />
    );
  };

  const ModifiedDocumentsPage = () => {
    return (
      <DocumentsPage 
        onSubmit={handleDocumentsSubmit}
        onSkip={handleSkipDocuments}
        isLoading={isLoading}
      />
    );
  };

  const ModifiedEmailVerificationPage = () => {
    return (
      <EmailVerificationPage 
        email={formData.email}
        onVerify={handleEmailVerification}
        onResend={handleResendOTP}
        isLoading={isLoading}
      />
    );
  };

  const ModifiedSuccessPage = () => {
    return (
      <RegistrationSuccess 
        onGoToDashboard={handleGoToDashboard}
        userInfo={formData}
      />
    );
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ModifiedRegistrationPage />;
      case 2:
        return <ModifiedDocumentsPage />;
      case 3:
        return <ModifiedEmailVerificationPage />;
      case 4:
        return <ModifiedSuccessPage />;
      default:
        return <ModifiedRegistrationPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of 4
              </span>
            </div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep 
                      ? 'bg-primary' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content with top padding for progress bar */}
      <div className="pt-16">
        {renderCurrentStep()}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="text-gray-700">Processing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;