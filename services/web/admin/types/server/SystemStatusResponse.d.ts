//Private Types
interface IHardwareStatus {
	cpu: ICpuUsage;
	memory: IMemoryUsage;
}

interface IDatabaseStatus {
	tableList: string[];
}

interface ISystemStatus {
	hardware?: IHardwareStatus;
	database?: IDatabaseStatus;
}

//Public Types
interface ISystemStatusResponse {
	sucess: boolean;
	status: ISystemStatus;
}
