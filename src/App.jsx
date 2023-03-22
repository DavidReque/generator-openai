import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_MY_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  async function fecthData() {
    try {
      setIsLoading(true);
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      setImage(response.data.data[0].url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>Image Generator</h1>
      <div>
        <input
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Ej: a white siamese cat"
        />
        <button onClick={fecthData}>Generate</button>
      </div>
      <div>
        {isLoading ? (
          <>
            <div class="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </>
        ) : (
          <img style={{ width: 512, height: 512 }} src={image} alt="" />
        )}
      </div>
    </div>
  );
}

export default App;
