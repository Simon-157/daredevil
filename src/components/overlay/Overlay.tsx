import "./overlay.css"

export const GridOverlay = () => {
  return (
    <>
      <div className="absolute overflow-hidden inset-0 bg-grid bg-center mask  "></div>
      <div className="bg-gradient"></div>
    </>
  );
};
