//Private Types
interface IHardwareStatus {
	cpu: ICPUUsage,
	memory: IMemoryUsage
};

interface IDatabaseStatus {
	tableList: string[]
};

interface ISystemStatus {
	hardware?: IHardwareStatus,
	database?: IDatabaseStatus
};

//Public Types
export interface IGeneralResponse {
    success: boolean,
    description?: string
};

export interface IAuthResponse {
    success: boolean,
    isUserAuthenticated: boolean
};

export interface ICPUUsage {
	usedPercentage: number
};

export interface IMemoryUsage {
	usedGB: number,
	usedPercentage: number
};

export interface ISystemStatusResponse {
	sucess: boolean,
	status: ISystemStatus
};