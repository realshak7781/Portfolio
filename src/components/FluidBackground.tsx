import React, { useEffect, useRef } from 'react';

export const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL Fluid Simulation
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl2', { alpha: true, depth: false, antialias: false, preserveDrawingBuffer: false }) ||
           canvas.getContext('webgl', { alpha: true, depth: false, antialias: false, preserveDrawingBuffer: false });
    } catch {
      gl = null;
    }

    if (!gl) {
      // Fallback: render dynamic ambient particles on 2D context
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animId: number;
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
      const colors = ['rgba(1, 113, 227, 0.08)', 'rgba(133, 110, 217, 0.08)', 'rgba(50, 150, 150, 0.08)'];
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: 120 + Math.random() * 180,
          color: colors[i % colors.length],
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -p.radius) p.x = canvas.width + p.radius;
          if (p.x > canvas.width + p.radius) p.x = -p.radius;
          if (p.y < -p.radius) p.y = canvas.height + p.radius;
          if (p.y > canvas.height + p.radius) p.y = -p.radius;

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        animId = requestAnimationFrame(draw);
      };
      draw();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
      };
    }

    // High performance WebGL fluid trail
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      prevX: window.innerWidth * 0.5,
      prevY: window.innerHeight * 0.5,
      down: false,
      moved: false,
      color: [0.004, 0.443, 0.89], // #0171E3
    };

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl?.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Vertex & fragment shaders for fluid trail
    const vertexShaderSrc = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = `
      precision mediump float;
      uniform vec2 uResolution;
      uniform vec2 uPointer;
      uniform vec2 uPrevPointer;
      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;

      void main () {
        vec2 st = gl_FragCoord.xy / uResolution;
        vec2 p = uPointer / uResolution;
        p.y = 1.0 - p.y;
        
        float dist = distance(st, p);
        float glow = exp(-dist * 8.0);
        
        // Fluid smoke harmonic disturbance
        float wave = sin(st.x * 12.0 + uTime * 1.5) * cos(st.y * 12.0 + uTime * 1.2) * 0.05;
        glow += exp(-distance(st + wave, p) * 14.0) * 0.6;
        
        vec3 col = uColor * glow * 0.35;
        gl_FragColor = vec4(col, glow * 0.28);
      }
    `;

    const compileShader = (type: number, src: string) => {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSrc);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.useProgram(program);

    // Quad buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uResolution');
    const uPtr = gl.getUniformLocation(program, 'uPointer');
    const uPrevPtr = gl.getUniformLocation(program, 'uPrevPointer');
    const uCol = gl.getUniformLocation(program, 'uColor');
    const uT = gl.getUniformLocation(program, 'uTime');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let startTime = performance.now();
    let currentColorIndex = 0;
    const palette = [
      [0.004, 0.443, 0.89], // #0171E3 Blue
      [0.2, 0.588, 0.588],  // #329696 Teal
      [0.52, 0.43, 0.85],   // #856ED9 Purple
    ];

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      pointer.x = clientX;
      pointer.y = clientY;
      pointer.moved = true;

      // Cycle colors smoothly
      if (Math.hypot(pointer.x - pointer.prevX, pointer.y - pointer.prevY) > 8) {
        currentColorIndex = (currentColorIndex + 0.05) % palette.length;
        const idx = Math.floor(currentColorIndex);
        const nextIdx = (idx + 1) % palette.length;
        const frac = currentColorIndex - idx;
        pointer.color = [
          palette[idx][0] * (1 - frac) + palette[nextIdx][0] * frac,
          palette[idx][1] * (1 - frac) + palette[nextIdx][1] * frac,
          palette[idx][2] * (1 - frac) + palette[nextIdx][2] * frac,
        ];
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    const render = () => {
      if (!gl || !program) return;
      const time = (performance.now() - startTime) * 0.001;

      // Smooth easing of fluid motion towards pointer
      pointer.prevX += (pointer.x - pointer.prevX) * 0.08;
      pointer.prevY += (pointer.y - pointer.prevY) * 0.08;

      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uPtr, pointer.x, pointer.y);
      gl.uniform2f(uPrevPtr, pointer.prevX, pointer.prevY);
      gl.uniform3f(uCol, pointer.color[0], pointer.color[1], pointer.color[2]);
      gl.uniform1f(uT, time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
    };
  }, []);

  return (
    <>
      {/* Background WebGL Canvas */}
      <canvas
        id="fluid"
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 h-screen w-screen opacity-70 dark:opacity-40 transition-opacity"
      />
      {/* Soft ambient edge vignettes */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-radial from-transparent via-transparent to-neutral-200/20 dark:to-black/50" />
    </>
  );
};
