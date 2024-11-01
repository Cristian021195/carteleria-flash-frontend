interface IProps {
    opn:boolean,
    children: React.ReactNode
}
export const Accordion = ({opn, children}:IProps) => {
  return (
    <div className="">
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-sm ${
            opn
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
            {children}
        </div>
      </div>
    </div>
  );
};