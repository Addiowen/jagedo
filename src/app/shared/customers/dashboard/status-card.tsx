// 'use client';

// import WidgetCard from "@/components/cards/widget-card";

// // import { useState } from 'react';
// // import { DatePicker } from '@/components/ui/datepicker';
// // import WidgetCard from '@/components/cards/widget-card';
// // import {
// //   RadialBarChart,
// //   RadialBar,
// //   Legend,
// //   ResponsiveContainer,
// // } from 'recharts';
// // import cn from '@/utils/class-names';
// // import { useMedia } from '@/hooks/use-media';


// // export default function PromotionalSales2({
// //   className,
// // }: {
// //   className?: string;
// // }) {
// //   const isMobile = useMedia('(max-width: 480px)', false);
// //   return (
// //     <WidgetCard>
      
// //     </WidgetCard>
// //   );
// // }

// const items: StatusCardItem[] = [
//   { text: 'Project X Completed', subText: 'Yesterday' },
//   { text: '3 New Tasks Added', subText: '2h ago' },
//   { text: 'Meeting with Client', subText: 'Tomorrow at 10:00 AM' },
//   { text: 'Report Due', subText: 'In 3 days' },
// ];

// interface StatusCardItem {
//   text: string;
//   subText?: string;
// }

// const StatusCard = ({ title, items, seeAllText }: StatusCardProps) => {
//   return (
//     <WidgetCard>
//     <div className="status-card">
//       <div className="status-card-header">
//         <h2>{title}</h2>
//         {seeAllText && <p>{seeAllText}</p>}
//       </div>
//       <div className="status-card-body">
//         {items.map((item) => (
//           <div key={item.text} className="status-card-item">
//             <p>{item.text}</p>
//             {item.subText && <p className="status-card-subtext">{item.subText}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//     </WidgetCard>
//   );
  
// };

// interface StatusCardProps {
//   title: string;
//   items: StatusCardItem[];
//   seeAllText?: string;
//   className?: string;
// }

// export default StatusCard;

'use client';

import React from 'react';
import WidgetCard3 from '@/components/cards/widget-card3';

interface StatusCardItem {
  text: string;
  subText?: string;
}

interface StatusCardProps {
  title: string;
  items: StatusCardItem[];
  seeAllText?: string;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  items,
  seeAllText,
  className,
  headerClassName,
  titleClassName,
  actionClassName,
  descriptionClassName,
}) => {
  return (
    <WidgetCard3
      title={title}
      action={seeAllText ? <p>{seeAllText}</p> : undefined}
      className={className}
      headerClassName={headerClassName}
      titleClassName={titleClassName}
      actionClassName={actionClassName}
      descriptionClassName={descriptionClassName}
    >
      <div className="status-card-body">
        {items.map((item) => (
          <div key={item.text} className="status-card-item flex justify-between">
            <p>{item.text}</p>
            {item.subText && <p className="status-card-subtext text-right">{item.subText}</p>}
          </div>
        ))}
      </div>
    </WidgetCard3>
  );
};

export default StatusCard;

