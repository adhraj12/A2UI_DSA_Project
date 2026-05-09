from fastapi import FastAPI
from copilotkit import CopilotKitRemoteEndpoint, LangGraphAgent
from copilotkit.routers.fastapi import copilotkit_exit_endpoint

app = FastAPI()

# Placeholder agent for initial setup
# We will replace this with the 4-agent LangGraph system later.
class DummyAgent:
    name = "neuroplay_agent"
    description = "The main NeuroPlay AI agent."
    
    async def run(self, context):
        pass

sdk = CopilotKitRemoteEndpoint(
    agents=[
        LangGraphAgent(
            name="neuroplay_agent",
            description="NeuroPlay Agent",
            agent=DummyAgent() # Replace with actual LangGraph compiled graph later
        )
    ],
)

copilotkit_exit_endpoint(app=app, sdk=sdk, path="/copilotkit")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.server:app", host="0.0.0.0", port=8133, reload=True)
