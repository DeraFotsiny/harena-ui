import { useEffect, useState } from "react";
import { patrimoineProvider, projectionFutureProvider } from "../providers";
import { Card, CardContent, CardHeader, TextField, Button } from '@mui/material';

const Dashboard = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await patrimoineProvider.getList("patrimoines");
                const patrimoines = response.data;
                const nomPatrimoine = patrimoines[0].nom;
                const debut = patrimoines[0].t;

                if (endDate) {
                    const imgResponse = await projectionFutureProvider.getPatrimoineGraph("projectionFuture", nomPatrimoine, debut, endDate);
                    setImageSrc(imgResponse);
                }
            } catch (error) {
                console.error('Error fetching patrimoine graph:', error);
            } finally {
                setLoading(false);
            }
        };
        if (endDate) {
            fetchData();
        }
    }, [endDate]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    return (
        <Card>
            <CardHeader title="Dashboard" />
            <CardContent>
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button onClick={() => setLoading(true)} disabled={!endDate}>
                    Make Graph
                </Button>
                {!endDate && (
                    <p style={{ color: 'red' }}>Please select an end date to display the graph...</p>
                )}
                {loading ? (
                    <p>Loading...</p>
                ) : imageSrc ? (
                    <img src={`data:image/png;base64,${imageSrc}`} alt="Patrimoine Graph" style={{ width: '100%' }} />
                ) : (
                    <p>No data available</p>
                )}
            </CardContent>
        </Card>
    );
};

export default Dashboard;
