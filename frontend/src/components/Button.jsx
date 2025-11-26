export default function Button({ icon: Icon, type, sx, text, onClick, }) {
  if (type === "toggle") {
    return (
      <button className="cursor-pointer rounded-lg p-1 bg-gray-700 text-gray-300 hover:bg-gray-800" onClick={onClick}>
        {Icon && <Icon sx={sx} />}
      </button>
    );
  }
  if (type === "link") {
    return (
      <button className="cursor-pointer flex gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-800 items-center rounded-xl text-neutral-100 font-bold " onClick={onClick}>
        {Icon && <Icon sx={sx} />}
        {text}
      </button>
    );
  }
}
