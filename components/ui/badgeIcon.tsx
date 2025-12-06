import {
  Sunrise,
  Zap,
  Tent,
  Binary,
  Moon,
  Brain,
  ShieldCheck,
  Award,
  Anchor,
  Leaf,
  Swords,
  Mountain,
  Sun,
  Rocket,
  Crown,
  HelpCircle,
  Footprints,
} from "lucide-react";
import React from "react";

type BadgeResource = {
  component: React.ElementType;
  color: string;
};

const badgeResources: Record<string, BadgeResource> = {
  Footprints: { component: Footprints, color: "text-slate-400" },
  Sunrise: { component: Sunrise, color: "text-orange-400" },
  Zap: { component: Zap, color: "text-yellow-400" },
  Tent: { component: Tent, color: "text-green-600" },
  Binary: { component: Binary, color: "text-blue-500" },
  Moon: { component: Moon, color: "text-indigo-400" },
  Brain: { component: Brain, color: "text-pink-500" },
  ShieldCheck: { component: ShieldCheck, color: "text-slate-500" },
  Award: { component: Award, color: "text-amber-600" },
  Anchor: { component: Anchor, color: "text-cyan-700" },
  Leaf: { component: Leaf, color: "text-emerald-500" },
  Swords: { component: Swords, color: "text-zinc-600" },
  Mountain: { component: Mountain, color: "text-stone-500" },
  Sun: { component: Sun, color: "text-yellow-500" },
  Rocket: { component: Rocket, color: "text-red-500" },
  Crown: { component: Crown, color: "text-amber-400" },
};

type BadgeIconProps = {
  name: string;
  className?: string;
};

export const BadgeIcon = ({ name, className = "" }: BadgeIconProps) => {
  const resource = badgeResources[name];

  if (!resource) {
    return <HelpCircle className={`text-gray-300 ${className}`} />;
  }

  const { component: IconComponent, color } = resource;

  return <IconComponent className={`${color} ${className}`} />;
};
