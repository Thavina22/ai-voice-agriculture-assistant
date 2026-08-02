import React from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Inbox } from 'lucide-react';
import { MarketItem } from '@/types/api';

interface MarketPricesCardProps {
  data: MarketItem[];
  loading: boolean;
}

export const MarketPricesCard: React.FC<MarketPricesCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">APMC Mandi Market Prices</h3>
            <p className="text-xs text-gray-400">Live Commodity Rates</p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="py-6 text-center text-gray-400 text-xs flex flex-col items-center gap-1">
          <Inbox className="w-6 h-6 opacity-50" />
          <span>No market rate data available.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.commodity}</h4>
                <p className="text-[11px] text-gray-400">{item.market}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-gray-900 dark:text-white block">{item.price}</span>
                <span className={`text-[11px] font-semibold flex items-center justify-end gap-0.5 ${
                  item.is_up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {item.is_up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
