/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Workflow } from './types';

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: '4',
    name: 'Private Banking Source of Wealth Assessment (CIMB Pilot)',
    domain: 'Finance',
    description: 'Governed AI-assisted reconstruction and plausibility assessment of private banking customers’ declared wealth, mapping every claim to corroborating evidence and escalating contradictions or unexplained wealth to human compliance review.',
    aiType: 'Agentic System',
    dataSensitivity: 'High',
    decisionImpact: 'High',
    riskLevel: 'HIGH',
    riskScore: 81,
    riskExplanation: 'Source-of-Wealth assessment for private banking customers carries elevated ML/TF risk under ACIP guidance, which calls for rigour proportionate to risk when assessing the plausibility of declared wealth rather than merely identifying assets.',
    regulatoryMapping: [
      {
        name: 'ACIP SoW Due Diligence Guidance',
        status: 'Partial',
        controls: ['Risk-based plausibility assessment', 'Evidence provenance'],
        missingControls: ['Standardised unexplained-wealth threshold', 'Escalation SLA']
      },
      {
        name: 'MAS Notice 626 (AML/CFT)',
        status: 'Compliant',
        controls: ['Enhanced due diligence for high-risk customers', 'Ongoing monitoring'],
        missingControls: []
      },
      {
        name: 'FATF Recommendations',
        status: 'Partial',
        controls: ['Beneficial ownership verification'],
        missingControls: ['Cross-border source verification']
      }
    ],
    agentTrace: [
      {
        agent: 'Evidence Ingestion Agent',
        action: 'Ingest approved SoW documents',
        input: 'Company registry filings, bank statements, tax records, sale agreements',
        output: '17 documents normalized',
        riskContribution: 5,
        dependencies: []
      },
      {
        agent: 'Extraction Agent',
        action: 'Extract entities, amounts, ownership % and dates',
        input: '17 normalized documents',
        output: 'Structured wealth events (income, dividends, disposals)',
        riskContribution: 10,
        dependencies: ['Evidence Ingestion Agent']
      },
      {
        agent: 'Wealth Reconstruction Agent',
        action: 'Build wealth accumulation timeline',
        input: 'Structured wealth events',
        output: 'Timeline: employment income → 65% stake in ABC Holdings → dividends → SGD 12M disposal',
        riskContribution: 15,
        dependencies: ['Extraction Agent']
      },
      {
        agent: 'Evidence Mapping Agent',
        action: 'Link each declared wealth claim to supporting evidence',
        input: 'Wealth timeline',
        output: 'Evidence coverage: 86% of declared SGD 22.4M net worth',
        riskContribution: 10,
        dependencies: ['Wealth Reconstruction Agent']
      },
      {
        agent: 'Plausibility Agent',
        action: 'Test whether declared wealth is reasonably supported',
        input: 'Evidence-mapped timeline',
        output: 'Plausibility: Medium-High; SGD 2.8M unexplained',
        riskContribution: 20,
        dependencies: ['Evidence Mapping Agent']
      },
      {
        agent: 'Contradiction Detection Agent',
        action: 'Find inconsistent amounts, dates or ownership claims',
        input: 'Evidence-mapped timeline',
        output: '2 contradictions: disposal dated 2022, bank credit dated 2023',
        riskContribution: 20,
        dependencies: ['Plausibility Agent']
      },
      {
        agent: 'Risk Assessment Agent',
        action: 'Produce SoW risk indicators and confidence score',
        input: 'Plausibility + contradiction findings',
        output: 'SoW risk: Elevated; AI confidence: 81%',
        riskContribution: 15,
        dependencies: ['Contradiction Detection Agent']
      },
      {
        agent: 'Governance Agent',
        action: 'Apply CIMB SoW policy and route for review',
        input: 'Risk assessment output',
        output: 'Escalated: Enhanced human review required',
        riskContribution: 5,
        dependencies: ['Risk Assessment Agent']
      }
    ],
    decisionTrace: {
      intent: 'Assess the plausibility of a private banking customer’s declared source of wealth and surface evidence gaps for human review, rather than autonomously approving or rejecting the customer.',
      dataUsed: ['Company registry filings', 'Bank statements', 'Tax records', 'Sale agreements', 'Dividend vouchers', 'Declared net worth statement'],
      assumptions: ['Submitted documents are genuine and complete', 'Bank credit dates reliably reflect settlement of disclosed transactions'],
      logic: 'Reconstructs a wealth evidence graph mapping each declared source to corroborating documents, computes evidence coverage and flags timeline or amount contradictions between linked claims.',
      failurePoints: ['Incomplete document sets understating evidence coverage', 'Legitimate timing gaps between agreement and settlement misread as contradictions', 'Evidence graph blind to undisclosed sources of wealth']
    },
    autonomyLevel: 'RESTRICTED',
    triggeredRules: [
      'Unexplained wealth (SGD 2.8M) exceeds materiality threshold',
      'Timeline contradiction: disposal date precedes corroborating bank credit by 12 months'
    ],
    recommendations: [
      'Route to RM/AML/Compliance for enhanced evidence review before onboarding decision',
      'Request supplementary evidence for the SGD 2.8M unexplained portion',
      'Reconcile disposal agreement date against bank settlement date with the customer',
      'Retain full evidence provenance and reviewer decision trail for audit'
    ],
    createdAt: '2026-08-14T09:00:00Z'
  },
  {
    id: '1',
    name: 'AI-based Loan Approval System',
    domain: 'Finance',
    description: 'Automated credit scoring and loan approval using customer financial history and real-time behavioral data.',
    aiType: 'Agentic System',
    dataSensitivity: 'High',
    decisionImpact: 'High',
    riskLevel: 'CRITICAL',
    riskScore: 92,
    riskExplanation: 'High-impact financial decisions involving sensitive PII and complex agentic reasoning propagate risk across the decision chain.',
    regulatoryMapping: [
      {
        name: 'EU AI Act',
        status: 'Non-compliant',
        controls: ['Transparency', 'Risk Management'],
        missingControls: ['Human Oversight', 'Technical Documentation']
      },
      {
        name: 'MAS FEAT',
        status: 'Partial',
        controls: ['Fairness', 'Ethics'],
        missingControls: ['Accountability', 'Transparency']
      },
      {
        name: 'ISO 42001',
        status: 'Partial',
        controls: ['Policy Framework'],
        missingControls: ['Impact Assessment']
      },
      {
        name: 'AI Verify (IMDA)',
        status: 'Compliant',
        controls: ['Technical Robustness'],
        missingControls: []
      }
    ],
    agentTrace: [
      {
        agent: 'Data Agent',
        action: 'Ingest customer data',
        input: 'Customer ID, Bank Statements',
        output: 'Normalized Financial Profile',
        riskContribution: 15,
        dependencies: []
      },
      {
        agent: 'Model Agent',
        action: 'Compute Credit Score',
        input: 'Normalized Profile',
        output: 'Score: 740 (Confidence: 0.89)',
        riskContribution: 25,
        dependencies: ['Data Agent']
      },
      {
        agent: 'Decision Agent',
        action: 'Approve/Deny Loan',
        input: 'Credit Score, Policy Rules',
        output: 'Approved ($50k)',
        riskContribution: 40,
        dependencies: ['Model Agent']
      },
      {
        agent: 'Monitoring Agent',
        action: 'Drift Detection',
        input: 'Decision Output',
        output: 'No drift detected',
        riskContribution: 5,
        dependencies: ['Decision Agent']
      },
      {
        agent: 'Governance Agent',
        action: 'Policy Enforcement',
        input: 'Full Trace',
        output: 'Alert: High Risk Decision',
        riskContribution: 7,
        dependencies: ['Monitoring Agent']
      }
    ],
    decisionTrace: {
      intent: 'Maximize loan approval accuracy while minimizing default risk.',
      dataUsed: ['Credit History', 'Income', 'Employment Status', 'Social Media Activity (Experimental)'],
      assumptions: ['Past financial behavior predicts future reliability', 'Data sources are up-to-date'],
      logic: 'Weighted sum of credit score (60%), income-to-debt ratio (30%), and behavioral signals (10%).',
      failurePoints: ['Bias against low-income demographics', 'Hallucination in behavioral analysis', 'Data drift in economic conditions']
    },
    autonomyLevel: 'RESTRICTED',
    triggeredRules: [
      'High-risk financial decision',
      'Sensitive personal data usage',
      'Lack of explainability in behavioral signals'
    ],
    recommendations: [
      'Add human-in-the-loop review for all approvals > $25k',
      'Implement SHAP/LIME for model explainability',
      'Enable detailed audit logging for agent communications'
    ],
    createdAt: '2026-04-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Patient Triage Assistant',
    domain: 'Healthcare',
    description: 'LLM-powered assistant to help nurses prioritize emergency room patients based on symptoms.',
    aiType: 'LLM',
    dataSensitivity: 'High',
    decisionImpact: 'High',
    riskLevel: 'HIGH',
    riskScore: 78,
    riskExplanation: 'Medical triage is a high-stakes environment where LLM hallucinations could lead to delayed care.',
    regulatoryMapping: [
      {
        name: 'EU AI Act',
        status: 'Partial',
        controls: ['Human Oversight'],
        missingControls: ['Accuracy Metrics']
      }
    ],
    agentTrace: [],
    decisionTrace: {
      intent: 'Reduce triage wait times.',
      dataUsed: ['Symptom description', 'Vital signs'],
      assumptions: ['User provides accurate symptoms'],
      logic: 'Keyword matching and semantic analysis of severity.',
      failurePoints: ['Hallucination of medical conditions']
    },
    autonomyLevel: 'LIMITED',
    triggeredRules: ['Medical decision support'],
    recommendations: ['Strict human verification required'],
    createdAt: '2026-04-09T14:30:00Z'
  },
  {
    id: '3',
    name: 'AI-Powered Anti-Money Laundering (AML) Detection',
    domain: 'Finance',
    description: 'Real-time monitoring of cross-border transactions using deep learning to identify suspicious patterns, shell company activity, and sanctions evasion.',
    aiType: 'Agentic System',
    dataSensitivity: 'High',
    decisionImpact: 'High',
    riskLevel: 'HIGH',
    riskScore: 84,
    riskExplanation: 'Automated freezing of assets and reporting to regulators carries significant legal and reputational risk if false positives occur.',
    regulatoryMapping: [
      {
        name: 'MAS FEAT',
        status: 'Compliant',
        controls: ['Fairness', 'Accountability'],
        missingControls: []
      },
      {
        name: 'EU AI Act',
        status: 'Partial',
        controls: ['Risk Management'],
        missingControls: ['Human Oversight']
      }
    ],
    agentTrace: [
      {
        agent: 'Transaction Agent',
        action: 'Scan SWIFT messages',
        input: 'Global Transaction Stream',
        output: 'Flagged: 12 suspicious entities',
        riskContribution: 20,
        dependencies: []
      },
      {
        agent: 'Identity Agent',
        action: 'KYC Verification',
        input: 'Flagged Entities',
        output: '3 High-risk matches',
        riskContribution: 30,
        dependencies: ['Transaction Agent']
      }
    ],
    decisionTrace: {
      intent: 'Identify and block money laundering activities.',
      dataUsed: ['Transaction History', 'Sanction Lists', 'UBO Data'],
      assumptions: ['Sanction lists are updated hourly'],
      logic: 'Pattern matching against known money laundering typologies.',
      failurePoints: ['False positives blocking legitimate trade', 'Evasion by sophisticated actors']
    },
    autonomyLevel: 'LIMITED',
    triggeredRules: ['High-value asset restriction', 'Sanctions list match'],
    recommendations: ['Implement secondary human review for asset freezes', 'Regularly audit training data for bias'],
    createdAt: '2026-04-11T09:00:00Z'
  }
];

export const MOCK_LOGS = [
  { id: 'l1', timestamp: '2026-04-12T08:30:00Z', workflow: 'Loan Approval AI', event: 'Policy Trigger', detail: 'High-risk financial decision detected', status: 'Blocked' },
  { id: 'l2', timestamp: '2026-04-12T08:15:00Z', workflow: 'Patient Triage Assistant', event: 'Human Review', detail: 'Manual override of triage priority', status: 'Approved' },
  { id: 'l3', timestamp: '2026-04-12T07:45:00Z', workflow: 'Loan Approval AI', event: 'Data Drift', detail: 'Shift in income distribution detected', status: 'Alert' },
  { id: 'l4', timestamp: '2026-04-12T07:00:00Z', workflow: 'System', event: 'Policy Update', detail: 'EU AI Act v2.1 controls applied', status: 'System' },
];

export const MOCK_MONITOR_STATS = [
  { time: '08:00', requests: 120, risk: 5 },
  { time: '08:10', requests: 150, risk: 8 },
  { time: '08:20', requests: 180, risk: 12 },
  { time: '08:30', requests: 140, risk: 7 },
  { time: '08:40', requests: 210, risk: 15 },
  { time: '08:50', requests: 190, risk: 10 },
];

export const MOCK_COMPLIANCE_SUMMARY = [
  { framework: 'EU AI Act', compliant: 12, partial: 4, nonCompliant: 2 },
  { framework: 'MAS FEAT', compliant: 15, partial: 2, nonCompliant: 1 },
  { framework: 'ISO 42001', compliant: 8, partial: 8, nonCompliant: 2 },
  { framework: 'AI Verify', compliant: 18, partial: 0, nonCompliant: 0 },
];
