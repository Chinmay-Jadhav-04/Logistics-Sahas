import { useEffect, useState } from "react"

export default function Stats({ providers = [] }) {

    const [stats, setStats] = useState({
        total: 0,
        granted: 0,
        revoked: 0,
        lastUpdate: 'N/A',
    });

    useEffect(() => {
        let granted = 0, revoked = 0;

        if (providers.length === 0) {
            // Default sample data when no providers exist
            setStats({
                total: 120,
                granted: 8,
                revoked: 18,
                lastUpdate: '2 mins ago',
            });
            return;
        }

        providers.forEach((provider) => {
            if (provider.access === 'Allowed') granted++;
            else if (provider.access === 'Not Allowed') revoked++;
        });

        // Get the most recent update time
        const mostRecentUpdate = providers.reduce((latest, provider) => {
            const providerUpdate = provider.updatedAt || provider.createdAt;
            if (!providerUpdate) return latest;
            
            const updateTime = new Date(providerUpdate);
            return updateTime > latest ? updateTime : latest;
        }, new Date(0));

        // Format the last update time
        const formatLastUpdate = (date) => {
            if (date.getTime() === 0) return 'N/A';
            
            const now = new Date();
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));
            
            if (diffInMinutes < 1) return 'Just now';
            if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
            if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
            return `${Math.floor(diffInMinutes / 1440)} days ago`;
        };

        const newStats = {
            total: providers.length,
            granted,
            revoked,
            lastUpdate: formatLastUpdate(mostRecentUpdate),
        };

        setStats((prev) => {
            if (
                prev.total === newStats.total &&
                prev.granted === newStats.granted &&
                prev.revoked === newStats.revoked &&
                prev.lastUpdate === newStats.lastUpdate
            ) {
                return prev;
            }
            return newStats;
        });
    }, [providers]);

    return (
        <div className="md:w-full w-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            <div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-lg p-6 grid gap-2 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-sm">📋</span>
                    </div>
                    <h4 className="text-sm text-gray-600">Total Provider</h4>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{stats.total}</h1>
            </div>

            <div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-lg p-6 grid gap-2 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-sm">✅</span>
                    </div>
                    <h4 className="text-sm text-gray-600">Access Granted</h4>
                </div>
                <h1 className="text-3xl font-bold text-green-600">{stats.granted}</h1>
            </div>

            <div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-lg p-6 grid gap-2 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 text-sm">🚫</span>
                    </div>
                    <h4 className="text-sm text-gray-600">Access Revoked</h4>
                </div>
                <h1 className="text-3xl font-bold text-red-600">{stats.revoked}</h1>
            </div>

            <div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-lg p-6 grid gap-2 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 text-sm">🕒</span>
                    </div>
                    <h4 className="text-sm text-gray-600">Last Access Update</h4>
                </div>
                <h1 className="text-xl font-bold text-purple-600">{stats.lastUpdate}</h1>
            </div>
        </div>
    )
}