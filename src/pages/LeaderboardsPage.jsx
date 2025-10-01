import React, { useEffect, useState } from "react";
import LeaderboardTable from "../components/LeaderboardTable";
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
                setError('Failed to load leaderboards. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboards();
    }, []);

    const renderTeamRow = (team, index) => (
        <tr key={team._id} className={index < 3 ? 'bg-yellow-50' : ''}>
            <td className="px-6 py-4 text-sm font-bold text-gray-800">{index + 1}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{team.name}</td>
            <td className="px-6 py-4 text-sm font-extrabold text-blue-600">{team.totalPoints}</td>
        </tr>
    );

    const renderStudentRow = (student, index) => (
        <tr key={student._id} className={index < 3 ? 'bg-green-50' : ''}>
            <td className="px-6 py-4 text-sm font-bold text-gray-800">{index + 1}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center">
                <img src={student.image.url} alt={student.name} className="w-8 h-8 rounded-full mr-3 object-cover" />
                {student.name}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{student.team?.name || 'N/A'}</td>
            <td className="px-6 py-4 text-sm font-extrabold text-blue-600">{student.totalPoints}</td>
        </tr>
    );

    if (loading) return <div className="text-center p-10">Loading Leaderboards...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto my-15 p-4 md:p-8 space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 ">Leaderboards</h1>
            
            {/* Grand Total Team Leaderboard */}
            <LeaderboardTable 
                title="🏆 Team Rankings (Top 4)"
                headers={['Rank', 'Team Name', 'Total Points']}
                // THE FIX IS HERE: We slice the array to get only the first 4 items.
                data={leaderboards?.teamLeaderboard?.slice(0, 4)}
                renderRow={renderTeamRow}
            />

            {/* Overall Top Students Leaderboard */}
            <LeaderboardTable 
                title="🌟 Top Students (Overall Top 4)"
                headers={['Rank', 'Student Name', 'Team', 'Total Points']}
                // THE FIX IS HERE: Slicing the overall students array.
                data={leaderboards?.overallTopStudents?.slice(0, 4)}
                renderRow={renderStudentRow}
            />

            {/* Category-Specific Top Students Leaderboards */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-800">Top Students by Category (Top 4)</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {leaderboards?.categoryTopStudents?.map(categoryData => (
                         <LeaderboardTable 
                            key={categoryData.category}
                            title={`🏅 ${categoryData.category}`}
                            headers={['Rank', 'Student Name', 'Team', 'Total Points']}
                            // THE FIX IS HERE: Slicing the candidates array for each category.
                            data={categoryData.candidates?.slice(0, 4)}
                            renderRow={renderStudentRow}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardsPage;

