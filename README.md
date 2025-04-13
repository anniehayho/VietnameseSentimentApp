# Vietnamese Sentiment Analysis App

A React Native application for analyzing the sentiment of Vietnamese text using the PhoBERT model.

## Features

- Analyze sentiment of Vietnamese text in real-time
- Display sentiment classification (Positive, Negative, Neutral)
- Show confidence scores for each sentiment category
- Includes example Vietnamese sentences for quick testing

## Technology Stack

- React Native / Expo
- PhoBERT Vietnamese Sentiment Analysis Model (via Hugging Face API)
- Axios for API requests

## Setup and Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd VietnameseSentimentApp
```

2. **Install dependencies**

```bash
npm install
```

3. **Add your Hugging Face API Token**

You'll need to add your Hugging Face API token in `src/services/sentimentService.ts`:

```typescript
const API_TOKEN = 'YOUR_HUGGING_FACE_API_TOKEN_HERE';
```

You can obtain a token by creating an account at [Hugging Face](https://huggingface.co/).

4. **Run the application**

```bash
npm start
```

Then, press:
- `a` for Android
- `i` for iOS
- `w` for web

## How to Use

1. Enter Vietnamese text in the input field
2. Tap the "Analyze Sentiment" button
3. View the sentiment analysis results below
4. You can also tap on the example sentences to quickly test the sentiment analysis

## Model Information

This application uses the [wonrax/phobert-base-vietnamese-sentiment](https://huggingface.co/wonrax/phobert-base-vietnamese-sentiment) model from Hugging Face. PhoBERT is a pre-trained language model specifically for Vietnamese text.

## License

MIT
