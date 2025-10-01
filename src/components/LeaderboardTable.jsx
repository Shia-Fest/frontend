import React from "react";

const LeaderboardTable = ({ title, headers, data, renderRow }) => {
    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <h3 className="text-2xl font-bold text-white text-center drop-shadow-sm">
                    {title}
                </h3>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {/* Table Header */}
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th 
                                    key={index} 
                                    className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-blue-100"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{header}</span>
                                        {index === 0 && (
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <React.Fragment key={index}>
                                    {renderRow(item, index)}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-gray-500 text-lg font-medium">No data available yet</p>
                                        <p className="text-gray-400 text-sm">Check back later for updates</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Total entries: {data?.length || 0}</span>
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

// Enhanced renderRow example for usage:
export const EnhancedRenderRow = (item, index) => {
    const rank = index + 1;
    const getRankColor = (rank) => {
        switch(rank) {
            case 1: return "from-yellow-400 to-yellow-500"; // Gold
            case 2: return "from-gray-300 to-gray-400";     // Silver
            case 3: return "from-orange-300 to-orange-400"; // Bronze
            default: return "from-blue-50 to-white";
        }
    };

    const getRankTextColor = (rank) => {
        return rank <= 3 ? "text-white font-bold" : "text-gray-700";
    };

    return (
        <tr 
            key={index} 
            className={`transition-all duration-200 hover:bg-blue-50 hover:shadow-md hover:scale-[1.01] ${
                rank <= 3 ? "bg-gradient-to-r " + getRankColor(rank) : "bg-white"
            }`}
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        rank <= 3 ? "bg-white bg-opacity-20" : "bg-blue-100"
                    }`}>
                        <span className={`text-sm font-bold ${getRankTextColor(rank)}`}>
                            {rank}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${rank <= 3 ? "text-white" : "text-gray-900"} truncate`}>
                            {item.name}
                        </p>
                    </div>
                </div>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm ${rank <= 3 ? "text-white" : "text-gray-700"}`}>
                {item.score}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    item.progress > 0 
                        ? "bg-green-100 text-green-800" 
                        : item.progress < 0 
                        ? "bg-red-100 text-red-800" 
                        : "bg-gray-100 text-gray-800"
                }`}>
                    {item.progress > 0 ? "↗" : item.progress < 0 ? "↘" : "→"} 
                    {Math.abs(item.progress)}
                </span>
            </td>
        </tr>
    );
};

export default LeaderboardTable;