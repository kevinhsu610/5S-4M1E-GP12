// 通用选项类型
export interface SelectOption {
  label: string;
  value: string;
}

// 5S管理类型
export interface FiveSData {
  area: SelectOption;
  checkDate: string;
  checker: string;
  sortScore: SelectOption;
  setScore: SelectOption;
  sweepScore: SelectOption;
  sanitizeScore: SelectOption;
  sustainScore: SelectOption;
  issues?: string;
  improvement?: string;
  completed: boolean;
}

// 4M1E变动管理类型
export interface FourM1EData {
  changeId: string;
  changeType: SelectOption;
  changeDate: string;
  applicant: string;
  department: SelectOption;
  changeDescription: string;
  reason: string;
  impactAnalysis?: string;
  approvalStatus: SelectOption;
  approver?: string;
  implementationDate?: string;
  effectiveness?: SelectOption | null;
}

// 快速反应跟踪类型
export interface QuickResponseData {
  issueId: string;
  reportTime: string;
  reporter: string;
  department: SelectOption;
  issueType: SelectOption;
  description: string;
  severity: SelectOption;
  responsible: string;
  solution?: string;
  solveTime?: string;
  status: SelectOption;
  comment?: string;
}

// 删除重复的SkillMatrixData定义

// GP12早期生产遏制数据模型
export interface GP12Data {
  partNumber: string;
  partName: string;
  productionDate: string;
  batchNumber: string;
  quantity: string;
  samplingSize: string;
  inspector: string;
  inspectionItems: string;
  defectDescription?: string;
  defectQuantity?: string;
  disposition: { label: string; value: string };
  comments?: string;
}

// 快速响应跟踪数据模型
export interface QRData {
  issueId: string;
  reportTime: string;
  reporter: string;
  department: { label: string; value: string };
  issueType: { label: string; value: string };
  description: string;
  severity: { label: string; value: string };
  responsible: string;
  solution?: string;
  solveTime?: string;
  status: { label: string; value: string };
  comment?: string;
}

// 技能矩阵数据模型
export interface SkillMatrixData {
  employeeId: string;
  employeeName: string;
  department: { label: string; value: string };
  position: string;
  yearsOfService: string;
  processSkill: { label: string; value: string };
  qualitySkill: { label: string; value: string };
  equipmentMaintenanceSkill: { label: string; value: string };
  problemSolvingSkill: { label: string; value: string };
  teamworkSkill: { label: string; value: string };
  qualityInspectionSkill: { label: string; value: string };
  fanAssemblySkill: { label: string; value: string };
  trainingNeeds?: string;
  lastEvaluationDate?: string;
}

// 升级管理类型
export interface EscalationData {
  escalationId: string;
  relatedIssueId?: string;
  escalationDate: string;
  escalator: string;
  issueSummary: string;
  currentStatus: { label: string; value: string };
  priority: { label: string; value: string };
  targetResolver: string;
  expectedResolutionDate: string;
  actualResolutionDate?: string;
  resolutionDetails?: string;
  resolutionSummary?: string;
  preventiveActions?: string;
}

// 表格列配置类型
export interface TableColumn {
  key: string;
  title: string;
  type: "text" | "select" | "date" | "checkbox";
  options?: SelectOption[];
  required?: boolean;
}