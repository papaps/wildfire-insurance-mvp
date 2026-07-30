export default {
  title: 'Patterns/Chat Bubbles',
  parameters: {
    docs: {
      description: { component: 'Assistant/user message bubbles used on the Chat screen.' },
    },
  },
  decorators: [(Story) => <div className="wf-chat-messages" style={{ width: 360, padding: 0 }}><Story /></div>],
}

export const Conversation = {
  render: () => (
    <>
      <div className="wf-bubble wf-bubble-assistant">
        Hi! I can help you get your property ready for wildfire season. Want to start a risk report?
      </div>
      <div className="wf-bubble wf-bubble-user">Yes, let's do it.</div>
      <div className="wf-bubble wf-bubble-assistant">
        Great — I'll walk you through a few quick questions about your property.
      </div>
    </>
  ),
}
