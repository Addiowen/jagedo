import { Tooltip } from "rizzui";

function calculatePercentage(total: number, value: number) {
    const percentage = (value / total) * 100;
    return percentage.toFixed(0);
  }

export default function CustomSlider({
    // title,
    total,
    value,
  }: {
    // title: string;
    total: number;
    value: number;
  }) {
    const percentage = calculatePercentage(total, value);
    return (
      <div className="group">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="font-medium text-gray-900"><span className="text-lg">{percentage}%</span>  ongoing...</p>
          {/* <div className="flex items-center">
            <span className="font-medium text-gray-900">${value}</span> &nbsp;
            <span>/${total}</span>
          </div> */}
        </div>
        <div className="relative h-2.5 w-full rounded-lg bg-gray-100">
            {/* the fill */}
          <div
            style={{ width: `${percentage}%` }}
            className="h-full rounded-lg bg-[#1477EB]"
          />
          <div className="absolute left-0 top-1/2 flex h-0 w-full -translate-y-1/2 items-center bg-black/50">
            <div className="max-auto relative w-full">
              <Tooltip
                className="dark:bg-gray-200 dark:text-gray-900"
                placement="top"
                content={<span>{percentage}%</span>}
              >
                <span
                  style={{ left: `${percentage}%` }}
                  className="absolute top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full border-[5.5px] border-gray-0  bg-[#1477EB] opacity-0 shadow-md duration-100 group-hover:scale-100 group-hover:opacity-100 dark:border-muted"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }