import React from 'react';
import { VoucherCoupon } from '../types';
import { playUiClick, playSuccessChime } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle,
  Crown,
  Heart,
  Utensils,
  Film,
  Compass,
  Tag,
  Gift,
  RotateCcw,
} from 'lucide-react';

interface VouchersSectionProps {
  coupons: VoucherCoupon[];
  onRedeemCoupon: (couponId: string) => void;
  onResetCoupons: () => void;
  girlfriendName: string;
}

export const VouchersSection: React.FC<VouchersSectionProps> = ({
  coupons,
  onRedeemCoupon,
  onResetCoupons,
  girlfriendName,
}) => {
  const handleRedeem = (coupon: VoucherCoupon) => {
    if (coupon.isRedeemed) return;
    playSuccessChime();

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E50914', '#FFB703', '#FFFFFF', '#FF4D6D'],
    });

    onRedeemCoupon(coupon.id);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Utensils':
        return <Utensils size={20} className="text-amber-400" />;
      case 'Crown':
        return <Crown size={20} className="text-yellow-400" />;
      case 'Film':
        return <Film size={20} className="text-blue-400" />;
      case 'Compass':
        return <Compass size={20} className="text-emerald-400" />;
      case 'Heart':
        return <Heart size={20} className="text-pink-400" fill="currentColor" />;
      default:
        return <Sparkles size={20} className="text-[#E50914]" />;
    }
  };

  return (
    <div id="vouchers" className="py-10 md:py-14 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#E50914] text-[10px] font-black uppercase tracking-wider text-white shadow">
                VIP BENEFIT PASSES
              </span>
              <Gift size={18} className="text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {girlfriendName}'s Birthday Gift & Date Vouchers
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5 font-light">
              Guaranteed 100% redeemable anytime, anywhere. No expiration date forever.
            </p>
          </div>

          <button
            onClick={() => {
              playUiClick();
              onResetCoupons();
            }}
            className="text-xs text-gray-300 hover:text-white flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#222] border border-neutral-700 hover:border-neutral-500 rounded transition-colors self-start sm:self-auto shadow"
          >
            <RotateCcw size={13} />
            <span>Reset All Passes</span>
          </button>
        </div>

        {/* Vouchers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`relative rounded overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-2xl ${
                coupon.isRedeemed
                  ? 'bg-[#181818]/60 border-neutral-800 opacity-75'
                  : 'bg-[#181818] border-neutral-700/80 hover:border-neutral-500 hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              {/* Ticket Top Notch Cutout & Header */}
              <div className="p-5 relative">
                {/* Red ribbon line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E50914] via-red-600 to-pink-600" />

                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded bg-[#222] border border-neutral-700 flex items-center justify-center shrink-0">
                      {getIcon(coupon.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        {coupon.category}
                      </span>
                      <span className="block text-[11px] font-mono text-[#E50914] font-semibold">
                        {coupon.code}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-[#222] border border-neutral-700 rounded-full text-[10px] font-bold text-amber-400">
                    {coupon.badge}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-white mb-2">
                  {coupon.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4 font-light">
                  {coupon.description}
                </p>

                {/* Perks Checklist */}
                <div className="space-y-1.5 py-2 border-t border-neutral-800">
                  {coupon.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-400">
                      <Sparkles size={12} className="text-[#E50914] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ticket Bottom Tear Line & Action */}
              <div className="p-4 bg-neutral-950/90 border-t border-dashed border-neutral-800 flex items-center justify-between relative">
                {/* Simulated Ticket Cutout Circles */}
                <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#141414]" />
                <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#141414]" />

                {coupon.isRedeemed ? (
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold w-full justify-center py-1">
                    <CheckCircle size={16} />
                    <span>Redeemed on {coupon.redeemedAt || 'Special Day'} ❤️</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-1 text-[11px] text-gray-400">
                      <Tag size={12} />
                      <span>Valid Forever</span>
                    </div>

                    <button
                      onClick={() => handleRedeem(coupon)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
                    >
                      <span>Redeem Voucher</span>
                      <Sparkles size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
