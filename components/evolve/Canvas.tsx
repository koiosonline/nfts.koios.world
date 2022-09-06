import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useEvolveStore } from "@/state/store";

const Canvas = ({ draw, height, width }: any) => {
  const canvas: any = useRef();
  const actions = useEvolveStore((state) => state.actions);

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    draw(context);
  });

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    draw(context);
  }, [actions]);

  return (
    <canvas
      className="h-full w-full"
      ref={canvas}
      height={height}
      width={width}
    />
  );
};

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Canvas;
