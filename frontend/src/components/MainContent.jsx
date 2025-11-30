function MainContent({ children }) {
  return (
    <div className="min-h-[91vh] max-h-screen overflow-y-auto flex flex-col items-stretch md:ml-[340px] px-16">
      {children}
    </div>
  );
}
export default MainContent;
