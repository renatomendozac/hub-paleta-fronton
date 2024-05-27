const Tag = ({ label, onClick }) => {
  return (
    <span
      className={'text-xs py-1 px-2 m-1 rounded bg-main text-main font-bold cursor-pointer'}
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export default Tag
