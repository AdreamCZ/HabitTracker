import Image from "next/image";

type AvatarProps = {
  src?: string | null;
  name?: string | null;
  size?: number; // default = 48
  className?: string;
};

const Avatar = ({ src, name, size = 48, className = "" }: AvatarProps) => {
  const initial = name?.charAt(0).toUpperCase() ?? "U";

  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "User"}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-gray-700 ${className}`}
    >
      {initial}
    </div>
  );
};

export default Avatar;
