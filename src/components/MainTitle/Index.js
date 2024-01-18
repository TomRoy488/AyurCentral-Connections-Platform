function MainTitle({ children, tag = "h2", titleStyle = "" }) {
  const Tag = `${tag}`;
  return <Tag className={`font-bold ${titleStyle}`}>{children}</Tag>;
}

export default MainTitle;
