/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type Industry = 'Finance' | 'Healthcare' | 'Public Sector' | 'Retail' | 'Technology' | 'Other';

export type AIType = 'LLM' | 'Agentic System' | 'Recommendation System';

export type Sensitivity = 'Low' | 'Medium' | 'High';

export type ComplianceStatus = 'Compliant' | 'Partial' | 'Non-compliant';

export interface RegulatoryFramework {
  name: string;
  status: ComplianceStatus;
  controls: string[];
  missingControls: string[];
}

export interface AgentStep {
  agent: string;
  action: string;
  input: string;
  output: string;
  riskContribution: number;
  dependencies: string[];
}

export interface DecisionTrace {
  intent: string;
  dataUsed: string[];
  assumptions: string[];
  logic: string;
  failurePoints: string[];
}

export interface Workflow {
  id: string;
  name: string;
  domain: Industry;
  description: string;
  aiType: AIType;
  dataSensitivity: Sensitivity;
  decisionImpact: Sensitivity;
  riskLevel: RiskLevel;
  riskScore: number;
  riskExplanation: string;
  regulatoryMapping: RegulatoryFramework[];
  agentTrace: AgentStep[];
  decisionTrace: DecisionTrace;
  autonomyLevel: 'FULL' | 'LIMITED' | 'RESTRICTED';
  triggeredRules: string[];
  recommendations: string[];
  createdAt: string;
}
