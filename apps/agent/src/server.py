from fastapi import FastAPI
from ag_ui_langgraph import LangGraphAgent, add_langgraph_fastapi_endpoint
from dotenv import load_dotenv
import os

load_dotenv()

from src.graph import compiled_graph

app = FastAPI()

agent = LangGraphAgent(
    name="neuroplay_agent",
    description="NeuroPlay gamified learning agent.",
    graph=compiled_graph
)

add_langgraph_fastapi_endpoint(app, agent, "/copilotkit")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.server:app", host="0.0.0.0", port=8133, reload=True)
