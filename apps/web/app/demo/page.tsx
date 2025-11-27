'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

// ============================================================================
// Types
// ============================================================================

type ManufacturingProcess = 'fdm' | 'sla' | 'cnc' | 'laser';
type Material = string;
type Currency = 'MXN' | 'USD' | 'EUR';

interface QuoteBreakdown {
  materialCost: number;
  machineCost: number;
  laborCost: number;
}

interface DemoQuote {
  unitPrice: number;
  totalPrice: number;
  estimatedHours: number;
  estimatedDays: number;
  breakdown: QuoteBreakdown;
}

// ============================================================================
// Sample Data & Pricing Logic
// ============================================================================

const PROCESSES: { id: ManufacturingProcess; name: string; description: string; icon: string }[] = [
  { id: 'fdm', name: 'FDM 3D Printing', description: 'Fused Deposition Modeling - Best for prototypes', icon: '🖨️' },
  { id: 'sla', name: 'SLA 3D Printing', description: 'Stereolithography - High detail parts', icon: '💎' },
  { id: 'cnc', name: 'CNC Machining', description: 'Precision metal & plastic parts', icon: '⚙️' },
  { id: 'laser', name: 'Laser Cutting', description: '2D cutting for flat materials', icon: '✂️' },
];

const MATERIALS: Record<ManufacturingProcess, { id: Material; name: string; pricePerCm3: number }[]> = {
  fdm: [
    { id: 'pla', name: 'PLA', pricePerCm3: 2.5 },
    { id: 'abs', name: 'ABS', pricePerCm3: 3.0 },
    { id: 'petg', name: 'PETG', pricePerCm3: 3.2 },
    { id: 'tpu', name: 'TPU (Flexible)', pricePerCm3: 5.0 },
    { id: 'nylon', name: 'Nylon', pricePerCm3: 6.5 },
  ],
  sla: [
    { id: 'resin_standard', name: 'Standard Resin', pricePerCm3: 4.5 },
    { id: 'resin_tough', name: 'Tough Resin', pricePerCm3: 6.0 },
    { id: 'resin_flexible', name: 'Flexible Resin', pricePerCm3: 7.5 },
  ],
  cnc: [
    { id: 'aluminum_6061', name: 'Aluminum 6061', pricePerCm3: 15.0 },
    { id: 'steel_304', name: 'Stainless Steel 304', pricePerCm3: 25.0 },
    { id: 'brass', name: 'Brass', pricePerCm3: 20.0 },
    { id: 'delrin', name: 'Delrin/POM', pricePerCm3: 8.0 },
  ],
  laser: [
    { id: 'acrylic_3mm', name: 'Acrylic 3mm', pricePerCm3: 1.5 },
    { id: 'acrylic_6mm', name: 'Acrylic 6mm', pricePerCm3: 2.5 },
    { id: 'wood_3mm', name: 'Plywood 3mm', pricePerCm3: 1.0 },
    { id: 'mdf_6mm', name: 'MDF 6mm', pricePerCm3: 1.2 },
  ],
};

const SAMPLE_PROJECTS = [
  {
    id: 'gear',
    name: 'Mechanical Gear',
    process: 'fdm' as ManufacturingProcess,
    material: 'petg',
    dimensions: { x: 50, y: 50, z: 15 },
    quantity: 4,
    image: '⚙️',
  },
  {
    id: 'enclosure',
    name: 'Electronics Enclosure',
    process: 'fdm' as ManufacturingProcess,
    material: 'abs',
    dimensions: { x: 120, y: 80, z: 40 },
    quantity: 1,
    image: '📦',
  },
  {
    id: 'jewelry',
    name: 'Custom Ring',
    process: 'sla' as ManufacturingProcess,
    material: 'resin_standard',
    dimensions: { x: 25, y: 25, z: 8 },
    quantity: 2,
    image: '💍',
  },
  {
    id: 'bracket',
    name: 'Mounting Bracket',
    process: 'cnc' as ManufacturingProcess,
    material: 'aluminum_6061',
    dimensions: { x: 80, y: 40, z: 10 },
    quantity: 10,
    image: '🔩',
  },
  {
    id: 'sign',
    name: 'Custom Sign',
    process: 'laser' as ManufacturingProcess,
    material: 'acrylic_6mm',
    dimensions: { x: 300, y: 200, z: 6 },
    quantity: 1,
    image: '🪧',
  },
];

const DEMO_QUOTE_LIMIT = 5;

function calculateDemoQuote(
  process: ManufacturingProcess,
  material: Material,
  volume: number,
  quantity: number
): DemoQuote {
  const materials = MATERIALS[process];
  const materialData = materials.find((m) => m.id === material) || materials[0];
  const pricePerCm3 = materialData?.pricePerCm3 || 3.0;

  const volumeCm3 = volume / 1000; // mm³ to cm³

  // Base costs
  const materialCost = volumeCm3 * pricePerCm3 * quantity;
  const machineCost = volumeCm3 * 1.5 * quantity; // Machine time cost
  const laborCost = 50 + (quantity > 5 ? quantity * 5 : quantity * 10); // Setup + per-part labor

  // Process-specific multipliers
  const processMultiplier = {
    fdm: 1.0,
    sla: 1.3,
    cnc: 2.0,
    laser: 0.8,
  }[process];

  const totalPrice = (materialCost + machineCost + laborCost) * processMultiplier;
  const unitPrice = totalPrice / quantity;

  // Estimate time
  const hoursPerCm3 = { fdm: 0.5, sla: 0.3, cnc: 1.0, laser: 0.1 }[process];
  const estimatedHours = Math.max(1, volumeCm3 * hoursPerCm3 * quantity);
  const estimatedDays = Math.ceil(estimatedHours / 8) + 2; // Add shipping buffer

  return {
    unitPrice: Math.round(unitPrice * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    estimatedHours: Math.round(estimatedHours * 10) / 10,
    estimatedDays,
    breakdown: {
      materialCost: Math.round(materialCost * 100) / 100,
      machineCost: Math.round(machineCost * processMultiplier * 100) / 100,
      laborCost: Math.round(laborCost * 100) / 100,
    },
  };
}

function formatCurrency(amount: number, currency: Currency): string {
  const symbols = { MXN: '$', USD: '$', EUR: '€' };
  const formatted = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${symbols[currency]}${formatted} ${currency}`;
}

// ============================================================================
// Components
// ============================================================================

function ProcessCard({
  process,
  isSelected,
  onSelect,
}: {
  process: typeof PROCESSES[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-xl border-2 text-left transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
      }`}
    >
      <div className="text-2xl mb-2">{process.icon}</div>
      <div className="font-medium text-gray-900 dark:text-white">{process.name}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{process.description}</div>
    </button>
  );
}

function SampleProjectCard({
  project,
  onSelect,
}: {
  project: typeof SAMPLE_PROJECTS[0];
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 text-left transition-all"
    >
      <div className="text-3xl mb-2">{project.image}</div>
      <div className="font-medium text-sm text-gray-900 dark:text-white">{project.name}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {project.dimensions.x}×{project.dimensions.y}×{project.dimensions.z}mm
      </div>
    </button>
  );
}

// ============================================================================
// Main Demo Page
// ============================================================================

export default function Primavera3DDemo() {
  const [process, setProcess] = useState<ManufacturingProcess>('fdm');
  const [material, setMaterial] = useState<Material>('pla');
  const [quantity, setQuantity] = useState(1);
  const [dimensions, setDimensions] = useState({ x: 50, y: 50, z: 50 });
  const [currency, setCurrency] = useState<Currency>('MXN');
  const [quote, setQuote] = useState<DemoQuote | null>(null);
  const [quotesUsed, setQuotesUsed] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);

  const volume = dimensions.x * dimensions.y * dimensions.z;

  const handleProcessChange = (newProcess: ManufacturingProcess) => {
    setProcess(newProcess);
    const availableMaterials = MATERIALS[newProcess];
    if (availableMaterials && availableMaterials.length > 0) {
      setMaterial(availableMaterials[0].id);
    }
  };

  const handleSelectProject = (project: typeof SAMPLE_PROJECTS[0]) => {
    setProcess(project.process);
    setMaterial(project.material);
    setDimensions(project.dimensions);
    setQuantity(project.quantity);
  };

  const handleCalculate = useCallback(() => {
    if (quotesUsed >= DEMO_QUOTE_LIMIT) {
      setShowUpsell(true);
      return;
    }

    const result = calculateDemoQuote(process, material, volume, quantity);
    setQuote(result);
    setQuotesUsed((prev) => prev + 1);
  }, [process, material, volume, quantity, quotesUsed]);

  const handleProceedToCheckout = () => {
    setShowUpsell(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏭</span>
            <div>
              <h1 className="font-bold text-xl text-gray-900 dark:text-white">Primavera3D</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Instant Quote Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
              {DEMO_QUOTE_LIMIT - quotesUsed} quotes left
            </span>
            <Link
              href="/quote"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Full Calculator →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Instant Manufacturing Quote
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Get instant price estimates for 3D printing, CNC machining, and laser cutting.
            Try our calculator with sample projects below!
          </p>
        </div>

        {/* Sample Projects */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Quick Start: Try a Sample Project
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {SAMPLE_PROJECTS.map((project) => (
              <SampleProjectCard
                key={project.id}
                project={project}
                onSelect={() => handleSelectProject(project)}
              />
            ))}
          </div>
        </div>

        {/* Quote Calculator */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="space-y-6">
            {/* Process Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Manufacturing Process
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PROCESSES.map((p) => (
                  <ProcessCard
                    key={p.id}
                    process={p}
                    isSelected={process === p.id}
                    onSelect={() => handleProcessChange(p.id)}
                  />
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Material
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {MATERIALS[process]?.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} - ${m.pricePerCm3}/cm³
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dimensions (mm)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['x', 'y', 'z'] as const).map((axis) => (
                  <div key={axis}>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      {axis === 'x' ? 'Width' : axis === 'y' ? 'Depth' : 'Height'}
                    </label>
                    <input
                      type="number"
                      value={dimensions[axis]}
                      onChange={(e) =>
                        setDimensions((d) => ({ ...d, [axis]: Number(e.target.value) || 0 }))
                      }
                      min={1}
                      max={500}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Volume: {(volume / 1000).toFixed(1)} cm³
              </div>
            </div>

            {/* Quantity & Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  min={1}
                  max={1000}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="MXN">🇲🇽 MXN - Mexican Peso</option>
                  <option value="USD">🇺🇸 USD - US Dollar</option>
                  <option value="EUR">🇪🇺 EUR - Euro</option>
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={quotesUsed >= DEMO_QUOTE_LIMIT}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors"
            >
              {quotesUsed >= DEMO_QUOTE_LIMIT
                ? 'Demo Limit Reached - Sign Up for Unlimited'
                : 'Get Instant Quote'}
            </button>

            {/* Quote Result */}
            {quote && (
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <div className="text-center">
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                    Estimated Total
                  </div>
                  <div className="text-4xl font-bold text-green-700 dark:text-green-300">
                    {formatCurrency(quote.totalPrice, currency)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {formatCurrency(quote.unitPrice, currency)} per unit × {quantity}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-green-200 dark:border-green-700">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Production Time</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ~{quote.estimatedHours} hours
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Delivery</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ~{quote.estimatedDays} days
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Cost Breakdown</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Material</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatCurrency(quote.breakdown.materialCost, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Machine Time</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatCurrency(quote.breakdown.machineCost, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Labor & Setup</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatCurrency(quote.breakdown.laborCost, currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="mt-6 w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Proceed to Payment →
                </button>
              </div>
            )}
          </div>
        </div>

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
          <div className="flex items-center gap-2">
            <span>🇲🇽</span>
            <span>Made in Mexico</span>
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
      </main>

      {/* Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏭</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {quotesUsed >= DEMO_QUOTE_LIMIT ? 'Demo Complete!' : 'Ready to Order?'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {quotesUsed >= DEMO_QUOTE_LIMIT
                  ? `You've explored ${DEMO_QUOTE_LIMIT} quotes in this demo. Sign up to get unlimited quotes and place real orders!`
                  : 'Create a free account to save your quote and complete your order with secure payment.'}
              </p>

              <div className="space-y-4 text-left mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Unlimited instant quotes
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Secure payment via OXXO, SPEI, or card
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Real-time order tracking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Upload your own CAD files
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/quote"
                  className="block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Get Started Free →
                </Link>
                <button
                  onClick={() => setShowUpsell(false)}
                  className="w-full py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
                >
                  Continue Exploring Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
