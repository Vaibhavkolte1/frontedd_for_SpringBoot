import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    Check,
    Trash2,
    Settings,
    Shield,
    MessageCircle,
    CreditCard,
    ShoppingBag,
    Archive
} from "lucide-react";

const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        type: "security",
        title: "New login detected",
        message: "A new login was detected from a Chrome browser on Windows.",
        time: "2 mins ago",
        unread: true,
        archived: false,
        icon: <Shield className="w-5 h-5" />,
        color: "bg-amber-100 text-amber-600"
    },
    {
        id: 2,
        type: "order",
        title: "Package delivered!",
        message: "Your order #8829 has been delivered.",
        time: "1 hour ago",
        unread: true,
        archived: false,
        icon: <ShoppingBag className="w-5 h-5" />,
        color: "bg-emerald-100 text-emerald-600"
    },
    {
        id: 3,
        type: "social",
        title: "New message from Sarah",
        message: '"Hey! Just checking in on the project update."',
        time: "3 hours ago",
        unread: false,
        archived: false,
        icon: <MessageCircle className="w-5 h-5" />,
        color: "bg-blue-100 text-blue-600"
    },
    {
        id: 4,
        type: "billing",
        title: "Subscription Renewed",
        message: "Your Pro Plan was renewed for $19.99.",
        time: "Yesterday",
        unread: false,
        archived: false,
        icon: <CreditCard className="w-5 h-5" />,
        color: "bg-purple-100 text-purple-600"
    }
];

const Notification = () => {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [filter, setFilter] = useState("All");

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, unread: false }))
        );
    };

    const markRead = id => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, unread: false } : n))
        );
    };

    const removeNotification = id => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const archiveNotification = id => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, archived: true } : n))
        );
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === "Unread") return n.unread && !n.archived;
        if (filter === "Archive") return n.archived;
        return !n.archived;
    });

    return (
        <div className="min-h-screen bg-[#FDFDFF] py-12 px-4">
            <div className="max-w-2xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-3 items-center">
                        <div className="bg-slate-900 p-3 rounded-xl">
                            <Bell className="text-white w-6 h-6" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">Notifications</h1>
                            <p className="text-sm text-slate-500">
                                {unreadCount} unread notifications
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={markAllRead}
                            className="p-2 rounded-lg hover:bg-blue-50 text-slate-500 hover:text-blue-600"
                        >
                            <Check />
                        </button>

                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                            <Settings />
                        </button>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="flex gap-3 mb-6">
                    {["All", "Unread", "Archive"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === tab
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border text-slate-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* NOTIFICATION LIST */}
                <div className="space-y-3">
                    <AnimatePresence>
                        {filteredNotifications.map(n => (
                            <motion.div
                                key={n.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className={`p-4 rounded-xl border flex gap-4 group ${n.unread
                                        ? "bg-white border-blue-100"
                                        : "bg-slate-50 border-slate-100"
                                    }`}
                            >
                                <div
                                    className={`w-11 h-11 flex items-center justify-center rounded-lg ${n.color}`}
                                >
                                    {n.icon}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">{n.title}</h3>
                                        <span className="text-xs text-slate-400">{n.time}</span>
                                    </div>

                                    <p className="text-sm text-slate-500">{n.message}</p>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => markRead(n.id)}
                                        className="p-1 hover:bg-green-50 rounded"
                                    >
                                        <Check className="w-4 h-4 text-green-600" />
                                    </button>

                                    <button
                                        onClick={() => archiveNotification(n.id)}
                                        className="p-1 hover:bg-yellow-50 rounded"
                                    >
                                        <Archive className="w-4 h-4 text-yellow-600" />
                                    </button>

                                    <button
                                        onClick={() => removeNotification(n.id)}
                                        className="p-1 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredNotifications.length === 0 && (
                        <div className="text-center py-16 text-slate-400">
                            <Bell className="mx-auto mb-3 w-10 h-10 opacity-30" />
                            No notifications
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;