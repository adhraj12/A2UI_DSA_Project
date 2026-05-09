from typing import TypedDict, Annotated, List, Any, Dict
from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """
    The main state shared between CopilotKit, the frontend, and all backend agents.
    """
    messages: Annotated[List[AnyMessage], add_messages]
    
    # NeuroPlay specific context
    topic: str
    user_level: str
    learning_history: List[str]
    xp: int
    
    # The generated UI schema sent to the frontend renderer
    current_schema: Dict[str, Any]
