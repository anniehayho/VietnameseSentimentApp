import axios from 'axios';
import { HUGGING_FACE_API_TOKEN } from '@env';

const API_URL = 'https://api-inference.huggingface.co/models/wonrax/phobert-base-vietnamese-sentiment';

if (!HUGGING_FACE_API_TOKEN) {
  console.warn('Warning: HUGGING_FACE_API_TOKEN is not set in .env file');
}

export const analyzeSentiment = async (text: string) => {
  if (!HUGGING_FACE_API_TOKEN) {
    throw new Error('Hugging Face API token is not configured. Please add it to your .env file.');
  }

  try {
    const response = await fetch(
      API_URL,
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );
    
    const result = await response.json();
    console.log('result', result);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      throw new Error('Invalid API token. Please check your Hugging Face API token in the .env file.');
    }
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};

export const formatSentimentResult = (result: any[]) => {
  if (!result || !result[0] || !Array.isArray(result[0])) {
    return { sentiment: 'Unknown', score: 0, error: 'Invalid response format' };
  }

  // Find each sentiment by label instead of position
  const sentiments = result[0];
  let positive = sentiments.find((item: any) => item.label === 'POS') || { score: 0 };
  let neutral = sentiments.find((item: any) => item.label === 'NEU') || { score: 0 };
  let negative = sentiments.find((item: any) => item.label === 'NEG') || { score: 0 };

  let sentiment;
  let score;
  
  if (positive.score > negative.score && positive.score > neutral.score) {
    sentiment = 'Positive';
    score = positive.score;
  } else if (negative.score > positive.score && negative.score > neutral.score) {
    sentiment = 'Negative';
    score = negative.score;
  } else {
    sentiment = 'Neutral';
    score = neutral.score;
  }

  return {
    sentiment,
    score: Math.round(score * 100) / 100,
    details: {
      positive: Math.round(positive.score * 100) / 100,
      neutral: Math.round(neutral.score * 100) / 100,
      negative: Math.round(negative.score * 100) / 100,
    }
  };
};
