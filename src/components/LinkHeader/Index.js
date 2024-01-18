function LinkHeader({
  navigate,
  setSelectPage,
  link,
  children,
  isLink = false,
  fontSize = `text-[1.5rem]`,
}) {
  return (
    <div
      className={`link-item link-${link?.title}  w-full  bg-white p-[1rem] rounded-[.5rem]`}
      key={link?.id}
    >
      <h2
        className={`font-bold ${fontSize} my-[.3rem] flex w-fit ${
          isLink && `cursor-pointer  hover:underline hover:decoration-solid`
        }  `}
        onClick={() => {
          if (!isLink) {
            return;
          }
          setSelectPage(link?.id);
          navigate(`/links/${link?.title.toLowerCase().replaceAll(" ", "")}`);
        }}
      >
        {link?.title}
      </h2>
      <h3 className="font-semibold my-[.5rem]  text-[#0c3ebb] cursor-pointer flex w-fit">
        <a href={link?.link} target="_blank" rel="noopener noreferrer">
          {link?.link}
        </a>
      </h3>
      <p>
        <a href={link?.long_url}>{link?.long_url}</a>
      </p>
      <div className="mt-[1rem] flex  items-center gap-[1rem] border-t-[2px] border-solid border-[#e8ebf2] pt-[.5rem]">
        {children}
      </div>
    </div>
  );
}

export default LinkHeader;
