import { Icon } from "@iconify/react";

// TODO: show image instead of svg
export function Avatar({ src, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 2 20 20"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

export default function ({ myUsername, comment, deleteComment }) {
  return (
    <div className="flex ">
      <div className="flex">
        <div className="rounded-full bg-gray-700 w-12 h-12">
          <span className="flex justify-center w-full h-full">
            <Avatar className="h-20 w-20 text-gray-500 self-center p-[2px] mr-2" />
          </span>
        </div>
      </div>
      <div className="border-t-2 border-gray-700 rounded-xl mt-4 ml-[4px] bg-gray-800 text-gray-400 text-sm p-2 ">
        <div className="flex justify-between">
          <label>{comment.username}</label>
          {myUsername === comment.username && (
            <button onClick={() => deleteComment(comment.id)}>
              <Icon icon="la:trash-alt" />
            </button>
          )}
        </div>
        <div className="break-all bg-gray-800 text-gray-300">
          {comment.commentBody}
        </div>
      </div>
    </div>
  );
}
