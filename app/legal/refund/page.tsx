export default function RefundPage() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-300 py-20 px-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1 className="text-3xl font-bold text-white mb-8">Refund Policy</h1>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">1. 7-Day Money-Back Guarantee</h2>
                    <p>
                        We want you to be satisfied with Mandat-Flash. If you are not happy with the service, you can request a full refund within 7 days of your initial purchase.
                    </p>

                    <h2 className="text-xl font-bold text-white">2. Conditions</h2>
                    <p>
                        To prevent abuse of our AI resources, the refund is only applicable if you have generated <strong>fewer than 3 full reports</strong> during this period.
                    </p>

                    <h2 className="text-xl font-bold text-white">3. How to Request</h2>
                    <p>
                        Simply email support@mandat-flash.com with your account email. We process refunds within 48 business hours via Paddle.
                    </p>
                </section>
            </div>
        </div>
    );
}