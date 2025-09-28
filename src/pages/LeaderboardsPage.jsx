import React, { useEffect, useState } from "react";
import LeaderBoardTable from "../components/LeaderboardTable";
import api from '../services/api';

const Spinner = () => (
    <div className="flex justify-center items-center p-10 my-15">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-lg text-gray-700">Loading Leaderboards...</span>
    </div>
);


const LeaderboardsPage = () => {
    const [leaderboards, setLeaderboards] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboards = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/leaderboards');
                setLeaderboards(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching leaderboards. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboards();
    }, []);
    
    const getRankClass = (index) => {
        switch(index) {
            case 0: return 'bg-yellow-100 font-bold'; 
            case 1: return 'bg-gray-200 font-semibold';
            case 2: return 'bg-yellow-50';
            default: return 'bg-white';
        }
    };

    const renderTeamRow = (team, index) => (
        <tr key={team._id} className={getRankClass(index)}>
            <td className="px-6 py-4 text-sm text-gray-900 text-center w-16">{index + 1}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{team.name}</td>
            <td className="px-6 py-4 text-sm font-extrabold text-blue-600 text-right">{team.totalPoints}</td>
        </tr>
    );

    const renderStudentRow = (student, index) => (
        <tr key={student._id} className={getRankClass(index)}>
            <td className="px-6 py-4 text-sm text-gray-900 text-center w-16">{index + 1}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center">
                <img style={{ width: '40px', height:'40px'}} src={student.image.url} alt={student.name} className="rounded-full mr-4 object-cover border-2 border-gray-200" />
                <span>{student.name}</span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{student.team?.name || 'N/A'}</td>
            <td className="px-6 py-4 text-sm font-extrabold text-blue-600 text-right">{student.totalPoints}</td>
        </tr>
    );
    
    // Helper to sort data before rendering
    const sortData = (data) => data ? data.slice().sort((a, b) => b.totalPoints - a.totalPoints) : [];

    if (loading) return <Spinner />;
    if (error) return <div className="text-center p-10 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto mt-10">{error}</div>;

    return (
        <div className="bg-gray-50 min-h-screen my-15">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800">
                        Official Leaderboards
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">Shia Fest 2025</p>
                </header>
                
                <main className="space-y-12">
                    <LeaderBoardTable 
                        title="Team Rankings (Grand Total)" 
                        headers={['Rank', 'Team Name', 'Total Points']}
                        data={sortData(leaderboards?.teamLeaderboard)}
                        renderRow={renderTeamRow}
                    />

                    <LeaderBoardTable 
                        title="Top Students (Overall)"
                        headers={['Rank', 'Student Name', 'Team', 'Total Points']}
                        data={sortData(leaderboards?.overallTopStudents)}
                        renderRow={renderStudentRow}
                    />

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-center text-gray-800">Top Students by Category</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            {sortData(leaderboards?.categoryTopStudents).map(categoryData => (
                                <LeaderBoardTable
                                    key={categoryData.category} 
                                    title={`${categoryData.category}`}
                                    headers={['Rank', 'Student', 'Team', 'Points']}
                                    data={sortData(categoryData.candidates)}
                                    renderRow={renderStudentRow}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LeaderboardsPage;

