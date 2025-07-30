export interface IProblemSolutionListRes {
  problemSolutionList: IProblemSolution[];
  totalRecords: number;
}

export interface IProblemSolution {
  _id: string;
  section: string;
  field: string;
  problem: string;
  solution: string;
  createdAt: string;
  updatedAt: string;
  updated_by: any;
  updated_by_profile?: string;
}
