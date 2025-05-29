'use client';
import { useEffect, useRef } from 'react';

interface Testimonial {
    id: number;
    author: string;
    content: string;
    rating: number;
    role: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        author: "Jean Dupont",
        content: "Plateforme pratique et équipe réactive",
        rating: 5,
        role: "Investisseur",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 2,
        author: "Marie Laurent",
        content: "Service d'investissement de qualité",
        rating: 5,
        role: "Propriétaire",
        image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
        id: 3,
        author: "Pierre Martin",
        content: "Excellent accompagnement personnalisé",
        rating: 5,
        role: "Investisseur",
        image: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
        id: 4,
        author: "Sophie Bernard",
        content: "Un service qui dépasse les attentes",
        rating: 5,
        role: "Propriétaire",
        image: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
        id: 5,
        author: "Lucas Dubois",
        content: "Expertise remarquable en immobilier",
        rating: 5,
        role: "Investisseur",
        image: "https://randomuser.me/api/portraits/men/54.jpg"
    }
];

const Testimonials = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let scrollPosition = 0;

        const scroll = () => {
            scrollPosition += 0.5;
            if (scrollContainer) {
                if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                    scrollPosition = 0;
                }
                scrollContainer.scrollLeft = scrollPosition;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        const handleMouseEnter = () => {
            cancelAnimationFrame(animationFrameId);
        };

        const handleMouseLeave = () => {
            animationFrameId = requestAnimationFrame(scroll);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    // Duplicate testimonials for infinite scroll effect
    const allTestimonials = [...testimonials, ...testimonials];

    return (
        <section 
            className="w-full bg-white pt-4 pb-8 overflow-hidden opacity-0 animate-fade-in"
            style={{
                animation: 'fadeIn 0.8s ease-out forwards'
            }}
        >
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    {renderStars(5)}
                    <span className="text-sm font-medium text-gray-600 ml-2">
                        34 avis clients
                    </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    Ce que pensent nos clients
                </h2>
            </div>

            <div 
                ref={scrollContainerRef}
                className="flex overflow-x-hidden gap-6 py-4 px-4 sm:px-6 lg:px-8"
            >
                {allTestimonials.map((testimonial, index) => (
                    <div
                        key={`${testimonial.id}-${index}`}
                        className="flex-none w-[300px] bg-white rounded-xl p-6 shadow-lg"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={testimonial.image}
                                alt={testimonial.author}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="ml-4">
                                <h3 className="font-medium text-gray-900">{testimonial.author}</h3>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                        <div className="flex mb-3">
                            {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-gray-600">{testimonial.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
