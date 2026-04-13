/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { Workflow, RiskLevel, ComplianceStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function evaluateWorkflow(workflowData: Partial<Workflow>): Promise<Workflow> {
  const prompt = `
    Evaluate the following AI workflow for enterprise governance:
    Name: ${workflowData.name}
    Domain: ${workflowData.domain}
    Description: ${workflowData.description}
    AI Type: ${workflowData.aiType}
    Data Sensitivity: ${workflowData.dataSensitivity}
    Decision Impact: ${workflowData.decisionImpact}

    Provide a detailed risk assessment, regulatory mapping (EU AI Act, MAS FEAT, ISO 42001, AI Verify), 
    a multi-agent trace simulation (Data, Model, Decision, Monitoring, Governance agents), 
    decision traceability, autonomy levels, and governance recommendations.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
          riskScore: { type: Type.NUMBER },
          riskExplanation: { type: Type.STRING },
          regulatoryMapping: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                status: { type: Type.STRING, enum: ['Compliant', 'Partial', 'Non-compliant'] },
                controls: { type: Type.ARRAY, items: { type: Type.STRING } },
                missingControls: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['name', 'status', 'controls', 'missingControls']
            }
          },
          agentTrace: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                agent: { type: Type.STRING },
                action: { type: Type.STRING },
                input: { type: Type.STRING },
                output: { type: Type.STRING },
                riskContribution: { type: Type.NUMBER },
                dependencies: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['agent', 'action', 'input', 'output', 'riskContribution', 'dependencies']
            }
          },
          decisionTrace: {
            type: Type.OBJECT,
            properties: {
              intent: { type: Type.STRING },
              dataUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
              assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
              logic: { type: Type.STRING },
              failurePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['intent', 'dataUsed', 'assumptions', 'logic', 'failurePoints']
          },
          autonomyLevel: { type: Type.STRING, enum: ['FULL', 'LIMITED', 'RESTRICTED'] },
          triggeredRules: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: [
          'riskLevel', 'riskScore', 'riskExplanation', 'regulatoryMapping', 
          'agentTrace', 'decisionTrace', 'autonomyLevel', 'triggeredRules', 'recommendations'
        ]
      }
    }
  });

  const result = JSON.parse(response.text);
  
  return {
    ...workflowData,
    id: workflowData.id || Math.random().toString(36).substr(2, 9),
    createdAt: workflowData.createdAt || new Date().toISOString(),
    ...result
  } as Workflow;
}
