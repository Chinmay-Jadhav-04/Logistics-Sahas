'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '../components/footer/footer';

export default function ContactUs() {
    const router = useRouter();

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#f8f8f8] to-[#f8f8f8] flex flex-col items-center overflow-x-hidden">
            {/* Hero */}
            <div className="relative w-full h-[40vh] flex items-center justify-center">
                <Image
                    src="/bgimg3.webp"
                    alt="Contact Us Hero"
                    fill
                    className="object-cover brightness-75"
                    priority
                />
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 z-50 bg-white text-primary px-4 py-2 rounded-full shadow hover:bg-light-primary hover:text-white transition duration-300"
                >
                    ← Back
                </button>
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10">
                    <h1 className="text-white text-5xl font-extrabold drop-shadow-lg">Contact Us</h1>
                    <p className="text-white/90 text-lg mt-3">We’re here to help. Reach out anytime.</p>
                </div>
            </div>

            {/* Contact Section */}
            <div className="w-full max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form */}
                <div className="bg-white/90 p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-primary mb-6">Get in Touch</h2>
                    <form className="space-y-5">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                            required
                        />
                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#265a34] transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Info + Map */}
                <div className="flex flex-col justify-between">
                    <div className="bg-white/90 p-8 rounded-2xl shadow-xl mb-6">
                        <h3 className="text-2xl font-bold text-primary mb-4">Our Office</h3>
                        <p className="text-light-primary mb-2">Green Ocean Logistics</p>
                        <p className="text-light-primary mb-2">807, Haware Infotech Park,</p>
                        <p className="text-light-primary mb-2">Sector 30A, Opposite Inorbit Mall, Vashi,</p>
                        <p className="text-light-primary mb-2">Navi Mumbai, Maharashtra, INDIA-400703</p>
                        <p className="text-light-primary mb-2">Email: support@greenocean.com</p>
                        <p className="text-primary">Phone: +91 9892464661</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl h-64">
                        <iframe
                            title="GOL Office Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4743.152752343176!2d72.99754982609038!3d19.065771382136628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1000eda57b1%3A0xbc66e4b2bdfbf86e!2sHaware%20infotech%20park!5e1!3m2!1sen!2sin!4v1750672639150!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </section>
    );
}
