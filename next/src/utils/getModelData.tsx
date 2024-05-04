import { IEndPoint } from '@/api/endPoints';

interface IGethModelData {
    endPoint: IEndPoint;
    setModelData: Function;
    setModelDataError?: Function;
}

export default function GetModelData(params: IGethModelData) {
    const { endPoint, setModelData, setModelDataError } = params;
    const fetchData = async () => {
        try {
            const response = await fetch(endPoint.path(), {
                method: endPoint.method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setModelData(data);
        } catch (error) {
            setModelDataError? setModelDataError(error) : null;
        }
    };
    fetchData();
}