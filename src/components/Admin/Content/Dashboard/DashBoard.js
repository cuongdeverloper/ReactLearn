import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import './DashBoard.scss'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "react-bootstrap";
import { ApiDashBoardOverView } from "../../../../services/ApiServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DashBoard = (props) => {
    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const {t} = useTranslation();
    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                const res = await ApiDashBoardOverView();
                if (res && res.EC === 0) {
                    setDataOverView(res.DT);

                    let uv = 0, pv = 0, amt = 0;
                    uv = res?.DT?.others?.countAnswers ?? 0;
                    pv = res?.DT?.others?.countQuestions ?? 0;
                    amt = res?.DT?.others?.countQuiz ?? 0;
                    const data = [
                        {
                            "name": "Answers",
                            "uv": uv,
                        },
                        {
                            "name": "Questions",
                            "pv": pv,
                        },
                        {
                            "name": "Quiz",
                            "amt": amt
                        }
                    ]
                    setDataChart(data);
                }
            }
        };

        fetchData();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to='/login' />;
    }

    return (
        <div className="dashboard-container row mt-3">
            <div className="dashboard-left col-md-6 row">
                <div className="dashboard-left-ct col-md-5 border">
                    {t('DashBoard.title1')}:<br />{dataOverView?.others?.countAnswers}
                </div>
                <div className="dashboard-left-ct col-md-5 border">
                    {t('DashBoard.title2')}:<br />{dataOverView?.others?.countQuestions}
                </div>
                <div className="dashboard-left-ct col-md-5 border">
                    {t('DashBoard.title3')}:<br />{dataOverView?.others?.countQuiz}
                </div>
            </div>
            <div className="dashboard-right col-md-6">
                <ResponsiveContainer width="95%" height={400}>
                    <BarChart width={730} height={250} data={dataChart}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                        <Bar dataKey="amt" fill="#82ca9d" />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default DashBoard;
