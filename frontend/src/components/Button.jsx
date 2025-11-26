export default function Button({ icon: Icon, type, sx, text, onClick }) {
  if (type === "toggle") {
    return (
      <button className="cursor-pointer" onClick={onClick}>
        {Icon && <Icon sx={sx} />}
      </button>
    );
  }
  if (type === "link") {
    return (
      <button className="cursor-pointer flex gap-2 px-3 py-1 bg-rose-600 hover:bg-rose-700 items-center rounded-2xl text-neutral-100 font-bold " onClick={onClick}>
        {Icon && <Icon sx={sx} />}
        {text}
      </button>
    );
  }
}
