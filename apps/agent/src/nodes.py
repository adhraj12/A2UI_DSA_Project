import json
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from src.state import AgentState

# Pydantic schemas for the structured A2UI output
class ComponentSchema(BaseModel):
    id: str = Field(description="Unique ID for this component")
    type: str = Field(description="Type of component (xp_bar, quiz_card, concept_card, code_editor, array_visualizer, progress_map)")
    data: Dict[str, Any] = Field(description="Data payload specific to the component type")

class A2UISchema(BaseModel):
    theme: str = Field(description="Theme to use (cyberpunk, space, fantasy, minimal, hacker, premium_light)")
    layout: str = Field(description="Layout to use (grid, split, focused)")
    components: List[ComponentSchema] = Field(description="List of UI components to render")

def get_llm():
    # langchain-google-genai uses GOOGLE_API_KEY by default, but we'll manually pass it if it's GEMINI_API_KEY
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    return ChatGoogleGenerativeAI(model="gemini-3-flash-preview", google_api_key=api_key)

def analytics_node(state: AgentState):
    """Analyzes the latest interaction and updates user level/history."""
    print("--- ANALYTICS AGENT ---")
    messages = state.get("messages", [])
    history = state.get("learning_history", [])
    user_level = state.get("user_level", "beginner")
    
    if not messages:
        return {"user_level": "beginner"}
        
    last_message = messages[-1].content
    
    # Simple heuristic or LLM call could go here. For now, a fast LLM pass.
    llm = get_llm()
    system_prompt = f"""You are the Analytics Agent. The user is currently level: {user_level}.
    Assess the user's latest message and decide if their level should be 'beginner', 'intermediate', or 'advanced'.
    Respond ONLY with the level as a single word."""
    
    try:
        response = llm.invoke([SystemMessage(content=system_prompt), HumanMessage(content=str(last_message))])
        
        # Handle cases where response.content is a list (e.g., multimodal or block formatting)
        content_str = response.content[0]["text"] if isinstance(response.content, list) else str(response.content)
        new_level = content_str.strip().lower()
        
        if new_level not in ['beginner', 'intermediate', 'advanced']:
            new_level = user_level
    except Exception as e:
        print(f"Analytics LLM error: {e}")
        new_level = user_level
        
    history.append(f"User sent: {last_message}. Assessed level: {new_level}")
    
    return {"user_level": new_level, "learning_history": history}


def learning_node(state: AgentState):
    """Determines the teaching strategy and content."""
    print("--- LEARNING AGENT ---")
    topic = state.get("topic", "Data Structures")
    user_level = state.get("user_level", "beginner")
    messages = state.get("messages", [])
    
    from langchain_core.messages import AIMessage
    
    llm = get_llm()
    system_prompt = f"""You are the Learning Agent. You teach {topic} to a {user_level} student.
    Based on the latest message, write a short, engaging response explaining the concept or asking a question.
    Keep it concise and interactive."""
    
    try:
        if messages:
            # Safely get the last message and ensure it's properly formatted for the LLM
            last_msg = messages[-1]
            response = llm.invoke([SystemMessage(content=system_prompt), last_msg])
            
            # Handle cases where response.content might be a list
            teaching_content = response.content[0]["text"] if isinstance(response.content, list) else str(response.content)
        else:
            teaching_content = f"Welcome! What would you like to learn about {topic}?"
    except Exception as e:
        print(f"Learning LLM error: {e}")
        teaching_content = "I'm having trouble connecting right now, but let's keep learning!"
        
    # We append the agent's teaching message to the messages list so the frontend CopilotKit sees it
    # Crucially, it must be an AIMessage object, not a raw string!
    return {"messages": [AIMessage(content=teaching_content)]}


def gamification_node(state: AgentState):
    """Assigns XP and determines the visual theme."""
    print("--- GAMIFICATION AGENT ---")
    xp = state.get("xp", 0)
    messages = state.get("messages", [])
    
    # Give 10 XP for every interaction
    new_xp = xp + 10
    
    # Determine theme based on XP
    if new_xp > 100:
        theme = "space"
    elif new_xp > 50:
        theme = "cyberpunk"
    else:
        theme = "premium_light"
        
    return {"xp": new_xp, "topic": state.get("topic", "Binary Search")} # Pass theme through context if needed


def ui_node(state: AgentState):
    """Generates the A2UI Schema JSON based on current state."""
    print("--- UI AGENT ---")
    topic = state.get("topic", "Binary Search")
    user_level = state.get("user_level", "beginner")
    xp = state.get("xp", 0)
    messages = state.get("messages", [])
    
    last_agent_msg = messages[-1].content if messages else "Welcome to NeuroPlay!"
    
    llm = get_llm()
    structured_llm = llm.with_structured_output(A2UISchema)
    
    system_prompt = f"""You are the UI Agent. You design the interface by returning A2UI JSON schemas.
    Current Topic: {topic}
    User Level: {user_level}
    Current XP: {xp}
    Latest AI Response: {last_agent_msg}
    
    Rules:
    1. ALWAYS include an 'xp_bar' component showing the current XP.
    2. Include a 'concept_card' showing the latest AI response.
    3. Choose a theme: 'premium_light' (default), 'cyberpunk', 'space', 'hacker', 'fantasy', or 'minimal'.
    4. Provide valid data for the components. Use 'premium_light' for a clean, modern aesthetic matching our landing page.
    """
    
    try:
        # Generate the UI schema
        ui_schema_obj = structured_llm.invoke(system_prompt)
        schema_dict = ui_schema_obj.dict()
    except Exception as e:
        print(f"UI LLM error: {e}")
        # Fallback schema
        schema_dict = {
            "theme": "minimal",
            "layout": "focused",
            "components": [
                {
                    "id": "fallback_xp",
                    "type": "xp_bar",
                    "data": {"currentXP": xp, "maxXP": 100, "level": 1}
                },
                {
                    "id": "fallback_concept",
                    "type": "concept_card",
                    "data": {"title": "Error", "content": "Failed to generate dynamic UI.", "icon": "AlertCircle"}
                }
            ]
        }
        
    return {"current_schema": schema_dict}
