export const formConfig = {
    Manual: {
      Create: [
        { type: 'dropdown', name: 'Specific Task', options: ['Entering Data', 'Designing Reports', 'Generating Invoices', 'Writing Content'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Read: [
        { type: 'dropdown', name: 'Specific Task', options: ['Data Retrieval', 'Monitoring Systems', 'Running Reports', 'Customer Feedback'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Update: [
        { type: 'dropdown', name: 'Specific Task', options: ['Editing Records', 'Software Patching', 'Updating Content', 'Revising Contracts'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Delete: [
        { type: 'dropdown', name: 'Specific Task', options: ['Removing Data', 'Unsubscribing Users', 'Archiving Records'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Validate: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Checking Data' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Authorize: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Approving Requests' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Notify: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Sending Alerts' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Process: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Processing Orders' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Transform: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Data Transformation' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Analyze: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Data Analysis' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Merge: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Combining Data' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Configure: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., System Configuration' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Schedule: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Task Scheduling' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Monitor: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Performance Monitoring' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Optimize: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Process Optimization' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Deploy: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Software Deployment' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Rollback: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Rolling Back Changes' },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the manual process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
    },
    Script: {
      Create: [
        { type: 'dropdown', name: 'Specific Task', options: ['Entering Data', 'Designing Reports', 'Generating Invoices', 'Writing Content'] },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'JavaScript', 'Java', 'Bash', 'PowerShell'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Read: [
        { type: 'dropdown', name: 'Specific Task', options: ['Data Retrieval', 'Monitoring Systems', 'Running Reports', 'Customer Feedback'] },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'SQL', 'JavaScript'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Update: [
        { type: 'dropdown', name: 'Specific Task', options: ['Editing Records', 'Software Patching', 'Updating Content', 'Revising Contracts'] },
        { type: 'dropdown', name: 'Programming Language', options: ['Bash', 'PowerShell', 'Python'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Delete: [
        { type: 'dropdown', name: 'Specific Task', options: ['Removing Data', 'Unsubscribing Users', 'Archiving Records'] },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'SQL'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Validate: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Checking Data' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'JavaScript'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Authorize: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Approving Requests' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'Java'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Notify: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Sending Alerts' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'JavaScript'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Process: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Processing Orders' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'JavaScript'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Transform: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Data Transformation' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'JavaScript'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Analyze: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Data Analysis' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'R'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Merge: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Combining Data' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'SQL'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Configure: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., System Configuration' },
        { type: 'dropdown', name: 'Programming Language', options: ['Bash', 'PowerShell'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Schedule: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Task Scheduling' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'JavaScript'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Monitor: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Performance Monitoring' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'Bash'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Optimize: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Process Optimization' },
        { type: 'dropdown', name: 'Programming Language', options: ['Python', 'R'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Deploy: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Software Deployment' },
        { type: 'dropdown', name: 'Programming Language', options: ['Bash', 'PowerShell'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Rollback: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Rolling Back Changes' },
        { type: 'dropdown', name: 'Programming Language', options: ['Bash', 'PowerShell'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the scripted process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
    },
    AI: {
      Create: [
        { type: 'dropdown', name: 'Specific Task', options: ['Entering Data', 'Designing Reports', 'Generating Invoices', 'Writing Content'] },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Read: [
        { type: 'dropdown', name: 'Specific Task', options: ['Data Retrieval', 'Monitoring Systems', 'Running Reports', 'Customer Feedback'] },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Update: [
        { type: 'dropdown', name: 'Specific Task', options: ['Editing Records', 'Software Patching', 'Updating Content', 'Revising Contracts'] },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Delete: [
        { type: 'dropdown', name: 'Specific Task', options: ['Removing Data', 'Unsubscribing Users', 'Archiving Records'] },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Validate: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Checking Data' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Authorize: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Approving Requests' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Notify: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Sending Alerts' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Process: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Processing Orders' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Transform: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Data Transformation' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Analyze: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Data Analysis' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Merge: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Combining Data' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Configure: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., System Configuration' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Schedule: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Task Scheduling' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Monitor: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Performance Monitoring' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Optimize: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Process Optimization' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Deploy: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Software Deployment' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
      Rollback: [
        { type: 'text', name: 'Specific Task', placeholder: 'e.g., Rolling Back Changes' },
        { type: 'dropdown', name: 'Tool/API', options: ['OpenAI (GPT4o or earlier)', 'Anthropic (Claude Opus or earlier)', 'Google Gemini (1.5 Flash or earlier)', 'Other External AI Tool', 'Custom In-house Model'] },
        { type: 'textarea', name: 'Exact Process', placeholder: 'Describe the AI-driven process' },
        { type: 'text', name: 'Step Name', placeholder: 'Give a name to this step' },
      ],
    },
    
    Webhook: [
        { type: 'text', name: 'Webhook Source', placeholder: 'Where is this webhook being sent from?'},
        { type: 'textarea', name: 'Webhook Action', placeholder: 'What does this webhook do?'},
        { type: 'dropdown', name: 'Webhook Trigger', options: ['onClick', 'onSubmit', 'onDelete', 'onUpdate', 'Other']}
    ],
    
    'API Call': [
        { type: 'text', name: 'API Endpoint', placeholder: 'Enter the API endpoint URL' },
        { type: 'textarea', name: 'API Action', placeholder: 'Describe what this API call does' },
        { type: 'dropdown', name: 'API Trigger', options: ['onCreate', 'onUpdate', 'onDelete', 'onSubmit', 'Other'] }
    ]
};
    

  