import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Star } from 'react-konva'; // TODO: Use minimal imports - https://www.npmjs.com/package/react-konva#minimal-bundle
import Konva from 'konva';
import styles from './HomePage.module.css';

interface ShapeState {
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
}

function generateShapes(): ShapeState[] {
  return [...Array<undefined>(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

/**
 * Links to where I found the logic:
 *  - https://stackoverflow.com/a/70608516/9477827
 *  - https://stackoverflow.com/a/49973424/9477827
 *  - https://dev.to/robotspacefish/resizing-html5-canvas-and-scaling-sprites-5cpe
 */
const HomePage = () => {
  const CANVAS_VIRTUAL_WIDTH = 1366;
  const CANVAS_VIRTUAL_HEIGHT = 768;

  // Native game resolution (does not change)
  const NATIVE_WIDTH = CANVAS_VIRTUAL_WIDTH;
  const NATIVE_HEIGHT = CANVAS_VIRTUAL_HEIGHT;

  // % of browser window to be taken up by the canvas
  const windowPercentage = 0.9; // TODO: Change this later when full screen & moving out of react-router

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [scale, setScale] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState(INITIAL_STATE);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      let newWidth = event[0].contentBoxSize[0].inlineSize;
      let newHeight = event[0].contentBoxSize[0].blockSize;

      const nativeRatio = NATIVE_WIDTH / NATIVE_HEIGHT;
      const browserWindowRatio = newWidth / newHeight;

      // the browser window is too wide
      if (browserWindowRatio > nativeRatio) {
        // take up 90% of window height divisible by tile size
        // height must be changed first since width is based on it
        newHeight = Math.floor(newHeight * windowPercentage);
        // if (newHeight > maxWidth) newHeight = maxHeight;
        newWidth = Math.floor(newHeight * nativeRatio);
      } else {
        // browser window is too high
        // take up 90% of window width divisible by tile size
        // width must be changed first since height is based on it
        newWidth = Math.floor(newWidth * windowPercentage);
        // if (newWidth > maxWidth) newWidth = maxWidth;
        newHeight = Math.floor(newWidth / nativeRatio);
      }

      const scale = Math.min(
        newWidth / CANVAS_VIRTUAL_WIDTH,
        newHeight / CANVAS_VIRTUAL_HEIGHT,
      );
      setWidth(newWidth);
      setHeight(newHeight);
      setScale(scale);
    });

    if (ref?.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, NATIVE_WIDTH, NATIVE_HEIGHT]);

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      }),
    );
  };
  const handleDragEnd = () => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      }),
    );
  };

  const renderStars = () => {
    return stars.map((star) => (
      <Star
        key={star.id}
        id={star.id}
        x={star.x}
        y={star.y}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill="#89b717"
        opacity={0.8}
        draggable
        rotation={star.rotation}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={star.isDragging ? 10 : 5}
        shadowOffsetY={star.isDragging ? 10 : 5}
        scaleX={star.isDragging ? 1.2 : 1}
        scaleY={star.isDragging ? 1.2 : 1}
        onMouseDown={handleDragStart}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    ));
  };

  return (
    <div className={styles.container} ref={ref}>
      <Stage
        className={styles.stage}
        width={width}
        height={height}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer>
          <Text text="Try to drag a star" />
          {renderStars()}
        </Layer>
      </Stage>
    </div>
  );
};

export default HomePage;
