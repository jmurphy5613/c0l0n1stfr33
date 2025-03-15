'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Application, extend } from '@pixi/react';
import { 
  Container, 
  Graphics,
  Text as PixiText,
} from 'pixi.js';

// Extend PixiJS components to use in JSX
extend({
  Container,
  Graphics,
  Text: PixiText,
});

type ResourceType = 'wood' | 'brick' | 'sheep' | 'wheat' | 'ore' | 'desert';

interface Tile {
  id: number;
  resource: ResourceType;
  number: number | null;
  x: number;
  y: number;
}

interface Vertex {
  id: number;
  x: number;
  y: number;
  settlement: string | null; // null, 'settlement', or 'city'
  player: number | null;
}

interface Edge {
  id: number;
  vertices: [number, number];
  road: boolean;
  player: number | null;
}

const resourceColors = {
  wood: 0x2e7d32, // dark green
  brick: 0xb71c1c, // dark red
  sheep: 0x81c784, // light green
  wheat: 0xfdd835, // yellow
  ore: 0x607d8b, // gray
  desert: 0xe0e0e0, // light gray
};

const CatanBoard: React.FC = () => {
  // Constants for hex dimensions
  const hexRadius = 60;
  const hexHeight = hexRadius * 2;
  const hexWidth = Math.sqrt(3) * hexRadius;
  const boardRadius = 3; // Number of hexes from center to edge
  
  // Generate initial board state
  const generateBoard = () => {
    const tiles: Tile[] = [];
    const vertices: Vertex[] = [];
    const edges: Edge[] = [];
    
    // Resources distribution (simplified for this example)
    const resources: ResourceType[] = [
      'wood', 'wood', 'wood', 'wood',
      'brick', 'brick', 'brick',
      'sheep', 'sheep', 'sheep', 'sheep',
      'wheat', 'wheat', 'wheat', 'wheat',
      'ore', 'ore', 'ore',
      'desert'
    ];
    
    // Numbers distribution (2-12, excluding 7)
    const numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
    
    // Shuffle resources and numbers
    resources.sort(() => Math.random() - 0.5);
    numbers.sort(() => Math.random() - 0.5);
    
    let tileId = 0;
    let numbersIndex = 0;
    
    // Create tiles in a spiral pattern
    const directions = [
      { q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 1 },
      { q: -1, r: 0 }, { q: 0, r: -1 }, { q: 1, r: -1 }
    ];
    
    let q = 0, r = 0;
    tiles.push({
      id: tileId++,
      resource: resources[0],
      number: resources[0] === 'desert' ? null : numbers[numbersIndex++],
      x: 0,
      y: 0
    });
    
    for (let radius = 1; radius <= boardRadius; radius++) {
      // Move to the starting position of this ring
      q = 0;
      r = -radius;
      
      // Follow each side of the ring
      for (let side = 0; side < 6; side++) {
        const dir = directions[side];
        
        // Move along this side of the ring
        for (let i = 0; i < radius; i++) {
          q += dir.q;
          r += dir.r;
          
          const resourceIndex = tileId % resources.length;
          const resource = resources[resourceIndex];
          
          // Convert axial coordinates to pixel position
          const x = hexWidth * (q + r/2) * 0.75;
          const y = hexHeight * r * 0.5;
          
          tiles.push({
            id: tileId++,
            resource,
            number: resource === 'desert' ? null : numbers[numbersIndex++ % numbers.length],
            x,
            y
          });
        }
      }
    }
    
    // TODO: Add logic to generate vertices and edges
    
    return { tiles, vertices, edges };
  };
  
  const [board, setBoard] = useState(generateBoard);
  
  // Add zoom state
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);
  
  // Generate points for a hexagon
  const hexPoints = (x: number, y: number): [number, number][] => {
    const points: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push([
        x + hexRadius * Math.cos(angle),
        y + hexRadius * Math.sin(angle)
      ]);
    }
    return points;
  };
  
  // Center the board in the canvas
  const canvasWidth = 800;
  const canvasHeight = 800;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  // Drawing functions for Graphics components
  const drawHex = useCallback((graphics: any, tile: Tile) => {
    const points = hexPoints(tile.x, tile.y);
    graphics.clear();
    graphics.beginFill(resourceColors[tile.resource]);
    graphics.lineStyle(2, 0x000000);
    graphics.moveTo(points[0][0], points[0][1]);
    
    for (let i = 1; i < 6; i++) {
      graphics.lineTo(points[i][0], points[i][1]);
    }
    
    graphics.lineTo(points[0][0], points[0][1]);
    graphics.endFill();
  }, [hexPoints]);

  const drawCircle = useCallback((graphics: any, x: number, y: number, radius: number, color: number) => {
    graphics.clear();
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, radius);
    graphics.endFill();
  }, []);
  
  // Handle zoom with mouse wheel
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    // Determine zoom direction
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    
    // Calculate new zoom level with limits
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.3), 3);
    
    setZoom(newZoom);
  }, [zoom]);
  
  // Add and remove wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);
  
  // Zoom control buttons
  const zoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };
  
  const zoomOut = () => {
    setZoom(prev => Math.max(prev * 0.8, 0.3));
  };
  
  const resetZoom = () => {
    setZoom(1);
  };
  
  return (
    <div className="catan-board-container">
      {/* Zoom controls */}
      <div className="zoom-controls">
        <button 
          onClick={zoomIn}
          className="zoom-btn"
          aria-label="Zoom in"
        >
          +
        </button>
        <button 
          onClick={resetZoom}
          className="zoom-btn"
          aria-label="Reset zoom"
        >
          Reset
        </button>
        <button 
          onClick={zoomOut}
          className="zoom-btn"
          aria-label="Zoom out"
        >
          -
        </button>
      </div>
      
      <div 
        ref={containerRef} 
        className="catan-board"
        style={{ position: 'relative', width: `${canvasWidth}px`, height: `${canvasHeight}px`, overflow: 'hidden' }}
      >
        <Application 
          width={canvasWidth} 
          height={canvasHeight}
          ref={appRef}
        >
          <pixiContainer 
            x={centerX} 
            y={centerY}
            scale={zoom}
          >
            {/* Render hex tiles */}
            {board.tiles.map((tile) => (
              <pixiContainer key={tile.id} x={tile.x} y={tile.y}>
                <pixiGraphics draw={(g) => drawHex(g, tile)} />
                
                {tile.number !== null && (
                  <>
                    <pixiGraphics draw={(g) => drawCircle(g, 0, 0, 20, 0xf5f5f5)} />
                    <pixiText 
                      text={tile.number.toString()} 
                      anchor={0.5}
                      style={{ 
                        fill: tile.number === 6 || tile.number === 8 ? 0xdd2c00 : 0x000000,
                        fontWeight: 'bold',
                        fontSize: 16
                      }}
                    />
                  </>
                )}
                
                {tile.resource === 'desert' && (
                  <pixiGraphics draw={(g) => drawCircle(g, 0, 0, 10, 0x000000)} />
                )}
              </pixiContainer>
            ))}
          </pixiContainer>
        </Application>
      </div>
      
      <div className="zoom-indicator">
        Zoom: {Math.round(zoom * 100)}%
      </div>
      
      <style jsx>{`
        .catan-board-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .zoom-controls {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }
        .zoom-btn {
          padding: 5px 10px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        .zoom-btn:hover {
          background-color: #e0e0e0;
        }
        .zoom-indicator {
          margin-top: 10px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default CatanBoard; 