"use client";

import { type ReactNode, useState, useTransition } from "react";
import { toast } from "sonner";

import { removeUserHabit } from "@/app/modules/userHabit/actions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type UserHabitDeleteDialogProps = {
  userHabitId: string;
  habitName: string;
  children: ReactNode;
};

export const UserHabitDeleteDialog = ({
  userHabitId,
  habitName,
  children,
}: UserHabitDeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await removeUserHabit(userHabitId);

      if (result.success) {
        toast.success("Habit deleted successfully");
        setIsOpen(false);
      } else {
        toast.error(result.error ?? "Failed to delete habit");
      }
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium">Delete habit?</h4>
            <p className="text-sm text-muted-foreground">
              This will permanently delete &quot;{habitName}&quot; and all its
              tracking data. This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="ghostDestructive"
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
