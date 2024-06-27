const Tag = ({ label, onClick }) => {
  return (
    <span
      className="text-xs py-1 px-2 m-1 rounded bg-secondary text-secondary font-semibold cursor-pointer"
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export default Tag
