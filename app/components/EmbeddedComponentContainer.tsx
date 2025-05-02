const EmbeddedComponentContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`group relative p-[6px] transition-border duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default EmbeddedComponentContainer;
