import React, { useState, useEffect, useRef } from 'react';
import { generateImage } from '../services/geminiService';

interface DynamicImageProps {
  prompt: string;
  altText: string;
  className?: string;
}

const ImageSkeleton: React.FC = () => (
    <div className="w-full h-full bg-gray-700 animate-pulse"></div>
);

const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1770&auto=format&fit=crop';

const ImageError: React.FC<{ message: string }> = ({ message }) => {
    console.error("Image Generation Error:", message);
    
    let displayMessage;
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('rate limit') || lowerCaseMessage.includes('quota')) {
        displayMessage = "Image generation limit over.";
    } else if (lowerCaseMessage.includes('safety')) {
        displayMessage = "Image blocked by safety policies. Please adjust your prompt.";
    } else {
        displayMessage = "The image service is currently unavailable.";
    }

    return (
        <div className="relative w-full h-full bg-slate-800">
            <img 
                src={FALLBACK_IMAGE_URL} 
                alt="A scenic view of mountains and a lake as a placeholder" 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white bg-black/60">
                <p className="font-semibold text-lg">Could Not Create Image</p>
                <p className="text-sm text-slate-300 mt-1">{displayMessage}</p>
            </div>
        </div>
    );
};


const DynamicImage: React.FC<DynamicImageProps> = ({ prompt, altText, className }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || status !== 'idle') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus('loading');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [status]);

  useEffect(() => {
    if (status !== 'loading' || !prompt) return;

    let isCancelled = false;
    const fetchImage = async () => {
      try {
        const url = await generateImage(prompt);
        if (!isCancelled) {
          setImageUrl(url);
          setStatus('success');
        }
      } catch (err) {
        if (!isCancelled) {
          const message = err instanceof Error ? err.message : 'An unknown error occurred.';
          setErrorMessage(message);
          setStatus('error');
        }
      }
    };
    
    fetchImage();

    return () => { isCancelled = true; };
  }, [status, prompt]);

  return (
    <div ref={containerRef} className="aspect-video w-full bg-gray-800 rounded-lg overflow-hidden">
      {status === 'idle' && <ImageSkeleton />}
      {status === 'loading' && <ImageSkeleton />}
      {status === 'error' && <ImageError message={errorMessage} />}
      {status === 'success' && imageUrl && (
        <img 
            src={imageUrl} 
            alt={altText} 
            className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
            onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default DynamicImage;
