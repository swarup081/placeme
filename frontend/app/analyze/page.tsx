    "use client"
    import React from 'react';
    import { useState } from 'react';

    // 1. Define the shape of your OpenAI response based on your JSON
    interface ResumeAnalysis {
        candidate: {
            name: string;
            email: string;
            location: string;
        };
        summary: string;
        skills: {
            programming_languages: string[];
            frameworks: string[];
        };
        analysis: {
            strengths: string[];
            weaknesses: string[];
        };
        analytics: {
            ats_score: string | number;
            formatting_feedback: string;
        };
        rewritten_suggestions: {
            summary: string;
            bullet_points: string[];
        };
    }

    export default function ResumeAnalyzer() {
    // 2. Tell TypeScript what kind of data goes in state using Generics (< >)
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResumeAnalysis | null>(null);
    const [error, setError] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // 3. Use standard React Event types for cleaner code
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return setError('Please select a PDF file first.');

        setLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('resume', file);

        try {
        const response = await fetch('http://localhost:3001/analyze/resume', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Failed to analyze resume');
        
        const data: ResumeAnalysis = await response.json();
        setResult(data);
        } catch (err) {
        // Safely handle the error type
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Resume Analyzer</h1>
            
            {/* Upload Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <form onSubmit={handleUpload} className="flex items-center gap-4">
                <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                <button 
                type="submit" 
                disabled={loading || !file}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                {loading ? 'Analyzing... (Takes ~10s)' : 'Analyze Resume'}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            </div>

            {/* Results Section */}
            {!result && !loading && (
                <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                    <h2 className="text-xl font-semibold mb-2">Analysis Status: N/A</h2>
                    <p>No resume uploaded yet. Please upload a PDF resume to view detailed analysis and AI suggestions.</p>
                </div>
            )}

            {result && (
            <div className="space-y-6">
                {/* Candidate Header */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{result.candidate.name}</h2>
                <p className="text-gray-600">{result.candidate.email} • {result.candidate.location}</p>
                <p className="mt-4 text-gray-700">{result.summary}</p>
                </div>

                {/* Analytics & Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 flex flex-col justify-center items-center text-center">
                        <h3 className="text-lg font-bold text-indigo-900 mb-2">ATS Compatibility Score</h3>
                        <div className="text-4xl font-extrabold text-indigo-600">{result.analytics?.ats_score ?? 'N/A'}</div>
                        <p className="text-sm text-indigo-700 mt-2">Score out of 100 based on keyword match and structure.</p>
                    </div>
                    <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                        <h3 className="text-lg font-bold text-teal-900 mb-3">Formatting Feedback</h3>
                        <p className="text-teal-800">{result.analytics?.formatting_feedback ?? 'No feedback provided.'}</p>
                    </div>
                </div>

                {/* AI Analysis Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-bold text-blue-900 mb-3">AI Analysis: Strengths</h3>
                    <ul className="list-disc pl-5 space-y-2 text-blue-800">
                    {/* Because of the interface, TS knows 's' is a string now! */}
                    {result.analysis?.strengths?.map((s, i) => <li key={i}>{s}</li>) ?? <li>N/A</li>}
                    </ul>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                    <h3 className="text-lg font-bold text-orange-900 mb-3">AI Analysis: Areas to Improve</h3>
                    <ul className="list-disc pl-5 space-y-2 text-orange-800">
                    {result.analysis?.weaknesses?.map((w, i) => <li key={i}>{w}</li>) ?? <li>N/A</li>}
                    </ul>
                </div>
                </div>

                {/* Skills */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {result.skills?.programming_languages?.map((skill) => (
                    <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {skill}
                    </span>
                    ))}
                    {result.skills?.frameworks?.map((skill) => (
                    <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {skill}
                    </span>
                    ))}
                </div>
                </div>

                {/* Better Resume Suggestions */}
                {result.rewritten_suggestions && (
                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-purple-900">Make Better Resume ✨</h3>
                            <button
                                onClick={() => setShowSuggestions(!showSuggestions)}
                                className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 text-sm"
                            >
                                {showSuggestions ? 'Hide AI Suggestions' : 'Reveal AI Suggestions'}
                            </button>
                        </div>

                        {showSuggestions && (
                            <div className="space-y-6 mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div>
                                    <h4 className="font-semibold text-purple-800 mb-2">Improved Summary:</h4>
                                    <p className="text-purple-900 bg-white p-4 rounded border border-purple-200">
                                        {result.rewritten_suggestions.summary}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-purple-800 mb-2">Stronger Action Bullet Points:</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-purple-900 bg-white p-4 rounded border border-purple-200">
                                        {result.rewritten_suggestions.bullet_points.map((bp, i) => (
                                            <li key={i}>{bp}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            )}
        </div>
        </div>
    );
    }