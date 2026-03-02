# CropYieldAi

## Project info

This repository contains CropYieldAi — a crop yield prediction dashboard built with Vite, React and TypeScript.

## How can I edit this code?

You can edit the project locally or directly on GitHub.

### Edit locally (recommended)

Make sure you have Node.js and npm installed (use nvm if needed: https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd CropYieldAi
# Install dependencies
npm install
# Start the dev server
npm run dev
```

### Edit on GitHub or Codespaces

Use the GitHub file editor or create a Codespace from the repository to edit and push changes.

## What technologies are used for this project?

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploying

### Prediction service
The front‑end is wired up to a Flask model API hosted at `https://cropyeild-ml.onrender.com/`.
The endpoint accepts a POST with JSON body `{ "features": [/* numbers */] }` and returns `{"prediction": <number>}`.

Currently the remote service is misconfigured: the scaler expects three inputs but the
`LinearRegression` model was trained on 20 features. Every request returns HTTP 500.
To make the website use the real model you can either:

1. **Fix the backend** – see `app.py` in the model repo for the offending code and adjust
the preprocessing (either remove the scaler or pad/encode features properly). For example:

```python
@app.route('/predict', methods=['POST'])
def predict():
    raw = request.json['features']
    arr = np.array(raw).reshape(1, -1)
    if arr.shape[1] == 3:
        # scale numeric values then pad zeros for the remaining 17 slots
        scaled = scaler.transform(arr)
        arr = np.hstack([scaled, np.zeros((1, 17))])
    elif arr.shape[1] != 20:
        return jsonify({'error': 'expected 3 or 20 features'}), 400
    prediction = model.predict(arr)
    return jsonify({'prediction': float(prediction[0])})
```

2. **Compute predictions client‑side** – the coefficients and scaler parameters are available
from the model repository and can be hard‑coded in the React app if you prefer not to
rely on the external API. See `src/components/PredictionForm.tsx` for an example.

The front‑end now calls the external model, gracefully falls back to the existing
pseudo‑model on failure, and shows a toast notification when the request errors.


Build the site with `npm run build` and serve the `dist` folder with your static host (Render, Netlify, Vercel, etc.).

## Custom domain

Follow your host's documentation to add a custom domain; this repo doesn't depend on any third-party dashboard service.
