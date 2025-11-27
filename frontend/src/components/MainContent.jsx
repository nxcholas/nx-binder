function MainContent({ children }) {
  return (
    <div className="min-h-[91vh] max-h-[91vh] overflow-y-auto flex flex-col items-center justify-center md:ml-[340px] px-16">
      {children}
    </div>
  );
}
export default MainContent;
