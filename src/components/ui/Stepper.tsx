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
        "flex items-center justify-center gap-4 w-full",
        className
      )}
      aria-label="Progress"
    >
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        return (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={clsx(
                "flex items-center justify-center rounded-full w-8 h-8 border-2 transition-colors",
                isActive
                  ? "bg-primary text-white border-primary"
                  : isCompleted
                  ? "bg-primary/10 text-primary border-primary"
                  : "bg-muted text-muted-foreground border-border"
              )}
            >
              {step.icon ? (
                step.icon
              ) : (
                <span className="font-bold">{idx + 1}</span>
              )}
            </div>
            <span
              className={clsx(
                "text-sm font-medium",
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
              <span className="w-8 h-0.5 bg-border mx-2" />
            )}
          </div>
        );
      })}
    </nav>
  );
};
