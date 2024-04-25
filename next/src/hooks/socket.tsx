import { useEffect, useState, useRef } from "react";


export interface InterfaceMemoryInfo {
	total: number;
	free: number;
	available: number;
	used: number;
	percent: number;
}
export interface InterfaceDiskInfo {
	total: number
	used: number;
	free: number;
	percent: number;
}
export interface InterfaceNginxInfo {
	cpu_usage_percent: number;
	memory_usage_percent: number;
}
export interface InterfaceCPUInfo {
	percent: number;
	cores: number;
	threads: number;
}
export interface InterfaceMysqlInfo {
	threads_connected: number;
	queries_per_second: number;
	cpu_usage: number;
}
export interface InterfaceSystemInfo {
	cpu: InterfaceCPUInfo;
	memory: InterfaceMemoryInfo;
	disk: InterfaceDiskInfo;
	nginx: InterfaceNginxInfo;
	mysql: InterfaceMysqlInfo;
}
export interface InterfaceRequestsInfo  {
    hour: string;
    count: number;
    time: string;
    date: string;
}
export interface InterfaceQueriesInfo {
    hour: string;
    count: number;
    time: string;
    date: string;
}
export interface InterfaceSiteInfo {
    requests: InterfaceRequestsInfo[];
    queries: InterfaceQueriesInfo[];
    date: string;
    time: string;
    timezone: string;
}
export interface InterfaceStats {
	site: InterfaceSiteInfo;
	system: InterfaceSystemInfo;

}

export default function useStats() {
    const [stats, setStats] = useState({} as InterfaceStats);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/stats/");
        socketRef.current.onopen = () => {
            console.log("Socket connected");
        };
        socketRef.current.onmessage = (e: any) => {
            const data = JSON.parse(e.data);
            setStats(data);
        };
        socketRef.current.onclose = () => {
            console.log("Socket closed");
        };
        socketRef.current.onerror = (e: any) => {
            console.error(e);
        };

        const intervalId = setInterval(() => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send("Request data");
            }
        }, 5000);

        return () => {
            clearInterval(intervalId);
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return stats;
}