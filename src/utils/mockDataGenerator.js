export const generateMockSprintData = (projectName, jiraUrl) => {
    // Simple mock seeding based on project name length to have some consistency
    const seed = projectName.length;
    const projectKey = jiraUrl ? jiraUrl.split('/').pop().toUpperCase().slice(0, 4) : 'PROJ';

    // 1. Generate Burndown Data
    // Simulate a sprint that starts well but gets delayed mid-way
    const burndownData = [];
    const totalPoints = 100 + (seed * 2);
    let currentIdeal = totalPoints;
    let currentActual = totalPoints;

    for (let day = 1; day <= 14; day++) {
        currentIdeal = Math.max(0, currentIdeal - (totalPoints / 14));

        // Random fluctuation for "Actual"
        if (day < 8) {
            // First week usually okay
            currentActual = Math.max(0, currentActual - (totalPoints / 16));
        } else if (day === 8) {
            // The "Oh no" moment
            currentActual = null; // Future
        }

        burndownData.push({
            day: `Day ${day}`,
            ideal: Math.round(currentIdeal),
            actual: day < 8 ? Math.round(currentActual) : null,
            predicted: day < 8 ? Math.round(currentActual) : Math.max(Math.round(currentActual - (10 - (day - 8) * 5)), 20) // Failing prediction
        });
    }

    // 2. Generate Bottlenecks
    // Use project-specific terms if possible, else generic
    const techStack = ['React', 'Node.js', 'Python', 'AWS', 'Docker'][seed % 5];
    const bottlenecks = [
        {
            id: `${projectKey}-142`,
            title: `${techStack} API Integration Failure`,
            assignee: 'Dev_A',
            daysInStatus: 3 + (seed % 2),
            reason: 'Third-party dependency timeout',
            impact: 'High'
        },
        {
            id: `${projectKey}-156`,
            title: 'User Auth Schema Migration',
            assignee: 'Dev_B',
            daysInStatus: 4,
            reason: 'Waiting for DBA review',
            impact: 'Medium'
        },
        {
            id: `${projectKey}-189`,
            title: 'Customer Dashboard UI',
            assignee: 'Dev_C',
            daysInStatus: 2,
            reason: 'Pending Design assets',
            impact: 'Low'
        }
    ];

    // 3. Bus Factor
    const busFactorData = [
        { name: 'Dev_A (Senior)', tickets: 12 + (seed % 3), risk: 'High' },
        { name: 'Dev_B', tickets: 5 + (seed % 2), risk: 'Low' },
        { name: 'Dev_C', tickets: 4, risk: 'Low' }
    ];

    // 4. Jira Sync Metadata
    const jiraSync = {
        connected: true,
        projectKey: projectKey,
        lastSynced: new Date().toLocaleTimeString(),
        totalIssues: 45 + (seed * 3)
    };

    // 5. Recovery Plan / Insights
    const insights = {
        scopeCreep: {
            addedPoints: 8,
            tickets: [
                { id: `${projectKey}-201`, title: 'Emergency Hotfix', pts: 3 },
                { id: `${projectKey}-204`, title: 'New Analytics Event', pts: 5 }
            ]
        },
        draftEmailBody: `Hi Team,\n\nWe are currently trending behind on ${projectName}. Due to the complexity of the ${techStack} integration (${projectKey}-142), we are at risk of missing the sprint goal.\n\nI propose we swap out the low-priority tasks to focus on the core deliverables.\n\nBest,\n[Your Name]`
    };

    return {
        burndownData,
        bottlenecks,
        busFactorData,
        jiraSync,
        insights,
        overview: {
            riskScore: 72 + (seed % 20), // 72 to 92
            sprintProgress: 60 + (seed % 10),
            velocityTrend: seed % 2 === 0 ? 'down' : 'up'
        }
    };
};
