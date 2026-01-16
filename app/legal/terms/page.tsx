export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-300 py-20 px-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-sm text-slate-500 mb-8">Last Updated: January 2026</p>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">1. Introduction</h2>
                    <p>
                        These Terms of Service govern your use of "Mandat-Flash" (the "Service"), provided by <strong>L Company</strong>, a business entity registered in Benin.
                        By accessing our Service, you agree to these terms.
                    </p>

                    <h2 className="text-xl font-bold text-white">2. Payment Processing (Paddle)</h2>
                    <p className="bg-slate-900 p-4 rounded-lg border border-indigo-900/50">
                        Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.
                    </p>

                    <h2 className="text-xl font-bold text-white">3. Usage & AI</h2>
                    <p>
                        The Service uses Artificial Intelligence to generate reports. While we strive for accuracy, the output is for informational purposes only. You agree not to use the generated data to train competing AI models.
                    </p>

                    <h2 className="text-xl font-bold text-white">4. Governing Law</h2>
                    <p>
                        These terms shall be governed by the laws of Benin, without regard to its conflict of law provisions.
                    </p>
                </section>
            </div>
        </div>
    );
}