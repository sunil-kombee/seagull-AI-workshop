import React from "react";
import clsx from "clsx";

export type Step = {
  label: string;
  icon?: React.ReactNode;
};

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0-based index
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <nav
      className={clsx(
        "flex items-center justify-center w-full py-4 sm:py-6",
        className
      )}
      aria-label="Progress"
    >
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        return (
          <div key={step.label} className="flex items-center gap-2 sm:gap-3">
            <div
              className={clsx(
                "flex items-center justify-center rounded-full border-2 font-bold transition-colors",
                "w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl",
                isActive
                  ? "bg-primary text-white border-primary shadow-lg"
                  : isCompleted
                  ? "bg-primary/10 text-primary border-primary"
                  : "bg-muted text-muted-foreground border-border"
              )}
            >
              {step.icon ? step.icon : <span>{idx + 1}</span>}
            </div>
            <span
              className={clsx(
                "text-base sm:text-lg font-semibold transition-colors",
                isActive
                  ? "text-primary"
                  : isCompleted
                  ? "text-primary/80"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <span className="hidden sm:block w-16 h-1 bg-border mx-2 rounded-full" />
            )}
            {idx < steps.length - 1 && (
              <span className="block sm:hidden w-8 h-0.5 bg-border mx-1 rounded-full" />
            )}
          </div>
        );
      })}
    </nav>
  );
};
