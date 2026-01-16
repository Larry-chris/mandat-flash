export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-300 py-20 px-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">1. Data Collection</h2>
                    <p>
                        We collect your email address to manage your account. We do NOT store your credit card information; payments are securely processed by Paddle.com.
                    </p>

                    <h2 className="text-xl font-bold text-white">2. AI Data Processing</h2>
                    <p>
                        Data submitted to the Service (property addresses, context notes) is processed by third-party AI providers (Google Gemini via API) solely to generate your report. This data is not shared with other third parties for marketing purposes.
                    </p>

                    <h2 className="text-xl font-bold text-white">3. Your Rights</h2>
                    <p>
                        You have the right to request access to or deletion of your personal data at any time by contacting us at support@mandat-flash.com.
                    </p>
                </section>
            </div>
        </div>
    );
}