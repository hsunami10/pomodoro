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

const HomePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState(INITIAL_STATE);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });

    if (ref?.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

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

  // const CANVAS_VIRTUAL_WIDTH = 1366;
  // const CANVAS_VIRTUAL_HEIGHT = 768;

  return (
    <div className={styles.container} ref={ref}>
      <Stage width={width} height={height}>
        <Layer>
          <Text text="Try to drag a star" />
          {renderStars()}
        </Layer>
      </Stage>
    </div>
  );
};

export default HomePage;
