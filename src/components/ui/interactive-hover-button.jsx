import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(
  ({ text = "Button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative w-40 cursor-pointer overflow-hidden rounded-full border bg-background p-3 text-center font-black tracking-widest",
          className
        )}
        {...props}
      >
        <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-16 group-hover:opacity-0">
          {text}
        </span>

        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>{text}</span>
          <ArrowRight />
        </div>

        <div className="absolute left-[25%] top-[45%] h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8]" />
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
