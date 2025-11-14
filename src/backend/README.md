# Backend Code

This folder contains backend web modules for your Wix site.

## Files

- `permissions.json` - Controls who can call your backend functions
- `ai-api.js` - AI image generation API (Hugging Face integration)
- `email-notifications.js` - Email system for custom orders

## Usage

Backend functions can be called from frontend code using:

```javascript
import { generateAIImage } from 'backend/ai-api';

const result = await generateAIImage(prompt, imageUrl);
```

Learn more: https://www.wix.com/velo/reference/wix-fetch
