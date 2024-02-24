import { forwardRef } from 'react';
import './styles/widget-wrapper.css';

export interface WidgetWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetWrapper = forwardRef<HTMLDivElement, WidgetWrapperProps>(
  ({ className, ...args }, ref) => {
    return (
      <div ref={ref} className={`widget-wrapper ${className}`} {...args}></div>
    );
  },
);
