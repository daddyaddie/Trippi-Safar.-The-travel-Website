
import { GoogleGenAI, Type } from "@google/genai";
import type { TripPreferences, ItineraryPlan } from '../types';
import { BUDGET_OPTIONS, TRAVEL_WITH_OPTIONS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const priceSchema = {
    type: Type.OBJECT,
    properties: {
        usd: { type: Type.STRING },
        inr: { type: Type.STRING },
    },
    required: ["usd", "inr"],
};

const geoLocationSchema = {
    type: Type.OBJECT,
    properties: {
        latitude: { type: Type.NUMBER },
        longitude: { type: Type.NUMBER },
    },
    required: ["latitude", "longitude"],
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        destinationName: { type: Type.STRING },
        destinationGeoLocation: { ...geoLocationSchema },
        destinationImagePrompt: { type: Type.STRING },
        bestTimeToVisit: { type: Type.STRING },
        dailyPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    activities: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                description: { type: Type.STRING },
                                timeOfDay: { type: Type.STRING },
                                rating: { type: Type.STRING },
                                openingHours: { type: Type.STRING },
                                ticketPrice: { ...priceSchema },
                                distanceFromCityCenter: { type: Type.STRING },
                                geoLocation: { ...geoLocationSchema },
                            },
                            required: ["name", "description", "timeOfDay", "rating", "openingHours", "ticketPrice", "distanceFromCityCenter", "geoLocation"],
                        },
                    },
                },
                required: ["day", "activities"],
            },
        },
        hotelRecommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    rating: { type: Type.STRING },
                    pricePerNight: { ...priceSchema },
                    distanceFromCityCenter: { type: Type.STRING },
                    geoLocation: { ...geoLocationSchema },
                },
                required: ["name", "description", "rating", "pricePerNight", "distanceFromCityCenter", "geoLocation"],
            },
        },
        closingNote: { type: Type.STRING },
    },
    required: ["destinationName", "destinationGeoLocation", "destinationImagePrompt", "bestTimeToVisit", "dailyPlan", "hotelRecommendations", "closingNote"],
};

const buildPrompt = (preferences: TripPreferences): string => {
  const budgetInfo = BUDGET_OPTIONS.find(opt => opt.value === preferences.budget);
  const budgetDescription = budgetInfo ? `${budgetInfo.label} (${budgetInfo.range})` : preferences.budget;
  
  const companionInfo = TRAVEL_WITH_OPTIONS.find(opt => opt.value === preferences.travelWith);
  const companionDescription = companionInfo ? companionInfo.label : preferences.travelWith;

  return `
- ${preferences.location}
 ${preferences.days} 
${companionDescription} 
${preferences.adventureTypes.join(', ')}
`;
};

export const generateItinerary = async (preferences: TripPreferences): Promise<ItineraryPlan> => {
    if (!process.env.API_KEY) {
        throw new Error("The application is not configured correctly. Missing API Key.");
    }
    try {
        const prompt = buildPrompt(preferences);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
                topP: 1,
                topK: 32,
            }
        });
        
        const jsonText = response.text;
        return JSON.parse(jsonText) as ItineraryPlan;

    } catch (error) {
        console.error("Error generating itinerary:", error);
        if (error instanceof SyntaxError) {
             throw new Error("Failed to parse the itinerary plan. The format from the AI was invalid.");
        }
        if (error instanceof Error && (error.message.includes('quota') || error.message.includes('limit'))) {
            throw new Error("Sorry, the itinerary planner has reached its usage limit. Please try again later.");
        }
        throw new Error("Sorry, I couldn't generate an itinerary at the moment. Please try again later.");
    }
};

export const generateTravelTips = async (destinationName: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("The application is not configured correctly. Missing API Key.");
    }
    try {
        const prompt = ` ${destinationName}.
`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.5,
            }
        });

        return response.text;

    } catch (error) {
        console.error(`Error generating travel tips for ${destinationName}:`, error);
        throw new Error(`Sorry, I couldn't fetch travel tips for ${destinationName} right now.`);
    }
};

const generateImageWithGemini = async (prompt: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("Primary service (Gemini) is not configured.");
    }
    
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: `A cinematic, vibrant, professional travel poster-style image of: ${prompt}`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: '16:9',
            },
        });

        const generatedImage = response.generatedImages?.[0];
        const image = generatedImage?.image?.imageBytes;

        if (!image) {
            const candidate = (response as any).candidates?.[0];
            const blockReason = candidate?.finishReason;
            const safetyRatings = candidate?.safetyRatings;
            console.error("Gemini response did not contain image data:", { blockReason, safetyRatings });

            if (blockReason === 'SAFETY') {
                 throw new Error("Image generation was blocked by Gemini's safety policies.");
            }
            throw new Error('Primary service (Gemini) did not return a valid image.');
        }

        return `data:image/png;base64,${image}`;
    } catch (error: any) {
        console.error("Error during Gemini image generation:", error);
        let message = "An unknown error occurred with the primary image service.";
        const nestedError = error.cause?.error || error.error;
        if (nestedError?.message) {
            message = nestedError.message;
        } else if (error.message) {
            message = error.message;
        }
        throw new Error(message);
    }
};

const generateImageWithOpenAI = async (prompt: string): Promise<string> => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
        throw new Error("Backup service is not configured.");
    }

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: `A cinematic, vibrant, professional travel poster-style image of: ${prompt}`,
                n: 1,
                size: '1792x1024',
                quality: 'standard',
                response_format: 'b64_json',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = errorData.error?.message || `HTTP error! status: ${response.status}`;
            console.error("OpenAI API error:", message, errorData);
            if (response.status === 401) {
                throw new Error("Invalid API key for backup image service.");
            }
            if (response.status === 429) {
                throw new Error("Rate limit or quota exceeded for backup image service.");
            }
            throw new Error(`Backup image service failed: ${message}`);
        }

        const data = await response.json();
        const base64Image = data.data?.[0]?.b64_json;
        if (!base64Image) {
            console.error("OpenAI response did not contain image data:", data);
            throw new Error('Backup image service did not return a valid image.');
        }
        return `data:image/png;base64,${base64Image}`;
    } catch (error) {
        console.error("Error during OpenAI image generation:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        throw new Error(errorMessage);
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    let geminiError: Error | null = null;
    try {
        return await generateImageWithGemini(prompt);
    } catch (error) {
        geminiError = error instanceof Error ? error : new Error(String(error));
        console.error(`Primary service (Gemini) failed: ${geminiError.message}. Falling back to OpenAI.`);
    }
    
    try {
        return await generateImageWithOpenAI(prompt);
    } catch (openAIError) {
        const backupError = openAIError instanceof Error ? openAIError : new Error(String(openAIError));
        console.error(`Backup service (OpenAI) also failed: ${backupError.message}`);

        const primaryMsg = geminiError ? geminiError.message : "Unknown Error";
        const backupMsg = backupError.message;
        
        const finalErrorMessage = ` ${primaryMsg}\n\u2022 Backup Service (OpenAI) Error: ${backupMsg}`;
        throw new Error(finalErrorMessage);
    }
};
