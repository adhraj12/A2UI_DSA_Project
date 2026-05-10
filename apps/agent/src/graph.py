from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
from src.state import AgentState
from src.nodes import analytics_node, learning_node, gamification_node, ui_node

# 1. Initialize the graph with the AgentState schema
workflow = StateGraph(AgentState)

# 2. Add the agent nodes
workflow.add_node("analytics", analytics_node)
workflow.add_node("learning", learning_node)
workflow.add_node("gamification", gamification_node)
workflow.add_node("ui", ui_node)

# 3. Wire the graph logic
# START -> Analytics -> Learning -> Gamification -> UI -> END
workflow.add_edge(START, "analytics")
workflow.add_edge("analytics", "learning")
workflow.add_edge("learning", "gamification")
workflow.add_edge("gamification", "ui")
workflow.add_edge("ui", END)

# 4. Compile the graph
checkpointer = MemorySaver()
compiled_graph = workflow.compile(checkpointer=checkpointer)
