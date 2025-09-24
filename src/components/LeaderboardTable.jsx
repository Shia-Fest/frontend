import React from "react";

const LeaderBoardTable = ({ title, headers, data, renderRow }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <h3 className="text-xl font-bold text-gray-800 p-4 bg-gray-50 border-b">{title}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data && data.length > 0 ? (
                            data.map(renderRow)
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-4 text-center text-gray-500">
                                    No data available yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div> 
    )
}

export default LeaderBoardTable;