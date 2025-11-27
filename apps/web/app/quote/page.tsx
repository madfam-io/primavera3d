import { Metadata } from 'next';
import QuoteCheckout from '../../components/QuoteCheckout';

export const metadata: Metadata = {
  title: 'Get Instant Quote | Primavera3D',
  description:
    'Get instant manufacturing quotes for 3D printing, CNC machining, and laser cutting. Pay with card, OXXO, or SPEI.',
  openGraph: {
    title: 'Get Instant Quote | Primavera3D',
    description:
      'Get instant manufacturing quotes for 3D printing, CNC machining, and laser cutting.',
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Instant Manufacturing Quote
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Get an instant price estimate for your custom parts. We support 3D printing, CNC
            machining, and laser cutting.
          </p>
        </div>

        {/* Quote Calculator with Checkout */}
        <QuoteCheckout />

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏭</span>
            <span>Professional Manufacturing</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🚚</span>
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Accepted Payment Methods</p>
          <div className="flex justify-center gap-4 text-2xl">
            <span title="Credit/Debit Cards">💳</span>
            <span title="OXXO (Mexico)">🏪</span>
            <span title="SPEI Bank Transfer (Mexico)">🏦</span>
          </div>
        </div>
      </div>
    </main>
  );
}
