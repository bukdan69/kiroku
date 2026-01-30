import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-primary to-cyan-500 text-white shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/50 hover:scale-105",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:bg-secondary/80 hover:scale-105",
        destructive:
          "border-transparent bg-gradient-to-r from-destructive to-red-600 text-white shadow-md shadow-destructive/30 hover:shadow-lg hover:shadow-destructive/50 hover:scale-105",
        outline: "text-foreground border-primary/30 hover:bg-primary/10 hover:border-primary hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }