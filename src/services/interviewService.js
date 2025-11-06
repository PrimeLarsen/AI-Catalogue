/**
 * Interview Service - Handles AI-powered case interview conversations
 * Uses Anthropic's Claude API to conduct intelligent interviews
 */

const SYSTEM_PROMPT = `You are an expert AI case interviewer. Your job is to interview idea owners about their AI use case proposals to gather comprehensive information needed for evaluation and implementation planning.

Your interview goals are to understand:
1. The business problem or opportunity they're trying to address
2. The specific AI capabilities needed
3. The target users and stakeholders
4. Expected outcomes and success metrics
5. Any constraints (budget, timeline, compliance, etc.)
6. Current processes and data availability
7. Integration requirements

Interview Guidelines:
- Start with an open-ended question to understand their vision
- Ask targeted follow-up questions to dig deeper
- Be conversational but professional
- Adapt your questions based on their responses
- If they provide vague answers, probe for specifics
- Recognize when you have sufficient information to create a comprehensive case summary

When you have gathered enough information (typically after 5-10 meaningful exchanges), respond with:
[INTERVIEW_COMPLETE]

Then provide a structured summary in this format:

# AI Case Summary

## Business Problem/Opportunity
[Clear description of what they're trying to solve or achieve]

## Proposed AI Solution
[The AI approach or capabilities they envision]

## Target Users & Stakeholders
[Who will use this and who is impacted]

## Expected Outcomes & Success Metrics
[What success looks like and how it will be measured]

## Key Requirements
[Technical, data, integration, and compliance requirements]

## Constraints & Considerations
[Budget, timeline, risks, and other limitations]

## Current State
[Existing processes and data availability]

## Next Steps Recommendation
[Suggested actions to move forward]

IMPORTANT: Only mark the interview complete when you have substantial information for most of these sections. It's better to ask more questions than to complete prematurely.`;

export async function conductInterview(messages, apiKey) {
  try {
    // Build the conversation history for Claude
    const conversationMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // If this is the first message, start the interview
    if (conversationMessages.length === 0) {
      conversationMessages.push({
        role: 'user',
        content: 'Hello, I would like to discuss my AI case idea.'
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: conversationMessages
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    // Check if interview is complete
    const isComplete = assistantMessage.includes('[INTERVIEW_COMPLETE]');

    let message = assistantMessage;
    let summary = null;

    if (isComplete) {
      // Extract the summary (everything after the marker)
      const parts = assistantMessage.split('[INTERVIEW_COMPLETE]');
      if (parts.length > 1) {
        summary = parts[1].trim();
        message = "Thank you for sharing your AI case idea! I've gathered sufficient information to create a comprehensive summary.";
      }
    }

    return {
      message,
      isComplete,
      summary
    };
  } catch (error) {
    console.error('Interview service error:', error);
    throw error;
  }
}

/**
 * Validates an Anthropic API key format
 */
export function validateApiKey(key) {
  return key && key.startsWith('sk-ant-') && key.length > 20;
}
