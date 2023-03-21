import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_MY_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [image, setImage] = useState(
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-aPrFAxJJBudZ3SR3XXFxJPxn/user-GTN38Nhk4sLzBRWQFRNUDpyy/img-67kNHXPe61ivUl8z0GeOSLEf.png?st=2023-03-21T18%3A26%3A45Z&se=2023-03-21T20%3A26%3A45Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-21T15%3A38%3A50Z&ske=2023-03-22T15%3A38%3A50Z&sks=b&skv=2021-08-06&sig=silGDG1U%2BDqHAZ82lA7QbWgAmd0v0We1akuol82oYCo%3D"
  );
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
