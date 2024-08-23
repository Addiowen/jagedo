import { Badge } from 'rizzui';

const data = [
  {},
  //   {
  //     SiteConditions: 'Construction site Ongoing',
  //     'Deadline for Quoatation Submition': '3/4/2024, 7.00am',
  //     Specifications: 'Plumber-Busted Pipe',
  //     'Job No': 'A01137-RFQ',
  //   },
  //   {
  //     'Invoice date': 'Jun 15, 2023',
  //     'Package Type': 'Flat small box',
  //     'Courier Company': 'Cargus',
  //   },
  //   {
  //     'Delivery time': 'TNT 10-14 DAYS',
  //     'Payment Method': 'Cash on delivery',
  //     'Shipping Mode': 'Next Day',
  //   },
];

export default function EvaluateQuotations() {
  return (
    <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4">
      <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">SiteConditions :</span>
          Construction
        </li>
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">Deadline:</span>
          3/4/2024, 7.00am
        </li>
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">Specifications :</span>
          Busted Pipe
        </li>
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">Job No :</span>
          A01137-RFQ
        </li>
      </ul>
      {data.map((item, index) => (
        <ul key={index} className="mt-3 grid gap-3 @5xl:mt-0">
          {Object.entries(item).map(([key, value]) => (
            <li key={key} className="flex items-center gap-3">
              <span className="font-semibold text-gray-900">{key} :</span>
              {/* <span>{value}</span> */}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
