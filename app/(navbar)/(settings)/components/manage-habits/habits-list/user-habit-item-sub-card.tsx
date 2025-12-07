"use client";

import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

import { type UserHabitWithDetails } from "@/app/modules/userHabit/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateRelatively } from "@/lib/formatting-utils";

import { UserHabitEditForm } from "./user-habit-edit-form";
import { UserHabitDeleteDialog } from "./user-habit-delete-dialog";

type UserHabitItemProps = {
  item: UserHabitWithDetails;
};

export const UserHabitItemSubCard = ({ item }: UserHabitItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>
              Last logged: {formatDateRelatively(item.lastCompleted)}
              {" · "}
              Daily Cost: ${item.dailyCost ?? "0"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <X className="h-4 w-4" />
              ) : (
                <Pencil className="h-4 w-4" />
              )}
            </Button>
            <UserHabitDeleteDialog userHabitId={item.id} habitName={item.name}>
              <Button variant="ghostDestructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </UserHabitDeleteDialog>
          </div>
        </div>
      </CardHeader>
      {isEditing && (
        <UserHabitEditForm
          item={item}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      )}
    </Card>
  );
};
