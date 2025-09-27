import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // State to manage the selected candidate and their achievements
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidateResults, setCandidateResults] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);

    // This function calls the '/api/candidates/search' route
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        setSearched(true);
        setSelectedCandidate(null); // Reset selection on new search
        try {
            const { data } = await api.get(`/candidates/search?term=${searchTerm}`);
            setSearchResults(data);
        } catch (error) {
            console.error("Search failed:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    // This function is triggered when a user clicks on a candidate from the search results.
    // It calls the '/api/candidates/:id/results' route.
    const handleSelectCandidate = async (candidate) => {
        setSelectedCandidate(candidate);
        setLoadingResults(true);
        try {
            const { data } = await api.get(`/candidates/${candidate._id}/results`);
            setCandidateResults(data);
        } catch (error) {
            console.error("Failed to fetch results for candidate:", error);
        } finally {
            setLoadingResults(false);
        }
    };
    
    // VIEW 1: The main search bar and results list
    if (!selectedCandidate) {
        return (
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Candidate Search</h1>
                <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter name or admission number..." className="flex-grow px-4 py-2 border rounded-md shadow-sm"/>
                    <button type="submit" disabled={loading} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">{loading ? '...' : 'Search'}</button>
                </form>

                <div className="max-w-xl mx-auto mt-8">
                    {loading && <p className="text-center">Searching...</p>}
                    {!loading && searched && searchResults.length === 0 && <p className="text-center text-gray-500">No candidates found.</p>}
                    {!loading && searchResults.length > 0 && (
                        <div className="space-y-4">
                            {searchResults.map(candidate => (
                                <div key={candidate._id} onClick={() => handleSelectCandidate(candidate)} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition">
                                    <img src={candidate.image.url} style={{ width: '100px', margin: '8px'}} alt={candidate.name} className="m-4 rounded-full object-cover border-2" />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{candidate.name}</h3>
                                        <p className="text-sm text-gray-600">Admission No: {candidate.admissionNo}</p>
                                        <p className="text-sm text-gray-500">Team: {candidate.team.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // VIEW 2: Display the achievements for the selected candidate
    return (
        <div className="container mx-auto p-4 md:p-8">
            <button onClick={() => setSelectedCandidate(null)} className="text-sm text-blue-600 hover:underline mb-4">&larr; Back to Search Results</button>
            <div className="text-center mb-8">
                <img src={selectedCandidate.image.url} alt={selectedCandidate.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto" />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">{selectedCandidate.name}</h1>
                <p className="text-gray-500">{selectedCandidate.team.name}</p>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Achievements</h2>
            {loadingResults && <p className="text-center">Loading achievements...</p>}
            {!loadingResults && candidateResults.length === 0 && <p className="text-center text-gray-500">No achievements recorded.</p>}
            {!loadingResults && candidateResults.length > 0 && (
                <div className="max-w-2xl mx-auto space-y-3">
                    {candidateResults.map(result => (
                        <div key={result._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="font-bold">{result.programme.name}</p>
                                <p className="text-sm text-gray-600">
                                    {result.rank && `Rank: ${result.rank}`}
                                    {result.rank && result.grade && ' | '}
                                    {result.grade && `Grade: ${result.grade}`}
                                </p>
                            </div>
                            <Link to={`/programmes/${result.programme._id}/results/${result._id}/certificate`} className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                                View Certificate
                            </Link>
                        </div>
                    ))}

                </div>

            )}
        </div>
    );
};

export default SearchPage;

