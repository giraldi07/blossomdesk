import { ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

type TrendProps = {
  value: string;
  isPositive: boolean;
  text: string;
};

type StatsCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: TrendProps;
};

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <div className="card transition-transform duration-200 hover:shadow-md hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-xs">
              <span className={trend.isPositive ? 'text-success' : 'text-destructive'}>
                {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
              <span className={`ml-1 ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
                {trend.value}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">{trend.text}</span>
            </div>
          )}
        </div>
        <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;