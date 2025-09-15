import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import html2pdf from 'html2pdf.js';
import './App.css';

// --- DUMMY DATA FOR TEMPLATES ---
const templates = {
  'ux-designer': {
    id: 'ux-designer',
    name: 'Sofia Chen - UX Designer',
    thumbnail: 'https://picsum.photos/id/1015/1200/900',
    data: {
      theme: {
        gradient: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
        primary: 'indigo-500',
        primaryBg: 'bg-indigo-500',
        primaryText: 'text-indigo-400',
        secondaryBg: 'bg-slate-50',
        background: 'bg-white',
        text: 'text-slate-800',
        heading: 'text-slate-900',
        subtleText: 'text-slate-600',
        cardBg: 'bg-white',
      },
      layout: 'standard',
      hero: {
        name: 'Sofia Chen',
        title: 'Product Designer & UX Strategist',
        imageUrl: 'https://picsum.photos/id/1027/400/400',
        bio: 'I specialize in creating intuitive, beautiful, and user-centric digital experiences that solve real-world problems and drive business growth.',
        cta: 'View My Work',
      },
      about: {
        heading: 'About Me',
        content: "I'm a passionate designer with over 8 years of experience. My design philosophy is rooted in empathy, ensuring every decision is backed by user research. I thrive in collaborative environments, working alongside developers and product managers to bring ideas to life.",
      },
      skills: {
        heading: 'Core Skills',
        items: ['UX Research', 'UI Design', 'Prototyping', 'Wireframing', 'User Testing', 'Figma', 'Adobe XD', 'Design Systems'],
      },
      projects: {
        heading: 'Featured Projects',
        items: [
          { id: 1, title: 'Fintech App Redesign', description: 'A complete overhaul of a mobile banking app to improve user flow and increase engagement.', imageUrl: 'https://picsum.photos/id/1/800/600', link: '#' },
          { id: 2, title: 'E-commerce Platform', description: 'Designing a scalable e-commerce solution for a luxury fashion brand.', imageUrl: 'https://picsum.photos/id/2/800/600', link: '#' },
          { id: 3, title: 'SaaS Dashboard Concept', description: 'A data-visualization dashboard for a B2B SaaS product, focusing on clarity.', imageUrl: 'https://picsum.photos/id/3/800/600', link: '#' },
        ],
      },
      contact: {
        heading: 'Get In Touch',
        email: 'sofia.chen@example.com',
        social: [ { name: 'LinkedIn', url: '#' }, { name: 'Dribbble', url: '#' }, { name: 'Twitter', url: '#' } ],
      },
    },
  },
  'developer': {
    id: 'developer',
    name: 'David Lee - Web Developer',
    thumbnail: 'https://picsum.photos/id/1078/1200/900',
    data: {
      theme: {
        gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700',
        primary: 'emerald-500',
        primaryBg: 'bg-emerald-500',
        primaryText: 'text-emerald-400',
        secondaryBg: 'bg-slate-800',
        background: 'bg-slate-900',
        text: 'text-slate-300',
        heading: 'text-white',
        subtleText: 'text-slate-400',
        cardBg: 'bg-slate-800/[0.5]',
      },
      layout: 'standard',
      hero: {
        name: 'David Lee',
        title: 'Full-Stack Web Developer',
        imageUrl: 'https://picsum.photos/id/1005/400/400',
        bio: 'Building robust, scalable, and efficient web applications from front to back. I turn complex problems into elegant software solutions.',
        cta: 'See My Code',
      },
      about: {
        heading: 'About Me',
        content: "I'm a developer with a passion for clean code and modern web technologies. I have 6 years of experience building applications using React, Node.js, and Python. My expertise lies in architecting RESTful APIs, managing databases, and creating responsive UIs.",
      },
       skills: {
        heading: 'Technologies',
        items: ['JavaScript (ES6+)', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS'],
      },
      projects: {
        heading: 'Recent Work',
        items: [
          { id: 1, title: 'Real-time Chat App', description: 'A WebSocket-based chat application using Node.js and React.', imageUrl: 'https://picsum.photos/id/10/800/600', link: '#' },
          { id: 2, title: 'API for Analytics Service', description: 'A high-throughput REST API built with Python (FastAPI) to handle millions of data points.', imageUrl: 'https://picsum.photos/id/11/800/600', link: '#' },
          { id: 3, 'title': 'Headless CMS Integration', 'description': 'Developed a corporate website using Next.js and a headless CMS.', imageUrl: 'https://picsum.photos/id/12/800/600', link: '#' },
        ],
      },
      contact: {
        heading: 'Contact Me',
        email: 'david.lee.dev@example.com',
        social: [ { name: 'GitHub', url: '#' }, { name: 'LinkedIn', url: '#' }, { name: 'Blog', url: '#' } ],
      },
    },
  },
  'photographer': {
    id: 'photographer',
    name: 'Maria Garcia - Photographer',
    thumbnail: 'https://picsum.photos/id/1040/1200/900',
    data: {
      theme: {
        gradient: 'bg-gradient-to-br from-stone-600 via-stone-800 to-black',
        primary: 'orange-500',
        primaryBg: 'bg-orange-500',
        primaryText: 'text-orange-400',
        secondaryBg: 'bg-stone-100',
        background: 'bg-white',
        text: 'text-stone-700',
        heading: 'text-stone-900',
        subtleText: 'text-stone-500',
        cardBg: 'bg-white',
      },
      layout: 'gallery',
      hero: {
        name: 'Maria Garcia',
        title: 'Travel & Lifestyle Photographer',
        imageUrl: 'https://picsum.photos/id/1012/400/400',
        bio: 'Capturing the world, one frame at a time. My work focuses on the intersection of light, nature, and human stories.',
        cta: 'Explore Galleries',
      },
      about: {
        heading: 'My Vision',
        content: 'Photography is more than just taking pictures; it\'s about telling stories and preserving moments. I travel the globe to find these moments, from the bustling streets of Tokyo to the serene landscapes of Patagonia. My goal is to evoke emotion through my lens.',
      },
      skills: {
        heading: 'Specializations',
        items: ['Landscape', 'Portraiture', 'Street Photography', 'Photo Editing (Lightroom)', 'Drone Videography'],
      },
      projects: {
        heading: 'Galleries',
        items: [
          { id: 1, title: 'Colors of Morocco', description: 'A visual journey through vibrant markets and deserts.', imageUrl: 'https://picsum.photos/id/1041/800/600', link: '#' },
          { id: 2, title: 'Patagonian Peaks', description: 'Capturing the raw, untamed beauty of the Andes.', imageUrl: 'https://picsum.photos/id/1043/800/600', link: '#' },
          { id: 3, title: 'Urban Reflections', description: 'A B&W series exploring the geometry of modern cities.', imageUrl: 'https://picsum.photos/id/1044/800/600', link: '#' },
          { id: 4, title: 'Coastal Dreams', description: 'The serene and powerful beauty of the Italian coastline.', imageUrl: 'https://picsum.photos/id/1045/800/600', link: '#' },
        ],
      },
      contact: {
        heading: 'Book a Shoot',
        email: 'maria.garcia.photo@example.com',
        social: [ { name: 'Instagram', url: '#' }, { name: 'Behance', url: '#' } ],
      },
    },
  },
    'writer': {
    id: 'writer',
    name: 'James Baldwin - Writer',
    thumbnail: 'https://picsum.photos/id/1067/1200/900',
    data: {
      theme: {
        gradient: 'bg-gradient-to-br from-green-800 to-teal-600',
        primary: 'teal-500',
        primaryBg: 'bg-teal-500',
        primaryText: 'text-teal-400',
        secondaryBg: 'bg-green-50',
        background: 'bg-white',
        text: 'text-slate-800',
        heading: 'text-slate-900',
        subtleText: 'text-slate-600',
        cardBg: 'bg-white',
      },
      layout: 'standard',
      hero: {
        name: 'James Baldwin',
        title: 'Author & Journalist',
        imageUrl: 'https://picsum.photos/id/1062/400/400',
        bio: 'Crafting narratives that explore the human condition, technology, and culture. My words aim to inform, challenge, and inspire.',
        cta: 'Read My Work',
      },
      about: {
        heading: 'My Journey',
        content: "I began my writing career as a journalist for a national newspaper, covering stories from the front lines of innovation. This experience ignited my passion for long-form storytelling, leading me to write two non-fiction books and numerous essays for acclaimed publications. I believe in the power of words to shape perspectives.",
      },
      skills: {
        heading: 'Expertise',
        items: ['Investigative Journalism', 'Copywriting', 'Content Strategy', 'Creative Non-Fiction', 'Technical Writing', 'SEO'],
      },
      projects: {
        heading: 'Selected Publications',
        items: [
          { id: 1, title: 'The Silicon Age (Book)', description: 'An exploration of how modern technology is reshaping our societies and our minds.', imageUrl: 'https://picsum.photos/id/20/800/600', link: '#' },
          { id: 2, title: 'Wired Magazine Feature', description: 'A deep-dive into the ethics of artificial intelligence and its future implications.', imageUrl: 'https://picsum.photos/id/21/800/600', link: '#' },
          { id: 3, title: 'Personal Blog', description: 'Weekly essays on productivity, creativity, and the writing process.', imageUrl: 'https://picsum.photos/id/22/800/600', link: '#' },
        ],
      },
      contact: {
        heading: 'Lets Collaborate',
        email: 'james.baldwin@example.com',
        social: [ { name: 'Twitter', url: '#' }, { name: 'Substack', url: '#' }, { name: 'LinkedIn', url: '#' } ],
      },
    },
  }
};

// --- AI S & EFFECTS ---
const aiThemes = {
    'spotify': {
        gradient: 'bg-gradient-to-b from-[#1DB954] to-black',
        background: 'bg-black',
        heading: 'font-spotify text-white font-bold tracking-tight',
        text: 'text-gray-300 font-spotify',
        subtleText: 'text-gray-400 font-spotify',
        cardBg: 'bg-[#282828] hover:bg-[#2A2A2A] transition-colors duration-300',
        primaryText: 'text-[#1DB954] hover:text-[#1ed760] transition-colors duration-200',
        secondaryBg: 'bg-[#121212]',
        specialClasses: {
            card: 'rounded-lg p-4 transition-transform hover:scale-[1.02] cursor-pointer',
            button: 'bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full',
            gradientOverlay: 'bg-gradient-to-t from-black via-black/50 to-transparent'
        }
    },
    'youtube': {
        gradient: 'bg-gradient-to-br from-[#FF0000] via-[#FF0000]/90 to-[#282828]',
        background: 'bg-[#0F0F0F]',
        heading: 'font-youtube text-white font-bold',
        text: 'text-gray-100 font-youtube',
        subtleText: 'text-gray-400 font-youtube',
        cardBg: 'bg-[#282828] hover:bg-[#3F3F3F] transition-colors duration-300',
        primaryText: 'text-[#FF0000] hover:text-[#FF0000]/80 transition-colors duration-200',
        secondaryBg: 'bg-[#1F1F1F]',
        specialClasses: {
            card: 'rounded-xl overflow-hidden shadow-lg',
            button: 'bg-[#FF0000] hover:bg-[#FF0000]/90 text-white font-medium rounded-full',
            thumbnail: 'relative aspect-video bg-cover bg-center'
        }
    },
    'nineties': {
        gradient: 'bg-gradient-to-br from-teal-400 via-purple-500 to-pink-400',
        background: 'bg-gray-200',
        heading: 'font-mono text-black',
        text: 'font-mono text-black',
        subtleText: 'font-mono text-gray-700',
        cardBg: 'bg-gray-300 border-2 border-t-white border-l-white border-r-black border-b-black',
        primaryText: 'text-blue-600 underline',
        secondaryBg: 'bg-gray-200',
    },
    'underwater': {
        gradient: 'bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-900',
        background: 'bg-blue-50',
        heading: 'text-cyan-800',
        text: 'text-blue-900',
        subtleText: 'text-blue-700',
        cardBg: 'bg-white/50 backdrop-blur-sm border border-white/20',
        primaryText: 'text-cyan-600',
        secondaryBg: 'bg-blue-100/50',
    },
    'aesthetic': {
        gradient: 'bg-gradient-to-br from-pink-300 via-rose-200 to-fuchsia-300',
        background: 'bg-rose-50',
        heading: 'text-rose-800 font-serif',
        text: 'text-pink-900',
        subtleText: 'text-rose-600',
        cardBg: 'bg-white/70 backdrop-blur-sm border border-white/30',
        primaryText: 'text-fuchsia-600',
        secondaryBg: 'bg-pink-100/50',
    },
    'minecraft': {
        gradient: 'bg-gradient-to-b from-blue-400 via-green-600 to-yellow-800',
        background: 'bg-yellow-800',
        heading: 'font-minecraft text-white',
        text: 'font-minecraft text-gray-200',
        subtleText: 'font-minecraft text-gray-400',
        cardBg: 'bg-gray-500 border-4 border-gray-700',
        primaryText: 'text-cyan-300 underline',
        secondaryBg: 'bg-yellow-900',
    },
    'f1': {
        gradient: 'bg-gradient-to-r from-gray-800 via-black to-gray-800',
        background: 'bg-gray-900',
        heading: 'font-f1 text-white uppercase',
        text: 'font-roboto text-gray-300',
        subtleText: 'font-roboto text-gray-500',
        cardBg: 'bg-gray-800 border border-gray-700',
        primaryText: 'text-red-500',
        secondaryBg: 'bg-black',
    },
    'football': {
        gradient: 'bg-gradient-to-b from-green-500 to-green-700',
        background: 'bg-green-700',
        heading: 'font-football text-white uppercase tracking-wider',
        text: 'font-roboto text-green-100',
        subtleText: 'font-roboto text-green-200',
        cardBg: 'bg-white/10 backdrop-blur-sm border border-white/20',
        primaryText: 'text-yellow-300',
        secondaryBg: 'bg-green-800',
    },
    'youtube-uiux': {
        gradient: 'bg-gradient-to-br from-[#212121] via-[#181818] to-black',
        suggestedHeroImage: 'https://picsum.photos/id/1078/400/400',
        background: 'bg-[#181818]',
        heading: 'font-roboto font-bold text-white',
        text: 'font-roboto text-gray-300',
        subtleText: 'font-roboto text-gray-400',
        cardBg: 'bg-[#212121] border border-gray-700',
        primaryText: 'text-blue-400',
        secondaryBg: 'bg-[#282828]',
    },
    'google-search': {
        gradient: 'bg-gradient-to-br from-gray-50 to-gray-200',
        suggestedHeroImage: 'https://picsum.photos/id/1016/400/400',
        background: 'bg-white',
        heading: 'font-roboto text-blue-800 text-lg hover:underline',
        text: 'font-roboto text-black',
        subtleText: 'font-roboto text-green-700',
        cardBg: 'bg-white',
        primaryText: 'text-blue-800 font-normal',
        secondaryBg: 'bg-gray-50',
    },
    'cyberpunk': {
        gradient: 'bg-gradient-to-br from-black via-fuchsia-900 to-cyan-900',
        suggestedHeroImage: 'https://picsum.photos/id/1075/400/400',
        background: 'bg-black',
        heading: 'font-cyberpunk text-cyan-400 drop-shadow-[0_0_5px_#0ff]',
        text: 'font-mono text-fuchsia-400',
        subtleText: 'font-mono text-gray-500',
        cardBg: 'bg-black border-2 border-fuchsia-500',
        primaryText: 'text-cyan-400 underline',
        secondaryBg: 'bg-gray-900/50',
    },
    'noir': {
        gradient: 'bg-gradient-to-br from-black via-gray-800 to-gray-500',
        suggestedHeroImage: 'https://picsum.photos/id/1013/400/400',
        background: 'bg-gray-200',
        heading: 'font-noir text-black',
        text: 'font-noir text-gray-800',
        subtleText: 'font-noir text-gray-600',
        cardBg: 'bg-white border border-black',
        primaryText: 'text-black underline',
        secondaryBg: 'bg-gray-300',
    },
    'comic-sans': {
        gradient: 'bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-400',
        suggestedHeroImage: 'https://picsum.photos/id/1080/400/400',
        background: 'bg-yellow-200',
        heading: 'font-comic text-red-600',
        text: 'font-comic text-black',
        subtleText: 'font-comic text-gray-700',
        cardBg: 'bg-white border-4 border-black rounded-none',
        primaryText: 'text-blue-600 underline',
        secondaryBg: 'bg-green-200',
    },
    'cosmic': {
        gradient: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black',
        suggestedHeroImage: 'https://picsum.photos/id/1043/400/400',
        background: 'bg-gray-900',
        heading: 'font-cosmic text-white drop-shadow-[0_0_8px_#fff]',
        text: 'font-cosmic text-indigo-200',
        subtleText: 'font-cosmic text-purple-300',
        cardBg: 'bg-white/5 backdrop-blur-sm border border-white/10',
        primaryText: 'text-indigo-300',
        secondaryBg: 'bg-black/20',
    },
};

// --- AI PROMPT INTERPRETATION LOGIC ---
const interpretStylePrompt = (prompt) => {
    const p = prompt.toLowerCase();
    if (p.includes('90s') || p.includes('nineties') || p.includes('retro')) return { type: 'SET_THEME', payload: 'nineties' };
    if (p.includes('underwater') || p.includes('ocean') || p.includes('aqua')) return { type: 'SET_THEME', payload: 'underwater' };
    if (p.includes('aesthetic') || p.includes('soft') || p.includes('pastel')) return { type: 'SET_THEME', payload: 'aesthetic' };
    if (p.includes('dark') || p.includes('night') || p.includes('developer')) return { type: 'SET_THEME', payload: 'developer' };
    if (p.includes('minecraft') || p.includes('block')) return { type: 'SET_THEME', payload: 'minecraft' };
    if (p.includes('f1') || p.includes('race') || p.includes('formula 1')) return { type: 'SET_THEME', payload: 'f1' };
    if (p.includes('football') || p.includes('soccer') || p.includes('sports')) return { type: 'SET_THEME', payload: 'football' };
    if (p.includes('spotify') || p.includes('music')) return { type: 'SET_THEME', payload: 'spotify' };
    if (p.includes('youtube')) {
        if (p.includes('uiux') || p.includes('ui/ux')) return { type: 'SET_THEME', payload: 'youtube-uiux' };
        return { type: 'SET_THEME', payload: 'youtube' };
    }
    if (p.includes('google search')) return { type: 'SET_THEME', payload: 'google-search' };
    if (p.includes('google') || p.includes('material')) return { type: 'SET_THEME', payload: 'google' };
    if (p.includes('cyberpunk') || p.includes('neon')) return { type: 'SET_THEME', payload: 'cyberpunk' };
    if (p.includes('noir') || p.includes('black and white')) return { type: 'SET_THEME', payload: 'noir' };
    if (p.includes('comic')) return { type: 'SET_THEME', payload: 'comic-sans' };
    if (p.includes('cosmic') || p.includes('space')) return { type: 'SET_THEME', payload: 'cosmic' };


    if (p.includes('float') && p.includes('project')) return { type: 'TOGGLE_EFFECT', payload: 'floatProjects' };
    if (p.includes('antigravity') || (p.includes('fall') && !p.includes('instant'))) return { type: 'TOGGLE_EFFECT', payload: 'antigravity' };
    if (p.includes('instant') && p.includes('fall')) return { type: 'TOGGLE_EFFECT', payload: 'instantFall' };
    if (p.includes('wind') && p.includes('left')) return { type: 'TOGGLE_EFFECT', payload: 'windLeft' };
    if (p.includes('wind') && p.includes('right')) return { type: 'TOGGLE_EFFECT', payload: 'windRight' };

    if (p.includes('reset') || p.includes('clear') || p.includes('normal')) return { type: 'RESET_ALL' };
    
    return { type: 'NO_ACTION' };
};

// --- Gemini API Integration ---
async function fetchSuggestionsFromGemini(jobDesc, currentData) {
    const apiKey = "AIzaSyDrFyib2jCfM_tkIjf-9WcWppmFdKXOC60"; // Will be provided by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const systemPrompt = `You are an expert career coach AI. Your task is to provide comprehensive suggestions for a user's portfolio based on a job description.
    Analyze the job description thoroughly and provide suggestions for each section:

    1. Hero Section:
    - Provide 3 alternative professional titles that match the job requirements
    - Create 3 compelling bio statements that highlight relevant expertise
    - Suggest a strong call-to-action phrase
    
    2. About Section:
    - Provide 3 alternative versions of the "About Me" content
    - Focus on relevant experience and achievements
    - Align the tone with the industry and role
    
    3. Skills Section:
    - List all relevant technical and soft skills from the job description
    - Provide a suggestion for skills organization/grouping
    - Include both required and desired skills
    
    4. Projects Section:
    - For each project, provide 3 alternative descriptions that emphasize relevance
    - Suggest project highlights that align with job requirements
    - Recommend specific achievements and metrics to include
    
    5. Contact Section:
    - Suggest a compelling heading that encourages engagement
    - Recommend relevant social media profiles to highlight
    
    Respond ONLY with a valid JSON object matching the schema. Do not add any extra text.`;

    const userQuery = `Job Description:\n---\n${jobDesc}\n---\n\nCurrent Portfolio Data:\n---\n${JSON.stringify(currentData, null, 2)}\n---`;
    
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    hero: {
                        type: "OBJECT",
                        properties: {
                            titleSuggestions: { type: "ARRAY", items: { type: "STRING" } },
                            bioSuggestions: { type: "ARRAY", items: { type: "STRING" } },
                            ctaSuggestions: { type: "ARRAY", items: { type: "STRING" } }
                        }
                    },
                    about: {
                        type: "OBJECT",
                        properties: {
                            headingSuggestions: { type: "ARRAY", items: { type: "STRING" } },
                            contentSuggestions: { type: "ARRAY", items: { type: "STRING" } }
                        }
                    },
                    skills: {
                        type: "OBJECT",
                        properties: {
                            suggestion: { type: "STRING" },
                            organization: { type: "STRING" },
                            items: { type: "ARRAY", items: { type: "STRING" } },
                            categories: {
                                type: "ARRAY",
                                items: {
                                    type: "OBJECT",
                                    properties: {
                                        name: { type: "STRING" },
                                        skills: { type: "ARRAY", items: { type: "STRING" } }
                                    }
                                }
                            }
                        }
                    },
                    projects: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                id: { type: "NUMBER" },
                                descriptionSuggestions: { type: "ARRAY", items: { type: "STRING" } },
                                highlightSuggestions: { type: "ARRAY", items: { type: "STRING" } },
                                metricSuggestions: { type: "ARRAY", items: { type: "STRING" } }
                            }
                        }
                    },
                    contact: {
                        type: "OBJECT",
                        properties: {
                            headingSuggestions: { type: "ARRAY", items: { type: "STRING" } },
                            recommendedProfiles: { type: "ARRAY", items: { type: "STRING" } }
                        }
                    }
                }
            }
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`API call failed: ${response.status}`);
        const result = await response.json();
        if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            return JSON.parse(result.candidates[0].content.parts[0].text);
        } else {
            throw new Error("Invalid API response structure.");
        }
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return null;
    }
}


// --- REUSABLE ICONS ---
const PhotoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);

const SparklesIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM3 10a1 1 0 011-1h1v1a1 1 0 01-2 0v-1zm2 5a1 1 0 011-1h1v1a1 1 0 01-2 0v-1zM8 9a1 1 0 011-1h1v1a1 1 0 01-2 0V9zm2 5a1 1 0 011-1h1v1a1 1 0 01-2 0v-1zm4-5a1 1 0 011-1h1v1a1 1 0 01-2 0v-1zm2 5a1 1 0 011-1h1v1a1 1 0 01-2 0v-1z" clipRule="evenodd" />
    </svg>
);

const DownloadIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


// --- EDITABLE & SUGGESTION COMPONENTS ---
const SuggestionPopover = ({ suggestions, onSelect, onClose }) => {
    const popoverRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!suggestions || suggestions.length === 0) return null;

    return (
        <div ref={popoverRef} className="absolute z-20 -top-2 transform -translate-y-full w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-2">
            <p className="text-xs font-semibold text-slate-500 px-2 pb-1">✨ AI Suggestions</p>
            <div className="max-h-48 overflow-y-auto">
                {suggestions.map((s, i) => (
                    <button key={i} onClick={() => { onSelect(s); onClose(); }} className="w-full text-left text-sm text-slate-700 p-2 rounded-md hover:bg-slate-100">
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
};

const Editable = ({ value, onSave, multiline = false, className = '', path, suggestions, onSuggestionSelect, onFocus, showSuggestionsForPath }) => {
    const handleBlur = (e) => onSave(path, e.currentTarget.innerText);
    const Tag = multiline ? 'div' : 'span';
    const isShowingSuggestions = showSuggestionsForPath === path;
    
    return (
        <div className="relative inline-block w-full">
            <Tag
                contentEditable
                suppressContentEditableWarning
                onFocus={() => onFocus(path)}
                onBlur={handleBlur}
                className={`editable-field ${className}`}
                style={{ WebkitLineClamp: multiline ? 'none' : '1' }}
            >
                {value}
            </Tag>
            {isShowingSuggestions && (
                 <SuggestionPopover suggestions={suggestions} onSelect={onSuggestionSelect} onClose={() => onFocus(null)} />
            )}
        </div>
    );
};

const EditableImage = ({ src, onSave, alt, className = '', path }) => {
    const handleImageChange = () => {
        const newUrl = prompt('Enter new image URL:', src);
        if (newUrl) onSave(path, newUrl);
    };
    return (
        <div className={`relative group ${className}`}>
            <img src={src} alt={alt} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Invalid+Image'; }} />
            <button onClick={handleImageChange} className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100" aria-label="Change image"><PhotoIcon /></button>
        </div>
    );
};

// --- PORTFOLIO SECTIONS ---
const HeroSection = ({ data, onSave, theme, effects, suggestions, onFocus, showSuggestionsForPath }) => (
    <div 
        className={`w-full text-center py-20 md:py-32 px-4 ${theme.gradient} 
            ${effects.antigravity ? 'fall-animation' : ''}
            ${effects.instantFall ? 'instant-fall-animation' : ''}
            ${effects.windLeft ? 'wind-left-animation' : ''}
            ${effects.windRight ? 'wind-right-animation' : ''}
            transition-all duration-500`} 
        style={{ 
            animationDelay: '0s',
            '--animation-order': '1'
        }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white/50">
                <EditableImage src={data.imageUrl} onSave={onSave} alt={data.name} path="hero.imageUrl" className="w-full h-full"/>
            </div>
            <div>
                 <h1 className={`text-4xl md:text-6xl font-bold ${theme.heading}`}>
                    <Editable value={data.name} onSave={onSave} path="hero.name" onFocus={onFocus} />
                </h1>
                <div className="relative mt-2">
                    <p className={`text-xl md:text-2xl opacity-80 font-medium ${theme.text}`}>
                        <Editable value={data.title} onSave={onSave} path="hero.title" onFocus={onFocus} suggestions={suggestions?.hero?.titleSuggestions} onSuggestionSelect={(s) => onSave('hero.title', s)} showSuggestionsForPath={showSuggestionsForPath}/>
                    </p>
                </div>
                <div className="relative mt-6 max-w-2xl mx-auto">
                    <div className={`text-lg opacity-90 ${theme.text}`}>
                        <Editable value={data.bio} onSave={onSave} multiline path="hero.bio" onFocus={onFocus} suggestions={suggestions?.hero?.bioSuggestions} onSuggestionSelect={(s) => onSave('hero.bio', s)} showSuggestionsForPath={showSuggestionsForPath} />
                    </div>
                </div>
                <div className="mt-8">
                    <button className={`
                        ${theme.specialClasses?.button || 'bg-white text-slate-800'} 
                        font-bold py-3 px-8 
                        transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                    `}>
                        <Editable value={data.cta} onSave={onSave} path="hero.cta" onFocus={onFocus} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const AboutSection = ({ data, onSave, theme, effects, onFocus, suggestions, showSuggestionsForPath }) => (
    <div 
        className={`py-16 md:py-24 px-4 ${theme.secondaryBg}
            ${effects.antigravity ? 'fall-animation' : ''}
            ${effects.instantFall ? 'instant-fall-animation' : ''}
            ${effects.windLeft ? 'wind-left-animation' : ''}
            ${effects.windRight ? 'wind-right-animation' : ''}
            transition-all duration-500`} 
        style={{ 
            animationDelay: effects.instantFall || effects.windLeft || effects.windRight ? '0.2s' : '1s',
            '--animation-order': '2'
        }}>
        <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl font-bold ${theme.heading} mb-6`}>
                <Editable 
                    value={data.heading} 
                    onSave={onSave} 
                    path="about.heading" 
                    onFocus={onFocus}
                    suggestions={suggestions?.about?.headingSuggestions}
                    onSuggestionSelect={(s) => onSave('about.heading', s)}
                    showSuggestionsForPath={showSuggestionsForPath}
                />
            </h2>
            {suggestions?.about && (
                <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 max-w-2xl mx-auto">
                    <p className="font-semibold">✨ AI Suggestions for About Section</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {suggestions.about.contentSuggestions?.map((suggestion, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => onSave('about.content', suggestion)}
                                className="text-left text-sm bg-purple-100 text-purple-800 p-2 rounded-md hover:bg-purple-200 transition-colors"
                            >
                                {suggestion.substring(0, 100)}...
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className={`text-lg leading-relaxed ${theme.text}`}>
                <Editable 
                    value={data.content} 
                    onSave={onSave} 
                    multiline 
                    path="about.content" 
                    onFocus={onFocus}
                    suggestions={suggestions?.about?.contentSuggestions}
                    onSuggestionSelect={(s) => onSave('about.content', s)}
                    showSuggestionsForPath={showSuggestionsForPath}
                />
            </div>
        </div>
    </div>
);const SkillsSection = ({ data, onSave, theme, effects, onFocus, suggestions }) => (
    <div 
        className={`py-16 md:py-24 px-4 ${theme.background}
            ${effects.antigravity ? 'fall-animation' : ''}
            ${effects.instantFall ? 'instant-fall-animation' : ''}
            ${effects.windLeft ? 'wind-left-animation' : ''}
            ${effects.windRight ? 'wind-right-animation' : ''}
            transition-all duration-500`} 
        style={{ 
            animationDelay: effects.instantFall || effects.windLeft || effects.windRight ? '0.4s' : '2s',
            '--animation-order': '3'
        }}>
        <div className="max-w-5xl mx-auto text-center">
            <h2 className={`text-3xl font-bold ${theme.heading} mb-12`}><Editable value={data.heading} onSave={onSave} path="skills.heading" onFocus={onFocus} /></h2>
            {suggestions?.skills?.suggestion && (
                <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 max-w-2xl mx-auto">
                    <p className="font-semibold">✨ AI Suggestion:</p>
                    <p className="text-sm">{suggestions.skills.suggestion}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {suggestions.skills.items.map(skill => (
                            <button key={skill} onClick={() => onSave('skills.items', [...data.items, skill])} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-md hover:bg-purple-300 transition-colors">
                                + Add "{skill}"
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex flex-wrap justify-center gap-3">
                {data.items.map((skill, index) => (<div key={index} className={`font-medium py-2 px-5 rounded-full ${theme.secondaryBg} ${theme.text}`}><Editable value={skill} onSave={onSave} path={`skills.items.${index}`} onFocus={onFocus} /></div>))}
            </div>
        </div>
    </div>
);

const ProjectCard = ({ project, onSave, theme, index, effects, suggestions, onFocus, showSuggestionsForPath }) => {
    const projectSuggestions = suggestions?.projects?.find(p => p.id === project.id);
    
    return (
        <div 
            className={`
                ${theme.cardBg} 
                overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 
                flex flex-col group 
                ${effects.floatProjects ? 'float-animation' : ''}
                ${theme.specialClasses?.card || 'rounded-lg'}
            `} 
            style={{ animationDelay: `${index * 0.2}s` }}
        >
            <div className={`relative overflow-hidden ${theme.specialClasses?.thumbnail || ''}`}>
                <EditableImage 
                    src={project.imageUrl} 
                    onSave={onSave} 
                    alt={project.title} 
                    className="w-full h-56 transform group-hover:scale-105 transition-transform duration-300" 
                    path={`projects.items.${index}.imageUrl`} 
                />
                {theme.specialClasses?.gradientOverlay && (
                    <div className={`absolute inset-0 ${theme.specialClasses.gradientOverlay}`}></div>
                )}
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className={`text-xl font-bold ${theme.heading} mb-2`}>
                    <Editable value={project.title} onSave={onSave} path={`projects.items.${index}.title`} onFocus={onFocus}/>
                </h3>
                {projectSuggestions && (
                    <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm">
                        <div className="mb-2">
                            <p className="font-semibold">✨ Description Suggestions:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {projectSuggestions.descriptionSuggestions?.map((s, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => onSave(`projects.items.${index}.description`, s)}
                                        className="text-left bg-purple-100 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                                    >
                                        {s.substring(0, 50)}...
                                    </button>
                                ))}
                            </div>
                        </div>
                        {projectSuggestions.highlightSuggestions && (
                            <div className="mb-2">
                                <p className="font-semibold mt-2">🎯 Highlight Suggestions:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {projectSuggestions.highlightSuggestions.map((h, i) => (
                                        <span key={i} className="text-xs bg-purple-100 px-2 py-1 rounded">{h}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {projectSuggestions.metricSuggestions && (
                            <div>
                                <p className="font-semibold mt-2">📊 Metrics to Consider:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {projectSuggestions.metricSuggestions.map((m, i) => (
                                        <span key={i} className="text-xs bg-purple-100 px-2 py-1 rounded">{m}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className={`${theme.subtleText} flex-grow relative`}>
                     <Editable 
                        value={project.description} 
                        onSave={onSave} 
                        multiline 
                        path={`projects.items.${index}.description`} 
                        onFocus={onFocus}
                        suggestions={projectSuggestions?.descriptionSuggestions}
                        onSuggestionSelect={(s) => onSave(`projects.items.${index}.description`, s)}
                        showSuggestionsForPath={showSuggestionsForPath}
                     />
                </div>
                <a href="#" className={`mt-4 font-semibold ${theme.primaryText} inline-block`}>View Project &rarr;</a>
            </div>
        </div>
    );
};

const ProjectsSection = ({ data, onSave, theme, layout, effects, ...props }) => {
    const gridClass = layout === 'gallery' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return (
        <div 
            className={`py-16 md:py-24 px-4 ${theme.secondaryBg}
                ${effects.antigravity ? 'fall-animation' : ''}
                ${effects.instantFall ? 'instant-fall-animation' : ''}
                ${effects.windLeft ? 'wind-left-animation' : ''}
                ${effects.windRight ? 'wind-right-animation' : ''}
                transition-all duration-500`} 
            style={{ 
                animationDelay: effects.instantFall || effects.windLeft || effects.windRight ? '0.6s' : '3s',
                '--animation-order': '4'
            }}>
            <div className="max-w-7xl mx-auto">
                <h2 className={`text-3xl font-bold ${theme.heading} mb-12 text-center`}><Editable value={data.heading} onSave={onSave} path="projects.heading" onFocus={props.onFocus}/></h2>
                <div className={`grid ${gridClass} gap-8`}>
                    {data.items.map((project, index) => <ProjectCard key={project.id} project={project} onSave={onSave} theme={theme} index={index} effects={effects} {...props} />)}
                </div>
            </div>
        </div>
    );
};

const ContactSection = ({ data, onSave, theme, effects, onFocus, suggestions, showSuggestionsForPath }) => (
    <div 
        className={`py-16 md:py-24 px-4 ${theme.background}
            ${effects.antigravity ? 'fall-animation' : ''}
            ${effects.instantFall ? 'instant-fall-animation' : ''}
            ${effects.windLeft ? 'wind-left-animation' : ''}
            ${effects.windRight ? 'wind-right-animation' : ''}
            transition-all duration-500`} 
        style={{ 
            animationDelay: effects.instantFall || effects.windLeft || effects.windRight ? '0.8s' : '4s',
            '--animation-order': '5'
        }}>
        <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl font-bold ${theme.heading} mb-4`}>
                <Editable 
                    value={data.heading} 
                    onSave={onSave} 
                    path="contact.heading" 
                    onFocus={onFocus}
                    suggestions={suggestions?.contact?.headingSuggestions}
                    onSuggestionSelect={(s) => onSave('contact.heading', s)}
                    showSuggestionsForPath={showSuggestionsForPath}
                />
            </h2>
            {suggestions?.contact?.recommendedProfiles && (
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 max-w-2xl mx-auto">
                    <p className="font-semibold">✨ Recommended Professional Profiles</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {suggestions.contact.recommendedProfiles.map((profile, idx) => (
                            <button 
                                key={idx}
                                onClick={() => {
                                    const newSocial = [...data.social];
                                    if (!newSocial.find(s => s.name === profile)) {
                                        newSocial.push({ name: profile, url: '#' });
                                        onSave('contact.social', newSocial);
                                    }
                                }}
                                className="text-sm bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                            >
                                + Add {profile}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <a href={`mailto:${data.email}`} className={`text-xl ${theme.primaryText} hover:underline`}>
                <Editable value={data.email} onSave={onSave} path="contact.email" onFocus={onFocus}/>
            </a>
            <div className="flex justify-center gap-6 mt-8">
                {data.social.map((link, index) => (
                    <a key={index} href="#" className={`${theme.subtleText} hover:${theme.primaryText} transition-colors`}>
                        <Editable value={link.name} onSave={onSave} path={`contact.social.${index}.name`} onFocus={onFocus} />
                    </a>
                ))}
            </div>
        </div>
    </div>
);

// --- AUTHENTICATION & MAIN COMPONENTS ---

const AuthFormContainer = ({ children }) => (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-slate-800">FolioForge</h1>
                <p className="text-slate-600 mt-4 text-xl">Your AI-Powered Portfolio Builder</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
                {children}
            </div>
        </div>
    </div>
);

const Login = ({ onLoginSuccess, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            setError('Please enter both email and password.');
            return;
        }
        setError('');
        onLoginSuccess();
    };

    return (
        <AuthFormContainer>
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Sign In</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <div className="flex items-center justify-between">
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-md">Sign In</button>
                </div>
                <p className="text-center text-xs text-slate-500 mt-6">
                    Don't have an account? <button type="button" onClick={onSwitchToSignUp} className="font-bold text-purple-600 hover:underline">Sign Up</button>
                </p>
            </form>
        </AuthFormContainer>
    );
};

const SignUp = ({ onSignUpSuccess, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        onSignUpSuccess();
    };

    return (
        <AuthFormContainer>
             <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Create an Account</h2>
            <form onSubmit={handleSignUp}>
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="signup-email">Email Address</label>
                    <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="signup-password">Password</label>
                    <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <div className="flex items-center justify-between">
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-md">Create Account</button>
                </div>
                 <p className="text-center text-xs text-slate-500 mt-6">
                    Already have an account? <button type="button" onClick={onSwitchToLogin} className="font-bold text-purple-600 hover:underline">Sign In</button>
                </p>
            </form>
        </AuthFormContainer>
    );
};


const Dashboard = ({ savedPortfolios, onNew, onEdit, onDelete }) => (
    <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold text-slate-800">My Portfolios</h1>
                <button onClick={onNew} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-lg">
                    + Create New Portfolio
                </button>
            </div>
            {savedPortfolios.length === 0 ? (
                <div className="text-center bg-white p-12 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-slate-700">Your space is empty!</h2>
                    <p className="text-slate-500 mt-2">Click "Create New Portfolio" to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {savedPortfolios.map(p => (
                        <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl">
                             <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-800 truncate">{p.portfolioData.hero.name}'s Portfolio</h3>
                                <p className="text-slate-500 text-sm mb-4">Last updated: {new Date(p.lastModified).toLocaleDateString()}</p>
                                <div className="flex gap-2 flex-wrap">
                                    <button onClick={() => onEdit(p.id)} className="flex-1 bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors text-sm">Edit</button>
                                    <button onClick={() => onDelete(p.id)} className="flex-1 bg-red-100 text-red-800 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors text-sm">Delete</button>
                                    <button 
                                        className="w-full mt-2 flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                        onClick={() => {
                                            const tempEditor = document.createElement('div');
                                            const PortfolioEditorComponent = () => (
                                                <PortfolioEditor 
                                                    initialPortfolio={p}
                                                    onSaveAndExit={() => {}}
                                                    onBack={() => {}}>
                                                </PortfolioEditor>
                                            );
                                            ReactDOM.render(<PortfolioEditorComponent />, tempEditor);
                                            setTimeout(() => {
                                                const content = tempEditor.querySelector('#portfolio-content');
                                                if (content) {
                                                    html2pdf()
                                                        .set({
                                                            margin: [10, 10, 10, 10],
                                                            filename: `${p.portfolioData.hero.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_portfolio.pdf`,
                                                            image: { type: 'jpeg', quality: 0.98 },
                                                            html2canvas: { scale: 2, useCORS: true },
                                                            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                                                        })
                                                        .from(content)
                                                        .save();
                                                }
                                                ReactDOM.unmountComponentAtNode(tempEditor);
                                            }, 100);
                                        }}
                                    >
                                        <DownloadIcon className="h-4 w-4" />
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

const TemplateSelector = ({ onSelect, onBack }) => (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <button onClick={onBack} className="absolute top-8 left-8 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-slate-200 transition-colors">&larr; Back to Dashboard</button>
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-800">Choose a Template</h1>
            <p className="text-slate-600 mt-4 text-xl">Select a starting point for your new portfolio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
            {Object.values(templates).map(template => (
                <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group transform hover:-translate-y-2 transition-transform duration-300" onClick={() => onSelect(template.id)}>
                    <div className="relative">
                       <img src={template.thumbnail} alt={template.name} className="w-full h-96 object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       <div className="absolute bottom-0 left-0 p-6">
                            <h2 className="text-2xl font-bold text-white">{template.name.split('-')[0]}</h2>
                            <p className="text-white/80">{template.name.split('-')[1]}</p>
                       </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const AIPromptBar = ({ onStylePrompt, onJobPrompt, isTailoring }) => {
    const [mode, setMode] = useState('style'); // 'style' or 'job'
    const [stylePrompt, setStylePrompt] = useState('');
    const [jobPrompt, setJobPrompt] = useState('');

    const styleSuggestions = ['spotify theme', 'youtube theme', 'cyberpunk theme', 'cosmic theme', 'google search', 'comic sans', 'antigravity', 'instant fall', 'wind left', 'wind right', 'reset styles'];
    
    const handleStyleSubmit = (e) => {
        e.preventDefault();
        if (stylePrompt.trim()) {
            onStylePrompt(stylePrompt);
            setStylePrompt('');
        }
    };
    
    const handleJobSubmit = (e) => {
        e.preventDefault();
        if (jobPrompt.trim() && !isTailoring) {
            onJobPrompt(jobPrompt);
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-2">
                <div className="flex border-b border-slate-200 mb-2">
                    <button onClick={() => setMode('style')} className={`px-4 py-2 text-sm font-semibold ${mode === 'style' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-500'}`}>Style & Effects</button>
                    <button onClick={() => setMode('job')} className={`px-4 py-2 text-sm font-semibold ${mode === 'job' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-500'}`}>AI Co-pilot</button>
                </div>
                {mode === 'style' && (
                    <div>
                        <form onSubmit={handleStyleSubmit}>
                            <div className="flex items-center">
                                <SparklesIcon className="h-6 w-6 text-purple-500 mx-2"/>
                                <input type="text" value={stylePrompt} onChange={(e) => setStylePrompt(e.target.value)} placeholder="e.g., 'football theme' or 'antigravity'" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-500"/>
                                <button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-md text-sm">Apply</button>
                            </div>
                        </form>
                        <div className="flex flex-wrap gap-2 mt-2 px-2 pb-1">
                            {styleSuggestions.map(s => <button key={s} onClick={() => onStylePrompt(s)} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-md hover:bg-slate-300 transition-colors">{s}</button>)}
                        </div>
                    </div>
                )}
                {mode === 'job' && (
                     <div>
                        <form onSubmit={handleJobSubmit}>
                            <div className="flex items-start">
                                <SparklesIcon className="h-6 w-6 text-purple-500 mx-2 mt-2"/>
                                <textarea value={jobPrompt} onChange={(e) => setJobPrompt(e.target.value)} placeholder="Paste job description here to get AI suggestions..." className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-500 h-24 resize-none p-2"/>
                                <button type="submit" disabled={isTailoring} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-md text-sm self-start disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isTailoring ? 'Thinking...' : 'Get Suggestions'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const DownloadPDFButton = ({ portfolioData, theme }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);
        
        // Create a cloned version of the portfolio content for PDF generation
        const pdfContent = document.createElement('div');
        pdfContent.className = theme.background;
        pdfContent.innerHTML = document.getElementById('portfolio-content').innerHTML;
        
        // Remove interactive elements and styling that might interfere with PDF
        pdfContent.querySelectorAll('button, .editable-field, [contenteditable]').forEach(el => {
            el.removeAttribute('contenteditable');
            el.classList.remove('editable-field');
        });
        
        // Configure PDF options
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${portfolioData.hero.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_portfolio.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            // Generate PDF
            await html2pdf().set(opt).from(pdfContent).save();
            setIsGenerating(false);
        } catch (error) {
            console.error('Error generating PDF:', error);
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
            <DownloadIcon className="h-5 w-5" />
            {isGenerating ? 'Generating PDF...' : 'Download PDF'}
        </button>
    );
};

const PortfolioEditor = ({ initialPortfolio, onSaveAndExit, onBack }) => {
    const [portfolioData, setPortfolioData] = useState(initialPortfolio.portfolioData);
    const [activeAiTheme, setActiveAiTheme] = useState(initialPortfolio.activeAiTheme || null);
    const [activeEffects, setActiveEffects] = useState(initialPortfolio.activeEffects || { 
        floatProjects: false, 
        antigravity: false,
        instantFall: false,
        windLeft: false,
        windRight: false 
    });
    const [isTailoring, setIsTailoring] = useState(false);
    const [notification, setNotification] = useState('');
    const [aiSuggestions, setAiSuggestions] = useState(null);
    const [showSuggestionsForPath, setShowSuggestionsForPath] = useState(null);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleUpdate = useCallback((path, value) => {
        setPortfolioData(currentData => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(currentData));
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    }, []);
    
    const handleStylePrompt = (prompt) => {
        const action = interpretStylePrompt(prompt);
        switch (action.type) {
            case 'SET_THEME':
                const themeKey = action.payload;
                const theme = themeKey === 'developer' ? templates.developer.data.theme : aiThemes[themeKey];
                setActiveAiTheme(theme);
                if (theme.suggestedHeroImage) {
                    handleUpdate('hero.imageUrl', theme.suggestedHeroImage);
                }
                break;
            case 'TOGGLE_EFFECT':
                setActiveEffects(prev => ({ ...prev, [action.payload]: !prev[action.payload] }));
                break;
            case 'RESET_ALL':
                setActiveAiTheme(null);
                setActiveEffects({ floatProjects: false, antigravity: false });
                setAiSuggestions(null);
                break;
            default:
                break;
        }
    };
    
    const handleJobPrompt = async (jobDesc) => {
        setIsTailoring(true);
        setNotification('✨ FolioForge is Forging suggestions...');
        const suggestions = await fetchSuggestionsFromGemini(jobDesc, portfolioData);
        setIsTailoring(false);

        if (suggestions) {
            setAiSuggestions(suggestions);
            setNotification('Suggestions loaded! Click on text to see them.');
        } else {
            setNotification('Failed to get suggestions. Please try again.');
        }
    };
    
    const handleSave = () => {
        const portfolioToSave = {
            ...initialPortfolio,
            portfolioData,
            activeAiTheme,
            activeEffects,
            lastModified: new Date().toISOString()
        };
        onSaveAndExit(portfolioToSave);
    };

    const handleFocus = (path) => {
        if (aiSuggestions) {
            setShowSuggestionsForPath(path);
        }
    };

    const currentTheme = useMemo(() => {
        const baseTheme = portfolioData.theme;
        return activeAiTheme ? { ...baseTheme, ...activeAiTheme } : baseTheme;
    }, [portfolioData.theme, activeAiTheme]);
    
    const layout = portfolioData.layout;
    
    const editorProps = {
        onSave: handleUpdate,
        theme: currentTheme,
        effects: activeEffects,
        suggestions: aiSuggestions,
        onFocus: handleFocus,
        showSuggestionsForPath,
    };

    return (
        <div className={`${currentTheme.background}`}>
            {notification && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-800 text-white py-2 px-4 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                    {notification}
                </div>
            )}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Orbitron:wght@700&family=Anton&family=Roboto:wght@400;700&family=Major+Mono+Display&family=Special+Elite&family=Comic+Neue:wght@700&family=Cinzel:wght@700&family=Montserrat:wght@400;500;600;700&display=swap');
                .font-mono { font-family: 'VT323', monospace; }
                .font-minecraft { font-family: 'Press Start 2P', cursive; }
                .font-f1 { font-family: 'Orbitron', sans-serif; }
                .font-football { font-family: 'Anton', sans-serif; }
                .font-roboto { font-family: 'Roboto', sans-serif; }
                .font-cyberpunk { font-family: 'Major Mono Display', monospace; }
                .font-noir { font-family: 'Special Elite', cursive; }
                .font-comic { font-family: 'Comic Neue', cursive; }
                .font-cosmic { font-family: 'Cinzel', serif; }
                .font-spotify { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                .font-youtube { font-family: 'Roboto', 'YouTube Noto', arial, sans-serif; }

                @keyframes float { 
                    0% { transform: translateY(0px); } 
                    50% { transform: translateY(-15px); } 
                    100% { transform: translateY(0px); } 
                }
                .float-animation { animation: float 6s ease-in-out infinite; }
                
                @keyframes fall {
                    0% { transform: translateY(-100vh); opacity: 1; }
                    99% { transform: translateY(100vh); opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .fall-animation { animation: fall 10s linear infinite; }

                @keyframes instant-fall {
                    0% { transform: translateY(-100vh); opacity: 1; }
                    60% { transform: translateY(105vh); }
                    65% { transform: translateY(95vh); }
                    70% { transform: translateY(100vh); }
                    75% { transform: translateY(98vh); }
                    80% { transform: translateY(100vh); opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .instant-fall-animation { animation: instant-fall 2s cubic-bezier(.17,.67,.83,.67) forwards; }

                @keyframes wind-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100vw); opacity: 0; }
                }
                .wind-left-animation { 
                    animation: wind-left 1s cubic-bezier(.17,.67,.83,.67) forwards;
                    animation-delay: calc(var(--animation-order) * 0.1s);
                }

                @keyframes wind-right {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(100vw); opacity: 0; }
                }
                .wind-right-animation { 
                    animation: wind-right 1s cubic-bezier(.17,.67,.83,.67) forwards;
                    animation-delay: calc(var(--animation-order) * 0.1s);
                }
            `}</style>
             <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Editing: {portfolioData.hero.name}'s Portfolio</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Click content to edit. Use the AI prompt bar for suggestions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DownloadPDFButton portfolioData={portfolioData} theme={currentTheme} />
                    <button onClick={onBack} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors text-sm">Cancel</button>
                    <button onClick={handleSave} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-md text-sm">Save Portfolio</button>
                </div>
            </header>
            <main id="portfolio-content">
                <HeroSection data={portfolioData.hero} {...editorProps} />
                <AboutSection data={portfolioData.about} {...editorProps} />
                <SkillsSection data={portfolioData.skills} {...editorProps} />
                <ProjectsSection data={portfolioData.projects} layout={layout} {...editorProps} />
                <ContactSection data={portfolioData.contact} {...editorProps} />
            </main>
            <AIPromptBar onStylePrompt={handleStylePrompt} onJobPrompt={handleJobPrompt} isTailoring={isTailoring} />
        </div>
    );
};


export default function App() {
    const [view, setView] = useState('dashboard'); // dashboard, template_selection, editing
    const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
    const [savedPortfolios, setSavedPortfolios] = useState([]);
    const [portfolioToEdit, setPortfolioToEdit] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        try {
            const storedPortfolios = localStorage.getItem('folioForgePortfolios');
            if (storedPortfolios) {
                setSavedPortfolios(JSON.parse(storedPortfolios));
            }
        } catch (error) {
            console.error("Could not load portfolios from localStorage:", error);
        }
    }, []);

    const updateAndStorePortfolios = (newPortfolios) => {
        setSavedPortfolios(newPortfolios);
        try {
            localStorage.setItem('folioForgePortfolios', JSON.stringify(newPortfolios));
        } catch (error) {
            console.error("Could not save portfolios to localStorage:", error);
        }
    };
    
    const handleNewPortfolio = () => setView('template_selection');
    
    const handleSelectTemplate = (templateId) => {
        const newPortfolio = {
            id: crypto.randomUUID(),
            templateId: templateId,
            portfolioData: JSON.parse(JSON.stringify(templates[templateId].data)), // Deep copy
            activeAiTheme: null,
            activeEffects: { floatProjects: false, antigravity: false },
            lastModified: new Date().toISOString()
        };
        setPortfolioToEdit(newPortfolio);
        setView('editing');
    };
    
    const handleEditPortfolio = (portfolioId) => {
        const portfolio = savedPortfolios.find(p => p.id === portfolioId);
        if (portfolio) {
            setPortfolioToEdit(portfolio);
            setView('editing');
        }
    };
    
    const handleDeletePortfolio = (portfolioId) => {
        if (window.confirm("Are you sure you want to delete this portfolio? This action cannot be undone.")) {
            const newPortfolios = savedPortfolios.filter(p => p.id !== portfolioId);
            updateAndStorePortfolios(newPortfolios);
        }
    };

    const handleSaveAndExit = (savedPortfolio) => {
        const index = savedPortfolios.findIndex(p => p.id === savedPortfolio.id);
        let newPortfolios;
        if (index > -1) {
            // Update existing
            newPortfolios = [...savedPortfolios];
            newPortfolios[index] = savedPortfolio;
        } else {
            // Add new
            newPortfolios = [...savedPortfolios, savedPortfolio];
        }
        updateAndStorePortfolios(newPortfolios);
        setView('dashboard');
    };
    
    if (!isAuthenticated) {
        if (authView === 'login') {
            return <Login onLoginSuccess={() => setIsAuthenticated(true)} onSwitchToSignUp={() => setAuthView('signup')} />;
        }
        return <SignUp onSignUpSuccess={() => setIsAuthenticated(true)} onSwitchToLogin={() => setAuthView('login')} />;
    }

    switch (view) {
        case 'template_selection':
            return <TemplateSelector onSelect={handleSelectTemplate} onBack={() => setView('dashboard')} />;
        case 'editing':
            return <PortfolioEditor initialPortfolio={portfolioToEdit} onSaveAndExit={handleSaveAndExit} onBack={() => setView('dashboard')} />;
        case 'dashboard':
        default:
            return <Dashboard savedPortfolios={savedPortfolios} onNew={handleNewPortfolio} onEdit={handleEditPortfolio} onDelete={handleDeletePortfolio} />;
    }
}

