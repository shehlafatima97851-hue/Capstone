export function buildPrompt(role, messages) {
  const systemMessage = {
    role: 'system',
    content:
      'You are a college helpdesk assistant. Provide concise, helpful, and friendly answers about admissions, courses, fees, timetables, exams, events, campus services, and student life. Use a professional tone, give clear next steps, and keep the answer easy to scan for students and administrators.'
  };

  const roleMessage = {
    role: 'system',
    content:
      role === 'admin'
        ? 'Respond with administrative perspective, focusing on policy, deadlines, approvals, and staff-level operations. Keep the answer precise and actionable for campus administrators.'
        : 'Respond from a student-friendly standpoint, emphasizing deadlines, application steps, fees, schedules, campus support, and student experience.'
  };

  const conversation = messages.map((message) => ({ role: message.role, content: message.content }));

  return [systemMessage, roleMessage, ...conversation];
}
