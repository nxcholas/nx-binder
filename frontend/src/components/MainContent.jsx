function MainContent({ children }) {
  return (
    <div className="min-h-[91vh] max-h-screen overflow-y-hidden flex flex-col items-center md:ml-[340px] justify-center">
      {children}
    </div>
  );
}
export default MainContent;
