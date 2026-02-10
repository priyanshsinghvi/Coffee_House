'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FRAME_PATH = '/frames';

// Dynamically import the scroll component to avoid SSR
const ScrollAnimatedHero = dynamic(() => import('./ScrollAnimatedHero'), {
    ssr: false,
    loading: () => (
        <div className="relative h-screen bg-[#1A0F0A] flex flex-col items-center justify-center">
            <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden mb-4">
                <div className="h-full w-0 bg-gradient-to-r from-[#D4A574] to-[#4F9C8F]" />
            </div>
            <p className="text-amber-100/70 text-lg font-sans">
                Initializing...
            </p>
        </div>
    )
});

export default function HeroCanvasAnimation() {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const loadImages = async () => {
            const imagePromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = `${FRAME_PATH}/frame_${i}.jpg`;
                    img.onload = () => {
                        setLoadProgress((prev) => Math.min(prev + (100 / TOTAL_FRAMES), 100));
                        resolve(img);
                    };
                    img.onerror = reject;
                });
            });

            try {
                const loadedImages = await Promise.all(imagePromises);
                setImages(loadedImages);
                setImagesLoaded(true);
            } catch (error) {
                console.error("Failed to load images", error);
            }
        };

        loadImages();
    }, [isMounted]);

    if (!isMounted || !imagesLoaded) {
        return (
            <div className="relative h-screen bg-[#1A0F0A] flex flex-col items-center justify-center">
                <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden mb-4">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#D4A574] to-[#4F9C8F]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${loadProgress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <p className="text-amber-100/70 text-lg font-sans">
                    Loading Experience... {Math.round(loadProgress)}%
                </p>
            </div>
        );
    }

    return <ScrollAnimatedHero images={images} />;
}
