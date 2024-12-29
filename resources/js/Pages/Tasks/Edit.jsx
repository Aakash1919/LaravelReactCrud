import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ task }) {
    const [formData, setFormData] = useState({
        name: task && task.data.name || "",
        description: task && task.data.description || "",
        id: task && task.data.id || "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task){
            Inertia["put"](route("tasks.update", formData.id), formData, {
                onSuccess: () => {
                    console.log("Task updated successfully");
                },
                onError: () => {
                    console.log("Error updating task");
                },
            });
        }else {
            Inertia["post"](route("tasks.store"), formData, {
                onSuccess: () => {
                    console.log("Task Created successfully");
                },
                onError: () => {
                    console.log("Error updating task");
                },
            });
        }
        
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link
                        href={route("tasks.index")}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        Go Back
                    </Link>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Description Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="mt-1 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
