import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

const Icon = () =>
  new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: "#1f771c",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: 6,
        fontWeight: 700,
      }}
    >
      H
    </div>,
    {
      ...size,
    },
  );

export default Icon;
