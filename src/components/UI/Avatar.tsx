import Image from "next/image";
// utils/svg
import IsConfirmed from "../../utils/svg/confirmed.svg";
import AvatarSvg from "../../utils/svg/avatar.svg";

type AvatarProps = {
  src: string | null | undefined;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;

  isConfirmed?: boolean;
};

const Avatar = ({
  src,
  width = 20,
  height = 20,

  isConfirmed = false,

  className = "",

  onClick,
}: AvatarProps) => {
  return (
    <div
      style={{
        height,
        width,
      }}
      className="relative"
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt="avatar"
          width={width}
          height={height}
          className={className}
        />
      ) : (
        <AvatarSvg 
        width={width}
        height={height}
        className={className}
      />
      )}

      {isConfirmed && (
        <div className="absolute bottom-0 right-[-2px] bg-white rounded-full">
          <IsConfirmed width={15} fill="#4971FF" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
