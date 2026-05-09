from fastapi import FastAPI
from copilotkit import CopilotKitRemoteEndpoint, LangGraphAGUIAgent
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from dotenv import load_dotenv
import os

load_dotenv()

from src.graph import compiled_graph

app = FastAPI()

class FixedLangGraphAGUIAgent(LangGraphAGUIAgent):
    def dict_repr(self):
        return {
            "name": self.name,
            "description": self.description,
            "type": "langgraph_agui"
        }

sdk = CopilotKitRemoteEndpoint(
    agents=[
        FixedLangGraphAGUIAgent(
            name="neuroplay_agent",
            description="NeuroPlay Agent",
            graph=compiled_graph
        )
    ],
)

add_fastapi_endpoint(app, sdk, "/copilotkit")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.server:app", host="0.0.0.0", port=8133, reload=True)
