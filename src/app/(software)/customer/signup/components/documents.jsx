'use client';
import { ShieldHalf, Check, IdCard, ReceiptText, Hotel, Paperclip, X } from 'lucide-react';
import { useState } from 'react';

export default function DocumentsPage({ onSubmit, onSkip, isLoading }) {
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [errors, setErrors] = useState({});

    let features = [
        {
            icon: (
                <div className="w-6 h-6 bg-[#3ccb72] rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                </div>
            ),
            title: "256-bit SSL encryption"
        },
        {
            icon: (
                <div className="w-6 h-6 bg-[#3ccb72] rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                </div>
            ),
            title: "GDPR compliant storage"
        },
        {
            icon: (
                <div className="w-6 h-6 bg-[#3ccb72] rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                </div>
            ),
            title: "Instant verification"
        }
    ];

    let cards = [
        {
            id: 'identity',
            icon: { icon: IdCard, bg: "#DBEAFE", color: "#2563EB" },
            title: "Identity Proof",
            desc: "Aadhaar Card, PAN Card, or Business Registration Certificate",
            type: "PDF, JPG, PNG (Max 10MB)",
        },
        {
            id: 'gst',
            icon: { icon: ReceiptText, bg: "#DCFCE7", color: "#16A34A" },
            title: "GST Certificate",
            desc: "Valid GST registration certificate",
            type: "PDF, JPG, PNG (Max 10MB)",
        },
        {
            id: 'company',
            icon: { icon: Hotel, bg: "#F3E8FF", color: "#9333EA" },
            title: "Company Registration",
            desc: "Certificate of Incorporation or Partnership Deed",
            type: "PDF, JPG, PNG (Max 10MB)",
        },
        {
            id: 'additional',
            icon: { icon: Paperclip, bg: "#FFEDD5", color: "#EA580C" },
            title: "Additional Documents",
            desc: "Bank statements, utility bills, or other supporting documents",
            type: "Multiple files allowed",
        }
    ];

    const validateFile = (file) => {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

        if (file.size > maxSize) {
            return 'File size must be less than 10MB';
        }

        if (!allowedTypes.includes(file.type)) {
            return 'Only PDF, JPG, and PNG files are allowed';
        }

        return null;
    };

    const handleFileUpload = (cardId, event) => {
        const files = Array.from(event.target.files);
        const validFiles = [];
        const fileErrors = [];

        files.forEach(file => {
            const error = validateFile(file);
            if (error) {
                fileErrors.push(`${file.name}: ${error}`);
            } else {
                validFiles.push(file);
            }
        });

        if (fileErrors.length > 0) {
            setErrors(prev => ({
                ...prev,
                [cardId]: fileErrors.join(', ')
            }));
            return;
        }

        // Clear errors for this card
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[cardId];
            return newErrors;
        });

        // Store files
        setUploadedFiles(prev => ({
            ...prev,
            [cardId]: cardId === 'additional' ? [...(prev[cardId] || []), ...validFiles] : validFiles
        }));
    };

    const removeFile = (cardId, fileIndex) => {
        setUploadedFiles(prev => ({
            ...prev,
            [cardId]: prev[cardId]?.filter((_, index) => index !== fileIndex) || []
        }));
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(uploadedFiles);
        }
    };

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const hasAnyFiles = Object.values(uploadedFiles).some(files => files && files.length > 0);

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
            {/* Left Panel */}
            <div
                className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-20 py-10 text-white flex flex-col justify-center"
                style={{
                    background: 'linear-gradient(to bottom right, #166534, #538E69)',
                    minHeight: '100vh',
                }}
            >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-5 lg:items-start lg:text-left lg:space-y-0">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 lg:mb-4">
                        <ShieldHalf size={22} className="text-white" />
                    </div>
                    <h1 className="text-[22px] sm:text-[25px] font-semibold mb-2">Secure Document Upload</h1>
                    <p className="text-[16px] sm:text-[18px] mt-2 mb-4">
                        Upload your KYC documents securely. All files are encrypted and stored safely to ensure your privacy and compliance.
                    </p>
                    <div className="space-y-4 mt-4 relative w-full flex flex-col items-center lg:items-start">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center justify-center lg:justify-start">
                                {feature.icon}
                                <span className="ml-3 text-md">{feature.title}</span>
                            </div>
                        ))}
                        <img
                            src="/securitylogo.png"
                            alt="security"
                            className="absolute bottom-5 left-0 w-36 opacity-10 hidden sm:block"
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex flex-col flex-1 p-4 sm:p-8 md:p-10">
                <h1 className="text-[20px] sm:text-[24px] md:text-[25px] font-semibold text-black">
                    Upload KYC Documents
                </h1>
                <p className="text-[#4B5563] mb-5 text-sm sm:text-base">
                    Please upload the required documents to complete your verification
                </p>

                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="border border-dotted border-[#737475] rounded-xl p-4 flex flex-col gap-2 mb-5"
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="h-10 w-10 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: card.icon.bg }}
                            >
                                <card.icon.icon size={23} style={{ color: card.icon.color }} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-md font-semibold text-black">{card.title}</h3>
                                <p className="text-sm text-gray-600">{card.desc}</p>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                <label className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white text-sm rounded-md cursor-pointer w-fit hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Choose File
                                    <input 
                                        type="file" 
                                        hidden 
                                        multiple={card.id === 'additional'}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileUpload(card.id, e)}
                                        disabled={isLoading}
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-1 sm:mt-0">{card.type}</p>
                            </div>

                            {/* Display uploaded files */}
                            {uploadedFiles[card.id] && uploadedFiles[card.id].length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {uploadedFiles[card.id].map((file, fileIndex) => (
                                        <div key={fileIndex} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2">
                                            <div className="flex items-center gap-2">
                                                <Check size={16} className="text-green-600" />
                                                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                                <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                                            </div>
                                            <button
                                                onClick={() => removeFile(card.id, fileIndex)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                disabled={isLoading}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Display errors */}
                            {errors[card.id] && (
                                <p className="text-red-500 text-xs mt-2">{errors[card.id]}</p>
                            )}
                        </div>
                    </div>
                ))}

                <hr className="border-t border-gray-200 mb-4" />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <button 
                        onClick={handleSkip}
                        disabled={isLoading}
                        className="text-gray-600 text-sm w-full sm:w-auto mb-2 sm:mb-0 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Skip for now
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-[#166534] text-white text-sm px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-1 w-full sm:w-auto hover:bg-[#14532d] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                {hasAnyFiles ? 'Upload & Continue' : 'Continue'} <span className="text-lg">→</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}