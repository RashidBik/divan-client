import { Icon } from "@iconify/react";

export default function LikeButton({ count = 0, liked, onClick }) {
  console.log(count);

  return (
    <span className="flex items-center gap-2">
    <div className="pt-2">{`${count}`}</div>
      {liked ? (
        <Icon className="text-2xl" onClick={onClick} icon="bx:bxs-like" />
      ) : (
        <Icon
          className="text-2xl text-gray-400"
          onClick={onClick}
          icon="bx:like"
        />
      )}
    </span>
  );
}
