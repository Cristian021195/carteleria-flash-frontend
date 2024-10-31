interface IProps {
    opn:boolean,
    children: React.ReactNode
}
export const AccordionHorizontal = ({opn, children}:IProps) => {
  return (
    <div
      className={`grid overflow-hidden transition-all duration-300 ${
          opn
          ? "grid-cols-[1fr] opacity-100"
          : "grid-cols-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
          {children}
      </div>
    </div>
  );
};