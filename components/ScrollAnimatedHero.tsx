'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const TOTAL_FRAMES = 192;

interface ScrollAnimatedHeroProps {
    images: HTMLImageElement[];
}

export default function ScrollAnimatedHero({ images }: ScrollAnimatedHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scrollVelocity = useVelocity(scrollYProgress);
    const yOffset = useTransform(scrollVelocity, [-1, 0, 1], [15, 0, -15]);
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    const section1Opacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
    const section2Opacity = useTransform(smoothProgress, [0.3, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
    const section3Opacity = useTransform(smoothProgress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
    const section4Opacity = useTransform(smoothProgress, [0.9, 0.92, 0.98, 1], [0, 1, 1, 0]);
    const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const handleResize = () => {
            if (!canvasRef.current) return;

            const dpr = window.devicePixelRatio || 1;
            canvasRef.current.width = window.innerWidth * dpr;
            canvasRef.current.height = window.innerHeight * dpr;

            canvasRef.current.style.width = `${window.innerWidth}px`;
            canvasRef.current.style.height = `${window.innerHeight}px`;

            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.scale(dpr, dpr);
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
            }
            renderFrame();
        };

        const renderFrame = () => {
            const currentFrame = Math.round(frameIndex.get());
            const img = images[Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1))];

            if (img && canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                // Use logical dimensions for calculations as context is scaled
                const scale = Math.max(
                    window.innerWidth / img.width,
                    window.innerHeight / img.height
                );

                const x = (window.innerWidth - img.width * scale) / 2;
                const y = (window.innerHeight - img.height * scale) / 2;

                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        // Initialize canvas size
        handleResize();

        // Subscribe to frame changes
        const unsubscribe = frameIndex.on('change', renderFrame);

        // Handle window resize
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <motion.div style={{ y: yOffset }} className="w-full h-full">
                    <canvas ref={canvasRef} className="w-full h-full" />
                </motion.div>

                {/* Text Overlays */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                        style={{ opacity: section1Opacity }}
                        className="text-center px-4 absolute"
                    >
                        <h1 className="text-7xl md:text-9xl font-playfair font-bold text-amber-50 mb-4 tracking-tight">
                            Experience Coffee
                        </h1>
                        <p className="text-xl md:text-2xl text-amber-100/80 font-sans">
                            Where every sip defies gravity
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: section2Opacity }}
                        className="text-left pl-8 md:pl-16 pr-8 max-w-2xl absolute left-0"
                    >
                        <h2 className="text-5xl md:text-7xl font-playfair font-semibold text-amber-50 mb-3">
                            Crafted to Perfection
                        </h2>
                        <p className="text-lg md:text-xl text-amber-100/70 font-sans">
                            From bean to cup, excellence floats in every drop
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: section3Opacity }}
                        className="text-right px-8 md:px-16 max-w-2xl ml-auto absolute right-0"
                    >
                        <h2 className="text-5xl md:text-7xl font-playfair font-semibold text-amber-50 mb-3">
                            Best Coffee Roast Flavor
                        </h2>
                        <p className="text-lg md:text-xl text-amber-100/70 font-sans">
                            Defying expectations, elevating taste beyond limits
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: section4Opacity }}
                        className="text-center px-4 absolute"
                    >
                        <h2 className="text-6xl md:text-8xl font-playfair font-bold text-amber-50 mb-6">
                            Discover Your Blend
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold shadow-2xl pointer-events-auto"
                        >
                            Explore Collection ↓
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <p className="text-amber-100/60 text-sm font-sans tracking-wider uppercase">
                        Scroll to Explore
                    </p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-amber-100/40 rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-3 bg-amber-100/60 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
