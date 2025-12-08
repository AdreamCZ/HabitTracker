"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { AddHabitForm } from "@/app/(navbar)/(settings)/components/manage-habits/add-habit-sub-card/add-habit-form";
import type { Habit } from "@/lib/db/schema/schema";

type AddHabitDialogProps = {
  habitsUserDoesNotHave: Habit[];
};

export const AddHabitDialog = ({
  habitsUserDoesNotHave,
}: AddHabitDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="gap-2 bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Add Habit</span>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Habit"
      >
        <AddHabitForm
          habitsUserDoesNotHave={habitsUserDoesNotHave}
          onSuccess={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
};
