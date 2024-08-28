import { useEffect, useRef } from "react";

export default function PdfViewerComponent({ document }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit, instance;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      if (instance) PSPDFKit.unload(container);

      instance = await PSPDFKit.load({
        container,
        document,
        baseUrl: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.BASE_URL
        }`,
        toolbarItems: [], // Hide all toolbar items
        viewState: new PSPDFKit.ViewState({
          scrollMode: PSPDFKit.ScrollMode.VERTICAL, // Enable vertical scrolling
        }),
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [document]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        margin:"40px",
        top: 2,
        left: 2,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: 1000,
      }} // Set position to fixed and occupy full viewport
    />
  );
}
