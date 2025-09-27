import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ResultsPage = () => {
    const { id: programmeId } = useParams(); // Get programme ID from the URL
    const [programme, setProgramme] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            if (!programmeId) return;
            try {
                setLoading(true);
                // Fetch both programme details and its results
                const [progRes, resultsRes] = await Promise.all([
                    api.get(`/programmes/${programmeId}`),
                    api.get(`/programmes/${programmeId}/results`)
                ]);
                setProgramme(progRes.data);
                
                // Fetch candidate details for each result
                const resultsWithCandidates = await Promise.all(resultsRes.data.map(async (result) => {
                    const candidateRes = await api.get(`/candidates/${result.candidate}`);
                    return { ...result, candidate: candidateRes.data };
                }));
                
                // Sort results by rank (1, 2, 3)
                resultsWithCandidates.sort((a, b) => {
                    if (a.rank === null) return 1;
                    if (b.rank === null) return -1;
                    return a.rank - b.rank;
                });

                setResults(resultsWithCandidates);

            } catch (err) {
                setError('Failed to load results.');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [programmeId]);

    const getRankText = (rank) => {
        if (rank === 1) return '🥇 1st Place';
        if (rank === 2) return '🥈 2nd Place';
        if (rank === 3) return '🥉 3rd Place';
        return '';
    };

    if (loading) return <div className="text-center p-10">Loading Results...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Link to="/programmes" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; Back to All Programmes</Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800">
                Results: {programme?.name}
            </h1>
            <p className="text-center text-gray-500 mb-8">{programme?.type}</p>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Candidate</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Team</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Grade</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {results.filter(r => r.rank).map((result) => ( // Winners first
                            <tr key={result._id}>
                                <td className="px-6 py-4 font-bold">{getRankText(result.rank)}</td>
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center">
                                    {/* THE FIX IS HERE: Added inline style and flex-shrink-0 class */}
                                    <img 
                                        src={result.candidate.image.url} 
                                        alt={result.candidate.name} 
                                        className="w-10 h-10 rounded-full object-cover mr-4 border flex-shrink-0"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                    {result.candidate.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{result.candidate.team.name}</td>
                                <td className="px-6 py-4 font-semibold text-blue-600">{result.grade}</td>
                            </tr>
                        ))}
                         {results.filter(r => !r.rank && r.grade).map((result) => ( // Graded participants next
                            <tr key={result._id}>
                                <td className="px-6 py-4">--</td>
                                <td className="px-6 py-4 font-medium text-gray-800 flex items-center">
                                    {/* THE FIX IS HERE: Added inline style and flex-shrink-0 class */}
                                    <img 
                                        src={result.candidate.image.url} 
                                        alt={result.candidate.name} 
                                        className="w-10 h-10 rounded-full object-cover mr-4 border flex-shrink-0"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                    {result.candidate.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{result.candidate.team.name}</td>
                                <td className="px-6 py-4 font-semibold text-blue-600">{result.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsPage;

    