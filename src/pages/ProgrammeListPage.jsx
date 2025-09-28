import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ProgrammesPage = () => {
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [progRes, candRes] = await Promise.all([
                    api.get('/programmes'),
                    api.get('/candidates') 
                ]);

                const allProgrammes = progRes.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                const allCandidates = candRes.data;

                const candidatesMap = new Map(allCandidates.map(c => [c._id, c]));
                const publishedProgrammes = allProgrammes.filter(p => p.isResultPublished);
                
                const resultsPromises = publishedProgrammes.map(p => api.get(`/programmes/${p._id}/results`));
                const resultsResponses = await Promise.all(resultsPromises);
                
                const resultsMap = new Map();
                publishedProgrammes.forEach((prog, index) => {
                    resultsMap.set(prog._id, resultsResponses[index].data);
                });

                const enrichedProgrammes = allProgrammes.map(prog => {
                    if (prog.isResultPublished && resultsMap.has(prog._id)) {
                        const progResults = resultsMap.get(prog._id);
                        const winners = progResults
                            .filter(r => r.rank >= 1 && r.rank <= 3)
                            .sort((a, b) => a.rank - b.rank)
                            .map(winnerResult => ({
                                ...winnerResult,
                                candidate: candidatesMap.get(winnerResult.candidate)
                            }));
                        return { ...prog, winners };
                    }
                    return prog;
                });
                
                setProgrammes(enrichedProgrammes);

            } catch (err) {
                console.error(err);
                setError('Failed to load programmes and results.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center p-10">Loading Programmes...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    const getRankColor = (rank) => {
        if (rank === 1) return 'border-yellow-400';
        if (rank === 2) return 'border-gray-400';
        if (rank === 3) return 'border-yellow-600';
        return 'border-gray-200';
    }

    return (
        <div className="container mx-auto p-4 md:p-8 my-15">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-8">
                Festival Programmes
            </h1>
            <div className="space-y-6">
                {programmes.map(prog => (
                    <div key={prog._id} className="bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
                        <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{prog.name}</h2>
                                <p className="text-sm text-gray-500">{prog.type} - {new Date(prog.date).toLocaleString()}</p>
                            </div>
                            {prog.isResultPublished ? (
                                <Link to={`/programmes/${prog._id}/results`} className="mt-2 sm:mt-0 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                    View Full Results
                                </Link>
                            ) : (
                                <span className="mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">Results Pending</span>
                            )}
                        </div>
                        {prog.winners && prog.winners.length > 0 && (
                            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {prog.winners.map(winner => (
                                    <div key={winner._id} className={`p-3 rounded-lg border-2 ${getRankColor(winner.rank)}`}>
                                        <div className="flex items-center">
                                            {/* THE FIX IS HERE: Added inline style and flex-shrink-0 */}
                                            <img 
                                                src={winner.candidate?.image?.url} 
                                                alt={winner.candidate?.name} 
                                                className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                            <div>
                                                <p className="font-bold text-gray-800">{winner.rank === 1 ? '🥇' : winner.rank === 2 ? '🥈' : '🥉'} {winner.candidate?.name}</p>
                                                <p className="text-sm text-gray-600">{winner.candidate?.team?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgrammesPage;

