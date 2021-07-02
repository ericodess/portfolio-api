//Private Types
interface ICPUStatus {
	usedPercentage: number
};

interface ISystemStatus {
	cpu: ICPUStatus,
	memory: IMemoryUsage
};

interface IDatabaseStatus {
	tableList: string[]
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

export interface IMemoryUsage {
	usedMemory: number,
	usedMemoryPercentage: number
};

export interface IDashboardInfoResponse {
	sucess: boolean,
	systemStatus?: ISystemStatus,
	databaseStatus?: IDatabaseStatus
};