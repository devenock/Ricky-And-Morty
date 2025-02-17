import React from "react";

type StatusProps = {
    status: string;
};

const statusColors: Record<"Alive" | "Dead" | "Unknown", string> = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    Unknown: "bg-gray-500",
};

const StatusBadge: React.FC<StatusProps> = ({ status }) => {
    const validStatus = (["Alive", "Dead", "Unknown"] as const).includes(status as any)
        ? (status as "Alive" | "Dead" | "Unknown")
        : "Unknown";

    return (
        <div className="items-center flex gap-1">
            <span
                className={`px-3 w-5 h-5 py-1 text-xs text-white ${statusColors[validStatus]}`}
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
            ></span>
            <p>{validStatus}</p>
        </div>
    )
};

export default StatusBadge;
