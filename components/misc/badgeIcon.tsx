import {
	Sunrise, Zap, Tent, Binary, Moon, Brain, ShieldCheck,
	Award, Anchor, Leaf, Swords, Mountain, Sun, Rocket,
	Crown, HelpCircle
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
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
	Crown
};

interface BadgeIconProps {
	name: string;
	className?: string;
}

export const BadgeIcon = ({ name, className }: BadgeIconProps) => {
	const IconComponent = iconMap[name];

	if (!IconComponent) {
		return <HelpCircle className={className} />;
	}

	return <IconComponent className={className} />;
};