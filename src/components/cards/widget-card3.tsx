import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import { ForwardedRef, forwardRef } from 'react';

const widgetCardClasses = {
  base: 'border border-muted bg-gray-0 p-5 dark:bg-gray-50 lg:p-7',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type WidgetCardTypes = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof widgetCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

const WidgetCard3 = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<WidgetCardTypes>
>(
  (
    {
      title,
      action,
      description,
      rounded = 'DEFAULT',
      className,
      headerClassName,
      actionClassName,
      titleClassName,
      descriptionClassName,
      children,
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          widgetCardClasses.base,
          widgetCardClasses.rounded[rounded],
          className
        )}
        ref={ref}
      >
        <div
          className={cn(
            action && 'flex items-start justify-between',
            headerClassName
          )}
        >
          {/* Title takes 1/3 of the space */}
          <div className="flex-grow basis-1/3">
            <Title
              as="h3"
              className={cn(
                'text-base font-semibold sm:text-lg',
                titleClassName
              )}
            >
              {title}
            </Title>
            {description && (
              <div className={descriptionClassName}>{description}</div>
            )}
          </div>

          {/* Action takes 2/3 of the space */}
          {action && (
            <div
              className={cn(
                'flex flex-grow basis-2/3 items-center ps-2',
                actionClassName
              )}
            >
              {action}
            </div>
          )}
        </div>

        {children}
      </div>
    );
  }
);

export default WidgetCard3;
WidgetCard3.displayName = 'WidgetCard';
